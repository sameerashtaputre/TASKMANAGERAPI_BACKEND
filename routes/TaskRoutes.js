const express = require('express');//import express
const router = express.Router();
const auth=require('../middleware/auth');
const Task=require('../models/Task');


router.get('/test',auth, (req,res)=>{//whenever user hits / api auth will verify and proceeds

    res.json({
        message:'task routes are working',
        user:req.user
    })
       
});

//CRUD tasks for authenticated users

//create a task

router.post('/',auth,async (req,res)=>{
try{
    //description,completed from req.body
    //owner:req.user._id
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })
    await task.save();
    res.status(201).json({task,message:"Task created successfully"});

}catch(err){}
})
//get user task
router.get('/',auth,async(req,res)=>{
    try{

        const task=await Task.find({
            owner:req.user._id
        })
        res.status(200).json({task, count: task.length,message:"Task fetched succesfully"})

    }
    catch(err){
        res.status(400).send("error:err.message")
    }
})

//fetch a task by id

router.get('/:id', auth , async (req,res)=>{
    const taskid = req.params.id;

    try{
        const task = await Task.findOne({//Database Query to Find the Task:
            _id: taskid,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({task, message: "Task Fetched Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
})

//update a task by id
router.patch('/:id', auth, async (req, res) => {
    const taskid = req.params.id;  // Get task ID from URL
    const updates = Object.keys(req.body);  // Extract keys from the request body (e.g., 'description', 'completed')

    const allowedUpdates = ['description', 'completed'];  // Only allow specific fields to be updated
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));  // Check if all provided updates are valid

    // If any invalid field is found, return 400 Bad Request
    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid updates" });
    }

    try {
        // Find the task by ID and owner (to ensure only the owner can update it)
        const task = await Task.findOne({
            _id: taskid,
            owner: req.user._id  // Ensure the task belongs to the authenticated user
        });

        // If no task is found, return 404 Not Found
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Apply updates to the task object dynamically
        updates.forEach(update => (task[update] = req.body[update]));
        
        // Save the updated task to the database
        await task.save();

        // Return a success message
        res.json({ message: "Task Updated Successfully" });
    } catch (err) {
        // Handle any errors (e.g., database or server issues)
        res.status(500).send({ error: err.message });
    }
});
// delete a task by id
router.delete('/:id', auth , async (req,res)=>{
    const taskid = req.params.id;

    try{
        const task = await Task.findOneAndDelete({//we using findoneanddelete else same as update
            _id: taskid,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({task, message: "Task Deleted Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
})

module.exports = router;


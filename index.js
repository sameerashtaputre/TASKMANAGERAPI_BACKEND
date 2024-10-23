const express = require('express');//import express
const bodyParser=require('body-parser');//importing
const app=express();  // Create an instance of the Express class
const UserRoutes=require('./routes/UserRoutes');
const TaskRoutes=require('./routes/TaskRoutes');
 

require('dotenv').config();//making them accessible throughout your code
require('./db')
const PORT=8000;//This is an object provided by Node.js that stores all environment variables.



 app.use(bodyParser.json())//converts object to json
 app.use('/user', UserRoutes);//Api call for UserRoutes.js
 app.use('/tasks', TaskRoutes);


 app.get('/',(req,res)=>{
    res.json({
        message:  'Task Manager API is Working'
    })
 })
 app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
 })



const mongoose=require('mongoose');



//// Create a User Schema
const TaskSchema=new mongoose.Schema({
    description:{type:String,required:true},
    completed:{type:Boolean,default:false},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
});


const Task = mongoose.model('Task', TaskSchema);

module.exports = Task; // Export the User model
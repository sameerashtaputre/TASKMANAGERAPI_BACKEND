const mongoose=require('mongoose');
const bcrypt=require('bcrypt')


//// Create a User Schema
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true // Remove whitespace from both ends
      },
      email: {
        type: String,
        required: true, // Email is required
        unique: true, // Email must be unique

      },
      password: {
        type: String,
        required: true, // Password is required
        minlength: 3 // Minimum length for password
      }
},{
  timestamps:true
});


userSchema.pre('save',async function(next) {
  const user=this;//'this' refers to the document being saved

  if(user.isModified('password')){
    user.password=await bcrypt.hash(user.password,8); // Hash the password if modified
  }
  next();//proceed to next
  
})

// Create a User model
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model
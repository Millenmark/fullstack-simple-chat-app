const mongoose = require("mongoose")

//Creating Schema Object
const userSchema = new mongoose.Schema({
  name:{type: String, required:true, minlength: 3, maxlength: 30},
  email: {type: String, required:true, unique:true},
  password: {type: String, required:true, minlength: 3, maxlength: 1024}
}, {
  timestamps: true
})

//User is pertained to a single user so if they are many users, mongodb will make it plural
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
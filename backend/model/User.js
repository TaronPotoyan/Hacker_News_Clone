import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    date : String,
    password: String,
    email : String,
    about : String,
});
  
const User = mongoose.model('User', userSchema);
export default User;
  
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    Lastname: {
        type: String,
        required: [true, "Lastname is required"]
    }, 
    Email: {
        type: String,
        required: [true, "Email is required"]
    },
    Password: {
        type: String,
        required: [true, "Password is required"]
    }
})

const userModel = mongoose.model("Users", userSchema);

export default userModel
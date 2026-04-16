const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Gender: String,
    Phone: Number,
    Password: String,
    City: String
})

const userModel = mongoose.model("registeredUsers", userSchema)

module.exports = userModel
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{ 
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    
    phone: String,
    password: String,
    city: String,
    country: String
});

module.exports = mongoose.model("User", userSchema);
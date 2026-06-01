const express = require('express')
const app = express()
const userModel = require('./model/user.model')
const bcrypt = require('bcrypt')
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.post('/register', async(req, res) => {
    try {
        let {FirstName, LastName, Email, Gender, Phone, Password, City } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        console.log("📝 Received registration data:", req.body)

        // create a new document
        const newUser = new userModel({
            FirstName,
            LastName,
            Email,
            Gender,
            Phone, 
            Password : hashedPassword, 
            City
        })
        
        const savedUser = await newUser.save()
        console.log("User saved successfully !", savedUser)

        res.status(201).json({
            message: "User registered successfully✅",
            user: savedUser
        })

    } catch(error) {
        console.log("❌ Registration Error:", error.message)
        res.status(400).json({
            message: "Registration failed",
            error: error.message
        })
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch(error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        })
    }
})
module.exports = app
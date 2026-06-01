const express = require('express')
const app = express()
const userModel = require('./models/user.model')
const bcrypt = require('bcrypt')

app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        // 1. get data from frontend
        const { FirstName, LastName, Email, Password, Contact, Gender } = req.body;

        // 2. validation
        if (!FirstName || !LastName ||  !Email || !Password || !Contact || !Gender ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (Password.length < 6) {
            return res.status(400).json({
                message: "Password must be atleast 6 characters"
            });
        }

        // 3. Cleanup
        const cleanEmail = Email.trim().toLowerCase();

        // 4. check if user already exist
        const existingUser = await userModel.findOne({
            Email: cleanEmail
        })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        // 5. hash password 
        const hashedPassword = await bcrypt.hash(Password, 10)

        console.log(req.body);
        console.log(Email);

        // 6. save user to db
        const user = await userModel.create({
            FirstName,
            LastName,
            Email: cleanEmail,
            Password: hashedPassword,
            Contact,
            Gender
        })

        // 7. send response
        res.status(201).json({
            message: "User registered successful✅",
            user
        })

    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = app
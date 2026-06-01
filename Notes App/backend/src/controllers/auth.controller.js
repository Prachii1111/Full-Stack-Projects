import userModel from "../models/user.model.js"
import config from "../config/config.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"

export async function register(req, res) {
    try {
        console.log(req.body);
        const { Firstname, Lastname, Email, Password } = req.body;

        // input validation
        if (!Firstname || !Lastname || !Email || !Password ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (Password.length < 6) {
            return res.status(400).json({
                message: "Password should be atleast 6 characters"
            });
        }

        // cleanup
        const cleanEmail = Email.trim().toLowerCase();

        // check if user already exists in db
        const isUserRegistered = await userModel.findOne({
            Email: cleanEmail
        });

        if (isUserRegistered) {
            return res.status(409).json({
                message: "User or email already exists"
            });
        }

        // hash password 
        const hashedPassword = crypto.createHash("sha256").update(Password).digest("hex");

        // create new user and store 
        const user = await userModel.create({
            Firstname,
            Lastname,
            Email: cleanEmail,
            Password: hashedPassword
        })

        res.status(201).json({
            message: "User registered successful✅"
        })

    } catch(err) {
        res.status(409).json({
            message: "User not registered"
        })
    }
}

export async function login(req, res) {
    try {
        const { Email, Password } = req.body;

        // validate
        if (!Email || !Password) {
            return res.status(400).json({
                message: "Email and Password are required"
            });
        }
        
        // cleanup
        const cleanEmail = Email.trim().toLowerCase();

        // check if user exists
        const user = await userModel.findOne({
            Email: cleanEmail
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const hashedPassword = crypto.createHash("sha256").update(Password).digest("hex");

        if (!hashedPassword === user.Password) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const refreshToken = jwt.sign({
                id: user._id
            }, config.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const accessToken = jwt.sign({
            id: user._id
        }, config.JWT_SECRET, { expiresIN: "15min" });

        // save refresh token to cookie
        res.cookie('refreshToken', refreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );

        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                Fullname: user.Firstname + user.Lastname,
                Email: user.Email
            }
        });

    } catch(error) {
        console.log(error);
        
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


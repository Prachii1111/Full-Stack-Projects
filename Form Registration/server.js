const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve frontend files
app.use(express.static("public"));

// Session setup
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false
    })
);

// 🔐 Authentication Middleware
function isAuth(req, res, next) {
  if (req.session.userId) {
    next(); // user is logged in
  } else {
    res.send("Please login first");
  }
}

app.post("/register", async (req, res) => {
    try {
        let { firstName, lastName, email, phone, password, city, country } = req.body;
        
        email = email.toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email already registered");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            city,
            country
        });

        // Save to database
        await newUser.save();

        console.log("✅ User saved to database");
        console.log(req.body);
        res.send("Registration successfull!");
    } catch (error) {
        console.log(error);

        // Handle duplicate key error from MongoDB
        if (error.code === 11000) {
            return res.send("Email already exists");
        }

        res.status(500).send("Something went wrong");
    }
});

app.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if(!user) {
            return res.send("User not found");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.send("Invalid password");
        }

        // Create session
        req.session.userId = user._id;

        res.redirect("/dashboard.html");
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

// 🏠 Dashboard (protected)
app.get("/dashboard", isAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// 6️⃣ LOGOUT ROUTE
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login.html");
  });
});

// connect to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/formRegistration")
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.log("❌ MongoDB Connection Failed");
        console.log(err);
    })

app.listen(3000, () => console.log("Server running on port 3000"));



import mongoose from "mongoose"
import config from "./config.js"

async function connectDB() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Database connected successful👍")
    } catch(err) {
        console.log(err);
    }
}

export default connectDB
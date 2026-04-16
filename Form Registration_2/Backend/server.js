const app = require('./src/app')
const connectDB = require('./src/db/db')
require("dotenv").config()

async function startSever() {
    try {
        await connectDB()

        app.listen(3000, () => {
            console.log("Server running at port 3000")
        })
    } catch(error) {
        console.log("❌ Failed to start server:", error.message) 
    }
}


startSever()

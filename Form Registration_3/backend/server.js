const app = require('./src/app')
const connectDB = require('./src/db/db')
require('dotenv').config()

async function connect() {
    await connectDB();
}

connect()

app.listen(3000, () => {
    console.log("Server running at port 3000");
})
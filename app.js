const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()


// Mongo DB Connections
// Your web app's Firebase configuration


// Middleware Connections
app.use(cors())
app.use(express.json())



// Routes
const authRouter = require("./routes/auth");


app.use("/auth", authRouter)


// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('App running in port: ' + PORT)
})




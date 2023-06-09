const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()


// Middleware Connections
app.use(cors())
app.use(express.json())



// Routes
const authRouter = require("./routes/auth");
const appointmentRoute = require('./routes/appointment')


app.use("/auth", authRouter)
app.use("/api", appointmentRoute)



// Connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('App running in port: ' + PORT)
})

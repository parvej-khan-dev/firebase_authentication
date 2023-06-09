const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session')
require('dotenv').config()


// Middleware Connections
app.use(cors())
app.use(express.json())
app.use(session({
  name: 'sessionIdCookie',
  secret:  process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 3600000, // 1hr
    secure: true, // cookie is only accessible over HTTP, requires HTTPS
  }
}));



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

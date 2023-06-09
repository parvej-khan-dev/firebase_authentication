require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.verifyAuthToken = async (req, res, next) => {

    const authToken = req.headers.authorization?.split(" ")[1]
    console.log(authToken)
    if (authToken) {
        const decode = await jwt.verify(authToken, process.env.SECRET)
        console.log(decode, "decode")
        req.user = decode.uid;
        next()
    } else {
        res.status(400).send("Session expried login again")
    }

}
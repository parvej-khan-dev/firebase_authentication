require('dotenv').config()
const admin = require("firebase-admin");
const jwt = require('jsonwebtoken');
const router = require("express").Router()

const { body, validationResult } = require("express-validator");
var serviceAccount = require("./firebase_auth.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Endpoint for generating a JWT token
// Register endpoint
router.post('/register',
    body("email")
        .isEmail()
        .withMessage("Email is invalid"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isStrongPassword()
        .withMessage(`Password should be 8 characters long 1 uppercase & 1 lowercase character 1 number and 
                      include special character also  `)
        .isLength({ min: 5, })
        .withMessage("Password should be more then 6 character "),
    async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // Create the user in Firebase Auth
            const userRecord = await admin.auth().createUser({
                email,
                password,
            });

            // Generate a JWT token
            const jwtToken = jwt.sign({ uid: userRecord.uid }, process.env.SECRET);

            // Return the JWT token in the response
            res.json({ message: "User Registetion SuccessFully", token: jwtToken });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
    });

// Login endpoint
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Authenticate the user using Firebase Auth
        const user = await admin.auth().getUserByEmail(email);

        // Generate a JWT token
        const jwtToken = jwt.sign({ uid: user.uid }, process.env.SECRET);

        // Return the JWT token in the response
        res.json({ massage: "Login Sucessfully", token: jwtToken });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
});


module.exports = router;
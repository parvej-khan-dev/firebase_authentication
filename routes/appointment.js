const { appointmentDb, Timestamp } = require('../config');
const router = require('express').Router();
const { verifyAuthToken } = require('./middleware')



// Create a new appointment
router.post('/appointments', verifyAuthToken, async (req, res) => {
    try {
        const id = req.body.userId;
      

        // Convert date to a JavaScript Date object
        const dateObj = new Date(req.body.date);
        // Create a Firestore timestamp using the imported class
        const timestamp = Timestamp.fromDate(dateObj);

        const appointmentData = {
            date: date,
            time: req.body.time,
            userId: req.body.userId,
            status: req.body.status
        };


        await appointmentDb.doc(id).set(appointmentData);

        res.status(201).json({
            message: "Appointment created successfully",
            appointment: appointmentData
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        });
    }
});


// Read all appointments
router.get('/appointments',
    verifyAuthToken,
    async (req, res) => {
        try {
            const snapshot = await appointmentDb.get();
            const appointments = [];

            snapshot.forEach((doc) => {
                console.log(doc.data())
                const appointmentData = doc.data();
                appointments.push(appointmentData);
            });

            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message,
            });
        }
    });


// Read a specific appointment
router.get('/appointments/:id', verifyAuthToken, async (req, res) => {
    try {
        const appointmentRef = appointmentDb.doc(req.params.id);
        const response = await appointmentRef.get();
        res.send(response.data());

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        });
    }
});


// Update an appointment
router.put('/appointments/:id', verifyAuthToken, async (req, res) => {
    try {
        const appointmentId = req.params.id;


        const appointmentRef = await appointmentDb.doc(appointmentId).update(req.body);
        res.send(appointmentRef);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        });
    }
});


// Delete an appointment
router.delete('/appointments/:id', verifyAuthToken, async (req, res) => {
    try {
        const appointmentId = req.params.id;

        const appointmentRef = appointmentDb.doc(appointmentId);
        const appointmentDoc = await appointmentRef.get();

        if (!appointmentDoc.exists) {
            res.status(404).json({
                error: true,
                message: "Appointment not found",
            });
            return;
        }

        await appointmentRef.delete();
        res.json({
            message: "Appointment deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        });
    }
});

module.exports = router;
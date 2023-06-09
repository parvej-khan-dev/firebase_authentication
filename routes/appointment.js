const { appointmentsRef, database } = require('../config');
const { push, set, ref, get } = require('firebase/database');
const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { verifyAuthToken } = require('./middleware')


// Create a new appointment
router.post('/appointments', verifyAuthToken, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { date, time, userId, status } = req.body;
        const newAppointmentRef = push(appointmentsRef);

        await set(newAppointmentRef, {
            id: newAppointmentRef.key,
            date,
            time,
            userId,
            status,
        });

        res.status(201).json({ message: 'Appointment created successfully' })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

// Read all appointments
router.get('/appointments', verifyAuthToken, async (req, res) => {
    try {
        const snapshot = await get(ref(database, 'appointments'));
        const appointments = snapshot.val();
        res.json(appointments);
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
        console.log(req.user)
        const appointmentId = req.params.id;
        const snapshot = await get(ref(database, `appointments/${appointmentId}`));
        const appointment = snapshot.val();
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(appointment);
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
        const updatedAppointmentData = req.body;


        await set(ref(database, `appointments/${appointmentId}`), updatedAppointmentData);


        res.json({ message: 'Appointment updated successfully' });
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

        await appointmentsRef.child(appointmentId).remove();

        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message,
        });
    }
});

module.exports = router;
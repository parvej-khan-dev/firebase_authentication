const { usersDb } = require("../config")
const router = require('express').Router();

router.post('/user/create', async (req, res) => {
    try {
        // console.log(req.body);
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        console.log(userJson,"user json")
        // const usersDb = db.collection('users');
        const response = await  usersDb.doc(id).set(userJson);

        console.log(response,"res")
        res.send(response);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
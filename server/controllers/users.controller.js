const User = require('../models/users.model');
const Users = require('../models/users.model');

const createUser = (req, res) => {
    const { userId, email } = req.body;
    console.log(userId);
    console.log(email);

    User.create({ userId, email }, (err, data) => {
        if(err) {
            res.status(500).json('Could not save user');
            // console.log(err.stack)
            // res.status(500).json(err.stack);
        } else {
            res.status(201).send('User successfully created');
        }
    })
};


module.exports = {
    createUser,
}
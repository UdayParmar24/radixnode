const user = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.registration = ((req, res) => {
    return bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
            req.body.password = hashedPassword;
            user.create(({
                username: req.body.name,
                email: req.body.email,
                password: req.body.password,
            })).then(() => {
                res.status(200).json({ message: "User created" });
            }).catch(err => {
                console.log("Error in creating a new user", err);
                res.status(500).json(err);
            });
        })
        .catch(err => {
            console.log("Error has occurred in the password hashing process");
            res.status(500).json(err);
        });
});



exports.login = ((req, res) => {
    return user.findOne({ where: { email: req.body.email } })
        .then((userData) => {
            if (!userData) {
                res.status(400).json({ message: 'No User Found' })
            }
            // compare incoming password with the hashed password stored in the database
            return bcrypt.compare(req.body.password, userData.password)
                .then((validPass) => {
                    if (!validPass) { res.status(400).json({ message: 'Invalid Password' }) }

                    // create token 
                    const token = jwt.sign({ clientId: userData.id, clientName: userData.username }, process.env.MySecreteKey, { expiresIn: '1h' });


                    //send it as response along with user data
                    res.status(200).send({
                        message: "You are successfully logged in!",
                        token: token,
                        data: userData
                    });
                })
                .catch(err => {
                    console.log('error in comparing passwords', err);
                    res.status(500).json(err);
                });
        })
});


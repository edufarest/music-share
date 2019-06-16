const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

require('dotenv').config();

// Login

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {


        if (err || !user) {
            console.log("user: ");
            console.log(user);
            return res.status(400).json({
                message: info ? info.message : 'Something is not right',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            // Generate token

            const token = jwt.sign(user, process.env.SECRET);
            return res.json({user, token});
        });
    })(req, res);
});

module.exports = router;
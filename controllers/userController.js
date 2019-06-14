'use strict';

var User = require('../models/userModel');


// Return all users
exports.list_all = (req, res) => {

    User.getAll((err, users) => {

        if (err) {
            res.send(err);
        }

        res.json(users);

    })

}

// Return a specific user
exports.get_user = (req, res) => {

    User.getById(req.params.userId, (err, user) => {

        if (err) {
            res.send(err)
        }

        res.json(user);

    })

}

// Create an user
exports.create_user = (req, res) => {

    const params = req.params;

    const username = params.username;
    const password = params.password;
    const email    = params.password;

    if (!(username && password && email)) {
        console.error("Not all fields are included");
        // TODO Send error
        return;
    }

    User.create(email, username, password, (err, user) => {

        if (err) {
            res.send(err);
        }

        res.json(user);
    })

}

exports.update_user = (req, res) => {

    // Check user has valid credentials

    // TODO

}

exports.delete_user = (req, res) => {

    // Check user has valid credentials

    //TODO
}
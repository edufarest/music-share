var User = require('../models/userModel');

module.exports = {

// Return all users
    list_all: (req, res) => {

        User.getAll((err, users) => {

            if (err) {
                res.send(err);
            }

            res.json(users);

        })

    },

// Return a specific user
    get_user: (req, res) => {

        User.getById(req.params.username, (err, user) => {

            if (err) {
                res.send(err)
            }

            res.json(user);

        })

    },

// Create an user
    create_user: (req, res) => {

        const request = req.body;

        const username = request.username;
        const password = request.password;
        const email = request.email;

        if (!(username && password && email)) {
            console.error("Not all fields are included");
            res.status(400).send("Not all fields are included for user");
        }

        User.create(username, password, email, (err, user) => {

            if (err) {
                res.send(err);
            }

            res.json(user);
        })

    },

    update_user: (req, res) => {

        User.updateUser(req.params.username, req.body.newPassword, req.body.email, (err, user) => {
            res.json(user);
        })

    },

    delete_user: (req, res) => {

        User.deleteUser(req.params.username, (err, result) => {
            res.json(result);
        })
    }
}

// module.exports = User;
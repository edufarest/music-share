'use strict';

var sql = require('../db.js');

var User = (user) => {
    this.username = user.username;
    this.password = user.password;
    this.email    = user.email;
};

User.create = (user, result) => {

        sql.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', user, (err, res) => {

            if (err) {
                console.error(err);
                result(err, null);
            } else {
                console.log(res);
                console.log(res.insertId);
                result(null, res.insertId)
            }

        })

};

User.getAll = (result) => {

    sql.query('SELECT username, email FROM users', (err, res) => {

        if (err) {
            console.error(err);
            result(err, null);
        } else {
            result(null, res);
        }

    })

};

User.getById = (id, result) => {

    sql.query('SELECT username, email FROM users WHERE userId = ?', id, (err, res) => {

        if (err) {
            console.error(err);
            result(err, null);
        } else {
            result(null, res);
        }

    })

};

module.exports = User;
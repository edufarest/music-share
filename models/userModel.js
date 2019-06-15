'use strict';

const sql = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var User = (user) => {
    this.username = user.username;
    this.password = user.password;
    this.email    = user.email;
};

// Auth methods

User.hashPassword = (password) => {
    let hash = bcrypt.hashSync(password, 10);
    return
}

User.create = (username, password, email, result) => {


    // Hash password

    let hashedUser = [username, bcrypt.hashSync(password, 10), email];

        sql.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', hashedUser, (err, res) => {

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
'use strict';

const sql = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

var User = (user) => {
    this.username = user.username;
    this.password = user.password;
    this.email    = user.email;
};

// Auth methods

User.validatePassword = (username, password, callback) => {

    sql.query('SELECT username, password FROM users WHERE username = ?', username, (err, res) => {

        if (err) {
            console.error(err);
            callback(false);
        } else {
            callback(bcrypt.compareSync(password, res[0].password));
        }

    })
};

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

User.getById = (username, result) => {

    sql.query('SELECT username, email FROM users WHERE username = ?', username, (err, res) => {

        if (err) {
            console.error(err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }

    })

};

User.updateUser = (username, newPassword, newEmail, result) => {

    let query = `UPDATE users SET ${newPassword ? 'password = ?': ''}  ${(newPassword && newEmail) ? ', ' : ''} 
                                  ${newEmail ? 'email = ?' : ''} WHERE username = ?`;

    let params = [];

    if (newPassword) {
        params.push(bcrypt.hashSync(newPassword, 10));
    }

    if (newEmail) {
        params.push(newEmail);
    }

    params.push(username);

    sql.query(query, params, (err, res) => {
        if (err) {
            console.error(err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

User.deleteUser = (username, result) => {

    sql.query('DELETE FROM users WHERE username = ?', username, (err, res) => {
        if (err) {
            console.error(err);
            result(err, null);
        } else {
            result(null, res);
        }
    })

};

module.exports = User;
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

User.validatePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}

User.generateJWT = () => {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id:    this.userId, //FIXME Might need to retrieve the id, or store the id in the object.
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, process.env.SECRET);

}

User.toAuthJSON = () => {
    return {
        id: this.userId,
        email: this.email,
        token: this.generateJWT(),
    }
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
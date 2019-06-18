'use strict';

const sql = require('../db.js');

let Artist = (artist) => {
    this.name = artist.name;
};

Artist.create = (name, result) => {


    console.log(name);


    sql.query('INSERT INTO artists (name) VALUES (?)', name, (err, res) => {
        if (err) {
            console.error(err);
            result(err, null);
        } else {
            result(null, res.insertId);
        }
    })

};


Artist.getAll = (result) => {
    sql.query('SELECT * FROM artists', (err, res) => {
        if (err) {
            console.error(err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
};

Artist.getById = (id, result) => {
    sql.query('SELECT * FROM artists WHERE artistId = ?', id, (err, res) => {
        if (err) {
            console.error(err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    })
};


// Search for an artist in the DB by name

Artist.lookup = (name, result) => {

    sql.query('SELECT * FROM artists WHERE name = ?', name, (err, res) => {

        if (err) {
            console.error(err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }

    })

}

module.exports = Artist;


'use strict';

const sql = require('../db.js');

let Album = (album) => {
    this.albumId     = album.albumId;
    this.name        = album.name;
    this.releaseDate = album.releaseDate;
    this.genre1      = album.genre1;
    this.genre2      = album.genre2;
    this.genre3      = album.genre3;
    this.authorId    = album.authorId;
};

let respond = (err, res, callback) => {

    if (err) {
        console.error(err);
        callback(err, null);
    } else {
        callback(null, res);
    }

};

Album.create = (name, releaseDate, genres, authorId, result) => {

    sql.query('INSERT INTO albums (name, releaseDate, genre1, genre2, genre3, authorId) VALUES (?, ?, ?, ?, ?, ?)',
        [name, releaseDate, genres[0] || '', genres[1] || '', genres[2] || '', authorId], (err, res) => {respond(err, res, result)});

};

Album.getAll = (result) => {
    sql.query('SELECT * FROM albums', (err, res) => {
        respond(err, res, result)
    })
};

Album.getById = (id, result) => {
    sql.query('SELECT * FROM albums WHERE albumId = ?', id, (err, res) => {
        respond(err, res, result);
    })
};

Album.lookup = (name, result) => {
    sql.query('SELECT * FROM albums WHERE name=?', name, (err, res) => {
        respond(err, res, result);
    })
};

Album.delete = (id, result) => {
    sql.query('DELETE FROM albums WHERE albumId=?', id, (err, res) => {
        respond(err, res, result);
    })
};

module.exports = Album;
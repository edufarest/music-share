'use strict';

const sql = require('../db.js');

let Album = (album) => {
    this.albumId     = album.albumId;
    this.name        = album.name;
    this.releaseDate = album.releaseDate;
    this.genre1      = album.genre1;
    this.genre2      = album.genre2;
    this.genre3      = album.genre3;
};

let respond = (err, res, callback) => {

    if (err) {
        console.error(err);
        callback(err, null);
    } else {
        callback(null, res);
    }

};

Album.create = ()


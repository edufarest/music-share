'use strict';

const sql = require('../db.js');

const fetch = require("node-fetch");

require('dotenv').config();

let Song = (song) => {
    this.songId = song.songId;
    this.title  = song.title;
    this.length = song.length;
    this.tempo  = song.tempo;
    this.energy = song.energy;
    this.valence= song.valence;
    this.genre1 = song.genre1;
    this.genre2 = song.genre2;
    this.genre3 = song.genre3;
    this.releaseDate = song.releaseDate;
    this.timesUsed   = song.timesUsed;
    this.artistId    = song.artistId;
    this.albumId     = song.albumId;
};

let respond = (err, res, callback) => {

    if (err) {
        console.error(err);
        callback(err, null);
    } else {
        callback(null, res);
    }

};

Song.create = (id, title, length, tempo, energy, valence, releaseDate, genres, albumId, artistId, result) => {

    sql.query('INSERT INTO songs (songId, title, length, tempo, energy, valence, genre1,' +
                ' genre2, genre3, releaseDate, timesUsed, albumId, artistId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id, title, length, tempo, energy, valence, genres[0] || '', genres[1] || '', genres[2] || '', 1, albumId, artistId],
        (err, res) => {respond(err, res, result)})

};

Song.getAll = (result) => {
    sql.query('SELECT * FROM songs', (err, res) => {
        respond(err, res, result);
    })
};

Song.getById = (id, result) => {
    sql.query('SELECT * FROM songs WHERE songId=?', id, (err, res) => {
        respond(err, res, result);
    })
};

Song.lookup = (name, result) => {

    // fetch with access token
    // https://accounts.spotify.com/api/token
    // Header: Authorization value: 'basic process.env.accesstoken'
    // content type: value: 'application/x-www-form-urlencoded
    // body:
    // grant_type: client_credentials
    //  - Response: response.access_token
    let uri = "https://accounts.spotify.com/api/token";

    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${process.env.ACCESSTOKEN}`
        },
        body: "grant_type=client_credentials",
    }).then((response) => {
        response.json().then((res) => lookup(name, res.access_token));
    });

    let lookup = (query, token) => {
        let uri = `https://api.spotify.com/v1/search?q=${query}&type=track`;
        fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => res.json()).then(data => result(null, data));
    }
};

Song.updateUsage = (id, increase, result) => {
    sql.query(`UPDATE songs SET timesUsed = timesUsed + ${increase ? 1 : -1} WHERE songId=?`, id, (err, res) => {
        respond(err, res, result);
    })
};

Song.delete = (id, result) => {
    sql.query('DELETE FROM songs WHERE songId=?', id, (err, res) => {
        respond(err, res, result);
    })
};

module.exports = Song;
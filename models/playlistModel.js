'use strict';

const sql = require('../db.js');


let Playlist = (playlist) => {
    this.name = playlist.name;
    this.isPrivate = playlist.isPrivate; //TODO
    this.likes = playlist.likes;
    this.dislikes = playlist.dislikes;
    this.numOfSongs = playlist.numOfSongs;
    this.length = playlist.length;
    this.primaryGenre = playlist.primaryGenre;

    this.songs = playlist.songs;
    this.owner = playlist.owner;
};

Playlist.create  = (name, res) => {
    sql.query('INSERT INTO playlist (name) VALUES ?', name, (err, result) => {
        err ? res.send(err) : res.send(result);
    })
};

Playlist.getRecent = (res) => {
    sql.query('SELECT * FROM playlist ORDER BY playlistId DESC LIMIT 20', (err, playlists) => {
        err ? res.send(err) : res.send(playlists);
    })
};

Playlist.getById = (id, res) => {
    sql.query('SELECT * FROM playlist WHERE playlistId=?', id, (err, playlist) => {
        err ? res.send(err) : res.send(playlist);
    })
};

Playlist.addSong = (id, songId, res) => {
    sql.query('INSERT INTO playlistEntry (playlistId, songId) VALUES (?, ?)', [id, songId], (err, playlistEntry) => {
        err ? res.send(err) : res.send(playlistEntry);
    })
};

Playlist.removeSong = (id, songId, res) => {
    sql.query('DELETE FROM playlistEntry WHERE playlistId=? AND songId=?', [id, songId], (err, result) => {
        err ? res.send(err) : res.send(result);
    })
};

Playlist.delete = (id, res) => {
    sql.query('DELETE FROM playlistEntry WHERE playlistId=?; DELETE FROM playlist WHERE playlistId=?', [id, id], (err, result) => {
      err ? res.send(err) : res.send(result);
    })
};

module.exports = Playlist;
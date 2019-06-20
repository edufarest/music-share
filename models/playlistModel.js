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

Playlist.create  = (playlist, res) => {

    // 1. Create artist (if not exist)
    // 2. Create album (if not exist)
    // 3. Create playlist
    // 4.5 Create songs (if not exist)
    // 4. Add songs

    // Get all artists from given playlist

    // console.log(playlist.tracks);

    let query = ""; // Final query to be done;

    let artistIds = []; // Used for search algorithm

    query += "INSERT IGNORE INTO artists (artistId, name) VALUES ";

    playlist.tracks.forEach((track) => {
        console.log(track);
        let artist = {id: track.artistId, name: track.artist};

        if (!artistIds.includes(artist.id)) {
            artistIds.push(artist.id);
            query += `('${artist.id}', '${artist.name}'), `
        }
    });

    // Remove trailing comma
    query = query.substr(0, query.length - 2);

    console.log(query);

    sql.query(query, (err, result) => {
        console.log(result);
        err ? res(err, null) : res(null, result);
    })
};

Playlist.getRecent = (res) => {
    sql.query('SELECT * FROM playlist ORDER BY playlistId DESC LIMIT 20', (err, playlists) => {
        err ? res(err, null) : res(null, playlists);
    })
};

Playlist.getById = (id, res) => {
    sql.query('SELECT * FROM playlist WHERE playlistId=?', id, (err, playlist) => {
        err ? res(err, null) : res(null, playlist);
    })
};

Playlist.addSong = (id, songId, res) => {
    sql.query('INSERT INTO playlistEntry (playlistId, songId) VALUES (?, ?)', [id, songId], (err, playlistEntry) => {
        err ? res(err, null) : res(null, playlistEntry);
    })
};

Playlist.removeSong = (id, songId, res) => {
    sql.query('DELETE FROM playlistEntry WHERE playlistId=? AND songId=?', [id, songId], (err, result) => {
        err ? res(err, null) : res(null, result);
    })
};

Playlist.delete = (id, res) => {
    sql.query('DELETE FROM playlistEntry WHERE playlistId=?; DELETE FROM playlist WHERE playlistId=?', [id, id], (err, result) => {
      err ? res(err, null) : res(null, result);
    })
};

module.exports = Playlist;
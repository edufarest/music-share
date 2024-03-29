'use strict';

const sql = require('../db.js');

const Song = require('../controllers/songController');
const Album= require('../controllers/albumController');


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

Playlist.create  = (user, playlist, res) => {

    // 1. Create artist (if not exist)
    // 2. Create album (if not exist)
    // 3. Create playlist
    // 4.5 Create songs (if not exist)
    // 4. Add songs

    // Get all artists from given playlist

    console.log(playlist.tracks);

    // { id: '6HZILIRieu8S0iqY8kIKhj',
    //     name: 'DNA.',
    //     artist: 'Kendrick Lamar',
    //     length: 185946,
    //     genre: 'placeholder genre',
    //     artistId: '2YZyLoL8N0Wb9xBt1NhZWg',
    //     album:
    //     { id: '4eLPsYPBmXABThSJ821sqY',
    //         name: 'DAMN.',
    //         releaseDate: '2017-04-14',
    //         img:
    //         'https://i.scdn.co/image/4988546859334f9a5a3fa4acedc5aea275929026' } }

    let albumsIds = [];

    let artistQuery = "INSERT IGNORE INTO artists (artistId, name) VALUES ";

    // TODO Fetch genres
    let albumQuery = "INSERT IGNORE INTO albums (albumId, name, releaseDate, genre1, genre2, genre3, authorId, image)  VALUES ";

    let songQuery  = "INSERT IGNORE INTO songs (songId, title, length, tempo, energy, valence, genre1, genre2, genre3, releaseDate, timesUsed, albumId, artistId) VALUES ";
    playlist.tracks.forEach((track) => {

        let artist = {id: track.artistId, name: track.artist};
        artistQuery += `('${artist.id}', '${artist.name}'), `;

        let album  = {id: track.album.id, name: track.album.name, releaseDate: track.album.releaseDate,
            authorId: track.artistId, image: track.album.img};
        albumQuery += `('${album.id}', '${album.name}', '${album.releaseDate}', '', '', '', '${album.authorId}', '${album.img}'), `;

        albumsIds.push(track.album.id);

        songQuery += `('${track.id}', "${track.name}", ${track.length}, 0, 0, 0, '', '', '', '${track.album.releaseDate}',
         0, '${track.album.id}', '${track.artistId}'), `
    });


    // Remove trailing comma and end query
    artistQuery = artistQuery.substr(0, artistQuery.length - 2) + "; \n";
    albumQuery  = albumQuery.substr(0, albumQuery.length - 2) + "; \n";
    songQuery   = songQuery.substr(0, songQuery.length - 2) + "; \n";

    let query = artistQuery + albumQuery + songQuery;

    let songsIds = [];

    // Create artists, albums, and songs
    sql.query(query, (err, result) => {

        // Create playlist
        let playlistQuery = `INSERT INTO playlist (name, isPrivate, owner) VALUES ('${playlist.name}', 0, '${user}')`;

        sql.query(playlistQuery, (err, result) => {
            console.log(result.insertId);
            // err ? res(err, null) : res(null, result);

            if (err) {
                console.error(err);
            } else if (!result.insertId) {
                console.error("No result id");
            }

            let entries = "INSERT INTO playlistEntry (playlistId, songId) VALUES ";

            playlist.tracks.forEach((track) => {
                entries += `(${result.insertId}, '${track.id}'), `
                songsIds.push(track.id);
            });

            entries = entries.substr(0, entries.length - 2) + "; \n"

            console.log(entries);


            Song.getAudioFeatures(songsIds);

            setTimeout(() => {sql.query(entries, (err, result) => {

                console.log(err);

                if (err) {
                    res(err, null)
                } else {
                    res(null, result)
                };
            })}, 1000);



        })
    });


};

Playlist.getRecent = (res) => {

    let query = "SELECT playlist.playlistId, playlist.name as playlist, owner, title, s.length, album.name, artist.name," +
        " playlist.tempo, playlist.energy, playlist.valence, playlist.loudness, s.songId," +
        " s.tempo as songTempo, s.valence as songValence, s.loudness as songLoudness, s.energy as songEnergy FROM playlist\n" +
        "  INNER JOIN playlistEntry pE on playlist.playlistId = pE.playlistId\n" +
        "  INNER JOIN songs s on pE.songId = s.songId\n" +
        "  INNER JOIN albums album on s.albumId = album.albumId\n" +
        "  INNER JOIN artists artist on album.authorId = artist.artistId\n" +
        "  ORDER BY playlist.playlistId DESC LIMIT 20;"

    sql.query(query, (err, result) => {

        // Group playlists

        // playlistId: 1,
        //     playlist: 'the playlist',
        //     title: 'TEST DRIVE',
        //     length: 179423,
        //     name: 'Joji' }



        let playlists = {};

        result.forEach((playlist) => {


            // owner: 'jose',
            //     title: 'TEST DRIVE',
            //     length: 179423,
            //     name: 'Joji',
            //     tempo: 75,
            //     energy: 0.648,
            //     valence: 0.466,
            //     loudness: -8.602 }

            console.log("PLaylist");
            console.log(playlist);

            let playlistId = playlist.playlistId;

            if (!playlists[playlistId]) {
                playlists[playlistId] = {
                    name: playlist.playlist,
                    author: playlist.owner,
                    tracks: [],
                    energy: playlist.energy,
                    tempo: playlist.tempo,
                    loudness: playlist.loudness,
                    valence: playlist.valence
                }
            }

            playlists[playlistId].tracks.push({
                name: playlist.title,
                artist: playlist.name,
                length: playlist.length,
                tempo: playlist.songTempo,
                energy: playlist.songEnergy,
                valence: playlist.songValence,
                loudness: playlist.loudness,
                songId: playlist.songId
            })

        });

        console.log(playlists);

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

Playlist.favorite = (id, user, isFavorite, res) => {

    let query = "";

    if (isFavorite) {
        query = `INSERT INTO favPlaylist (playlistId, username) VALUES ('${id}', '${user}')`
    } else {
        query = `DELETE FROM favPlaylist WHERE username='${user}' AND playlistId='${id}'`
    }

    sql.query(query, (err, result) => {
        err ? res(err, null) : res(null, result);
    })
};

Playlist.getFavorites = (user, res) => {

    let query = "select playlist.*, s.title, s.tempo as sTempo, s.energy as sEnergy, s.loudness as sLoudness, s.valence as sValence, s.length as sLength  from playlist inner join favPlaylist fP on playlist.playlistId = fP.playlistId and username = ? \n" +
        "                        inner join playlistEntry pE on playlist.playlistId = pE.playlistId\n" +
        "                        inner join songs s on pE.songId = s.songId"


    sql.query(query,
        user, (err, result) => {

            let playlists = {};

            result.forEach((playlist) => {


                // owner: 'jose',
                //     title: 'TEST DRIVE',
                //     length: 179423,
                //     name: 'Joji',
                //     tempo: 75,
                //     energy: 0.648,
                //     valence: 0.466,
                //     loudness: -8.602 }

                console.log("PLaylist");
                console.log(playlist);

                let playlistId = playlist.playlistId;

                if (!playlists[playlistId]) {
                    playlists[playlistId] = {
                        name: playlist.playlist,
                        author: playlist.owner,
                        tracks: [],
                        energy: playlist.energy,
                        tempo: playlist.tempo,
                        loudness: playlist.loudness,
                        valence: playlist.valence
                    }
                }

                playlists[playlistId].tracks.push({
                    name: playlist.title,
                    artist: playlist.name,
                    length: playlist.sLength,
                    tempo: playlist.sTempo,
                    energy: playlist.sEnergy,
                    valence: playlist.sValence,
                    loudness: playlist.sLoudness,
                    songId: playlist.songId
                })

            });

            console.log(playlists);

            err ? res(err, null) : res(null, playlists);
        });
};



module.exports = Playlist;
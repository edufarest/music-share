let Playlist = require('../models/playlistModel');

module.exports = {

    list_recent: (req, res) => {
        Playlist.getRecent((err, playlists) => {
            err ? res.send(err) : res.json(playlists);
        })
    },

    create: (req, res) => {

        console.log(req.body);

        Playlist.create(req.params.username, req.body, (err, playlist) => {
            err ? res.send(err) : res.send(playlist);
        })
    },

    get_playlist: (req, res) => {
        Playlist.getById(req.params.id, (err, playlist) => {
            err ? res.send(err) : res.send(playlist);
        })
    },

    add_song: (req, res) => {
        Playlist.addSong(req.params.id, req.params.songId, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    },

    remove_song: (req, res) => {
        Playlist.removeSong(req.params.id, req.params.songId, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    },

    delete_playlist: (req, res) => {
        Playlist.delete(req.params.id, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    },

    favorite: (req, res) => {
        Playlist.favorite(req.params.id, req.params.username, true, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    },

    disfavorite: (req, res) => {
        Playlist.favorite(req.params.id, req.params.username, false, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    },

    getFavorites: (req, res) => {
        Playlist.getFavorites(req.params.username, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    }

};
let Playlist = require('../models/playlistModel');

module.exports = {

    list_recent: (req, res) => {
        Playlist.getRecent((err, playlists) => {
            err ? res.send(err) : res.json(playlists);
        })
    },

    create: (req, res) => {
        Playlist.create(req.body.name, (err, playlist) => {
            err ? res.send(err) : res.send(playlist);
        })
    },

    get_playlist: (req, res) => {
        Playlist.getById(req.params.id, (err, playlist) => {
            err ? res.send(err) : res.send(playlist);
        })
    },

    add_song: (req, res) => {
        Playlist.addSong(req.params.songId, req.params.id, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    },

    remove_song: (req, res) => {
        Playlist.removeSong(req.params.songId, req.params.id, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    },

    delete_playlist: (req, res) => {
        Playlist.delete(req.params.id, (err, result) => {
            err ? res.send(err) : res.send(result);
        })
    }

};
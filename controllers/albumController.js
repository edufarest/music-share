let Album = require('../models/albumModel');

module.exports = {

    list_all: (req, res) => {
        Album.getAll((err, albums) => {
            if (err) {
                res.send(err);
            }

            res.json(albums);
        })
    },

    get_album: (req, res) => {
        Album.getById(req.params.id, (err, album) => {
            if (err) {
                res.send(err);
            }

            res.json(album);
        })
    },

    lookup: (req, res) => {

        let name = req.params.name.replace("+", " ");

        Album.lookup(name, (err, album) => {
            if (err) {
                res.send(err);
            }

            res.json(album)
        })
    },

    create_album: (req, res) => {

		let albumId     = req.body.id;
        let name = req.body.name;
        let releaseDate = req.body.releaseDate;
        let genres      = req.body.genres;
        let authorId    = req.body.authorId;

        Album.create(albumId, name, releaseDate, genres, authorId, (err, album) => {
            if (err) {
                res.send(err);
            }

            res.send(album);
        })
    },

    delete_album: (req, res) => {
        Album.delete(req.params.id, (err, result) => {

            err ? res.send(err) : res.send(result);

        })
    }



};
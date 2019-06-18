let Artist = require('../models/artistModel');

module.exports = {

    // Return all artists
    list_all: (req, res) => {
        Artist.getAll((err, artists) => {
            if (err) {
                res.send(err);
            }

            res.json(artists);
        })
    },

    // Get by id
    get_artist: (req, res) => {
        Artist.getById(req.params.artistId, (err, artist) => {
            if (err) {
                res.send(err);
            }

            res.json(artist);
        })
    },

    lookup: (req, res) => {

        let name = req.params.name.replace("+", " ");

        Artist.lookup(name, (err, artist) => {

            if (err) {
                res.send(err);
            }

            if (artist.length > 0) {
                res.json(artist);
            } else {
                // Lookup in spotify and create;
            }
        })
    },

    create_artist: (req, res) => {

        Artist.create(req.body.name, (err, artist) => {
            if (err) {
                res.send(err);
            }

            res.json(artist);
        })
    }




}
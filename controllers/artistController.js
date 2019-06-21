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

        Artist.create(req.body.name, req.body.id, (err, artist) => {
            if (err) {
                res.send(err);
            }

            res.json(artist);
        })
    },


    update_artist: (req, res) => {

        Artist.update(req.params.id. req.body.name, (err, artist) => {
            if (err) {
                res.send(err);
            }

            res.json(artist);
        })

    },

    getGenres: (ids) => {
        let url = "https://api.spotify.com/v1/artists/?ids=" + ids.join(",");

        let uri = "https://accounts.spotify.com/api/token";


        fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${process.env.ACCESSTOKEN}`
            },
            body: "grant_type=client_credentials",
        }).then((response) => {
            response.json().then((res) => {
                let token = res.access_token;

                fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    res.json().then((res) => {
                        console.log(res.artists[0].genres);
                    })
                })

            })
        });
    }




}
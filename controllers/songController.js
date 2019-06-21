let Song = require('../models/songModel');

const fetch = require("node-fetch");

require('dotenv').config();

module.exports = {

    list_all: (req, res) => {

        Song.getAll((err, songs) => {
            if (err) {
                res.send(err);
            }

            res.json(songs);
        })

    },

    lookup: (req, res) => {

        Song.lookup(req.params.query, (err, songs) => {
            if (err) {
                console.error(err);
            }


            // TODO add to db
            res.json(songs)
        })

    },

    get_song: (req, res) => {
        Song.getById(req.params.id, (err, song) => {
            err ? res.send(err) : res.json(song);
        })
    },

    create_song: (req, res) => {

        let id = req.body.id;
        let title = req.body.title;
        let length = req.body.length;
        let tempo = req.body.tempo;
        let energy = req.body.energy;
        let valence = req.body.valence;
        let releaseDate = req.body.releaseDate;
        let genres = req.body.genres;
        let albumId = req.body.albumId;
        let artistId= req.body.artistId;

        Song.create(id, title, length, tempo, energy, valence, releaseDate, genres, albumId, artistId, (err, result) => {
            err ? res.send(err) : res.send(result)
        })
    },

    update_usage: (req, res) => {

        Song.updateUsage(req.params.id, req.params.incDec === 'inc', (err, result) => {
            err ? res.send(err) : res.send(result);
        })

    },

    delete_song: (req, res) => {

        Song.delete(req.params.id, (err, result) => {
            err ? res.send(err) : res.send(result);
        })

    },

    getAudioFeatures: (songs) => {

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

                fetch('https://api.spotify.com/v1/audio-features/?ids=' + songs.join(","), {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    res.json().then((res) => {
                        res.audio_features.forEach((track) => {
                            Song.addAudioFeatures(track.id, track.tempo, track.energy, track.valence, track.loudness);
                        })
                    })
                })

            })
        });

    }

};
let Song = require('../models/songModel');

module.exports = {

    lookup: (req, res) => {

        Song.lookup(req.params.query, (err, songs) => {
            if (err) {
                console.error(err);
            }


            // TODO add to db
            res.json(songs)
        })

    }

};
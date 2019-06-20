let express = require('express');
let router  = express.Router();

let playlist = require('../controllers/playlistController');

router.get('/', playlist.list_recent);

router.post('/:username', playlist.create);

router.get('/:id', playlist.get_playlist);

router.post('/:id/:songId', playlist.add_song);

router.delete('/:id/:songId', playlist.remove_song);

router.delete('/:id', playlist.delete_playlist);

module.exports = router;
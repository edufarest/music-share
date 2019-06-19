let express = require('express');
let router = express.Router();

let song = require('../controllers/songController');

router.get('/', song.list_all);

router.get('/:id', song.get_song);

router.get('/lookup/:query', song.lookup);

router.post('/', song.create_song);

router.put('/:id/:incDec', song.update_usage);

router.delete('/:id', song.delete_song);

module.exports = router;
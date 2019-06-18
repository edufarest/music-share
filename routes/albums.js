let express = require('express');
let router = express.Router();

let album = require('../controllers/albumController');

router.get('/', album.list_all);

router.get('/:id', album.get_album);

router.get('/lookup/:name', album.lookup);

router.post('/', album.create_album);

router.delete('/:id', album.delete_album);

module.exports = router;
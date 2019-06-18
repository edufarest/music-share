let express = require('express');
let router  = express.Router();

let artist = require('../controllers/artistController');

// GET all artists
router.get('/', artist.list_all);

// GET by id
router.get('/:id', artist.get_artist);

// GET by name
router.get('/lookup/:name', artist.lookup);

// Create an artist
router.post('/', artist.create_artist);

// Update an artist
//// ......

// Delete an artist
//// .....

module.exports = router;
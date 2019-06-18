let express = require('express');
let router = express.Router();

let song = require('../controllers/songController');

//
//
//
//

router.get('/lookup/:query', song.lookup);

module.exports = router;
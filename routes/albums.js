let express = require('express');
let router = express.Router();

let album = require('../controllers/albumController');

router.get('/', album.list_)
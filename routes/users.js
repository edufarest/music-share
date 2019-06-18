var express = require('express');
var router = express.Router();


const passport = require('passport');
require('../passport');

var user = require('../controllers/userController');

/* GET users listing. */
router.get('/', user.list_all);

// Get specific user
router.get('/:username', user.get_user);

// Create a new user
router.post('/', user.create_user);


// TODO Add middle ware to these routes

// Update an user
router.put('/:username', user.update_user);
//, passport.authenticate('jwt', {session: false})

// Delete an user
router.delete('/:username', user.delete_user);
//, passport.authenticate('jwt', {session: false})

module.exports = router;

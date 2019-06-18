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

// Update an user
router.put('/:username', passport.authenticate('jwt', {session: false}), user.update_user);

// Delete an user
router.delete('/:username', passport.authenticate('jwt', {session: false}), user.delete_user);


module.exports = router;

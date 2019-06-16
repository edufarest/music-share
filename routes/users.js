var express = require('express');
var router = express.Router();

var user = require('../controllers/userController');

/* GET users listing. */
router.get('/', user.list_all);

// Get specific user
router.get('/:username', user.get_user);

// Create a new user
router.post('/', user.create_user);

// Update an user
router.put('/:username', user.update_user);

// Delete an user
router.delete('/:username', user.delete_user);

module.exports = router;

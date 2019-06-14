var express = require('express');
var router = express.Router();

var user = require('../controllers/userController');

/* GET users listing. */
router.get('/', user.list_all);

// Get specific user
router.get('/:userId', user.get_user);

// Create a new user
router.post('/', user.create_user);

// Update an user
router.put('/:userId', user.update_user);

// Deleted an user
router.delete('/:userId', user.delete_user);

module.exports = router;

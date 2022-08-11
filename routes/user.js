var express = require('express');
var router = express.Router();
const userController = require('../controllers/user/user')

/* GET users listing. */
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;

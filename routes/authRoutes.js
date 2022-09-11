const express = require('express');
const router = express.Router();
const Users = require('../controllers/Users');

let user = new Users();

router.get('/', user.view_login);
router.post('/login', user.login);
router.post('/register', user.register);
router.get('/logout', user.logout);

module.exports = router;
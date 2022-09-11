const express = require('express');
const router = express.Router();
const Students = require('../controllers/Students');

router.get('/profile', Students.view_profile);

module.exports = router;
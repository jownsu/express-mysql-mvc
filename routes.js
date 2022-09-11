const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

router.use('/', authRoutes);
router.use('/students/', studentRoutes);

module.exports = router;
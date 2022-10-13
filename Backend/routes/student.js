const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/student')

router.get('/dashboard', studentController.showDashboard)

module.exports = router
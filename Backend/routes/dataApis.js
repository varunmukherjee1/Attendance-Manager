const express = require('express');
const router = express.Router();
const dataController = require('../Controllers/data')

router.get('/getClasses', dataController.sendClasses)
router.get('/getTeachers',dataController.sendTeachers)
router.get('/getStudents',dataController.sendStudents)
router.get('/getAdmins',dataController.sendAdmins)
router.get('/getCookieDetails', dataController.sendCookieData)

module.exports = router
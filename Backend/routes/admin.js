const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin')

router.post('/add', adminController.addAdmin)
router.post('/remove', adminController.removeAdmin)
router.get('/removeStudent/:x', adminController.removeStudent)
router.get('/removeTeacher/:x', adminController.removeTeacher)
router.get('/removeCourse/:x', adminController.removeClass)
router.get('/getStudents', adminController.sendStudents)
router.get('/getTeachers', adminController.sendTeachers)
router.get('/getCourses', adminController.sendClasses)
router.get('/getAdmins', adminController.sendAdmins)

module.exports = router
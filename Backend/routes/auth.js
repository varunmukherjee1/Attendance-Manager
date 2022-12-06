const express = require("express")
const router = express.Router()
const authController = require("../Controllers/auth.js")

router.get('/generateQrCode/:x', authController.generateQrCode)
router.post('/markAttendance/:id', authController.markAttendance)
router.post("/addStudent/:x",authController.addStudent)
router.post("/addTeacher/:x",authController.addTeacher)

module.exports = router
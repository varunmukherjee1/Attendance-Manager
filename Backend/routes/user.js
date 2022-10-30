const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user')

// router.get('/dashboard', userController.showDashboard)
router.post("/login" , userController.login)
router.post("/register",userController.register)

module.exports = router
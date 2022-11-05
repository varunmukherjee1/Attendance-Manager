const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user')

// router.get('/dashboard', userController.showDashboard)
router.post("/login" , userController.login)
router.post("/register",userController.register)
router.get("/logout",userController.logout)
router.post("/update",userController.updateUser)

module.exports = router
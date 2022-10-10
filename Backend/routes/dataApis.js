const express = require('express');
const router = express.Router();
const dataController = require('../Controllers/data')

router.get('/getClasses', dataController.sendClasses)
router.get('/getCookieDetails', (req, res) => res.send(req.cookies))

module.exports = router
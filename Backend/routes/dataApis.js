const express = require('express');
const router = express.Router();
const dataController = require('../Controllers/data')

/**
 * @swagger
 * /api/getClasses:
 *  get:
 *      tags:
 *          - developers
 *      summary: Get all registered classes
 *      responses:
 *          200:
 *              description: Successfully got a response from the server (The credentials can be correct or incorrect)
 *              content:
 *                 application/json:
 *                     schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              data:
 *                                type: array
 *                                items:
 *                                   type: object
 *                                   properties:
 *                                         name:
 *                                              type: string
 *                                         teachers:
 *                                              type: array
 *                                              items: 
 *                                                 type:object
 *                                                 properties:
 *                                                    email: string
 *                                         students:
 *                                             type: array
 *                                             items:
 *                                                 type: object
 *                                                 properties:
 *                                                     roll_number: string
 *                                                     qrcode_string: string
 *                                         attendance:
 *                                             type: array
 *                                             items:
 *                                                 type: object
 *                                                 properties:
 *                                                     date:
 *                                                         type: string
 *                                                     values: 
 *                                                         type: array
 *                                                         items:
 *                                                             type: object
 *                                                             properties:
 *                                                                 roll_no: string
 *                                                                 status: string
 *                                                      
 *          500:
 *              description: In case of any errors or the data not found (Like server error)
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *                             message:
 *                                 type: string
 */
router.get('/getClasses', dataController.sendClasses)
router.get('/getClass/:cid', dataController.sendClass)
router.get('/getTeachers',dataController.sendTeachers)
router.get('/getStudents',dataController.sendStudents)
router.get('/getAdmins',dataController.sendAdmins)
router.get('/getCookieDetails', dataController.sendCookieData)

module.exports = router
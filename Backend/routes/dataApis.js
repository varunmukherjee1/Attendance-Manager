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
 *              description: Successfully got a response from the server
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
 *                                                 type: object
 *                                                 properties:
 *                                                    email: 
 *                                                          type: string
 *                                         students:
 *                                             type: array
 *                                             items:
 *                                                 type: object
 *                                                 properties:
 *                                                     roll_number: 
 *                                                          type: string
 *                                                     qrcode_string: 
 *                                                          type: string
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
 *                                                                 roll_number: 
 *                                                                      type: string
 *                                                                 qrcode_string: 
 *                                                                      type: string
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

/**
 * @swagger
 * /api/getClass/{cid}:
 *  get:
 *      tags:
 *          - developers
 *      summary: Retrieve class data from database
 *      responses:
 *          200:
 *              description: Successfully got an response from server
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *                             data:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      teachers:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  email:
 *                                                     type: string
 *                                      students:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  roll_number: 
 *                                                      type: string
 *                                                  qrcode_string:
 *                                                      type: string
 *                                      attendance:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  date:
 *                                                      type: string
 *                                                  values:
 *                                                      type: array
 *                                                      items:
 *                                                          type: object
 *                                                          properties:
 *                                                              roll_no:
 *                                                                  type: string
 *                                                              status:
 *                                                                  type: string
 *          500:
 *              description: User is unauthorized to perform the operation or encountered some server error
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 */
router.get('/getClass/:cid', dataController.sendClass)

/**
 * @swagger
 * /api/getTeachers:
 *  get:
 *      tags:
 *          - developers
 *      summary: Retrieve teacher data from database
 *      responses:
 *          200:
 *              description: Successfully received a response from database
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *                             data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          email:
 *                                              type: string
 *                                          password:
 *                                              type: string
 *          500:
 *              description: User is unauthorized to perform the operation or encountered a server error
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 */
router.get('/getTeachers',dataController.sendTeachers)

/**
 * @swagger
 * /api/getStudents:
 *  get:
 *      tags:
 *          - developers
 *      summary: Retrieve student data from database
 *      responses:
 *          200:
 *              description: Successfully received a response from database
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *                             data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          email:
 *                                              type: string
 *                                          roll_number:
 *                                              type: string
 *                                          password:
 *                                              type: string
 *          500:
 *              description: User is unauthorized to perform the operation or encountered a server error
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 */
router.get('/getStudents',dataController.sendStudents)


/**
 * @swagger
 * /api/getAdmins:
 *  get:
 *      tags:
 *          - developers
 *      summary: Retrieve admin data from database
 *      responses:
 *          200:
 *              description: Successfully received a response from database
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *                             data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          name:
 *                                              type: string
 *                                          email:
 *                                              type: string
 *                                          password:
 *                                              type: string
 *          500:
 *              description: User is unauthorized to perform the operation or encountered a server error
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 */
router.get('/getAdmins',dataController.sendAdmins)


/**
 * @swagger
 * /api/getCookieDetails:
 *  get:
 *      tags:
 *          - developers
 *      summary: Retrieve cookie data from database
 *      responses:
 *          200:
 *              description: Successfully received a response from database
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *                             data:
 *                                  type: object
 *                                  properties:
 *                                      name:
 *                                          type: string
 *                                      email:
 *                                          type: string
 *                                      roll_number:
 *                                          type: string
 *                                      password:
 *                                          type: string
 *          500:
 *              description: User is unauthorized to perform the operation or encountered a server error
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 */
router.get('/getCookieDetails', dataController.sendCookieData)

module.exports = router
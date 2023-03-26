const express = require("express")
const router = express.Router()
const authController = require("../Controllers/auth.js")


/**
 * @swagger
 * /auth/generateQrCode/{id}:
 *  get:
 *      tags:
 *          - developers
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema: 
 *              type: string
 *            description: Id of the class inorder to generate QR Code
 *      summary: Generate QR Code for that particular class
 *      responses:
 *          200:
 *              description: Successfully generated the QR Code
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *          500:
 *              description: User is unauthorized to perform the operation or the password provided by the user is incorrect
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 */
router.get('/generateQrCode/:x', authController.generateQrCode)


/**
 * @swagger
 * /auth/markAttendance/{id}:
 *  post:
 *      tags:
 *          - developers
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema: 
 *              type: string
 *            description: Id of the class inorder to take attendance
 *      summary: Mark attendance for that particular class
 *      responses:
 *          200:
 *              description: Successfully marked the attendance
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *          500:
 *              description: User is unauthorized to perform the operation or the password provided by the user is incorrect
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          qrCodeArr:
 *                              type: string    
 *                      
 *                               
 */
router.post('/markAttendance/:id', authController.markAttendance)


/**
 * @swagger
 * /auth/addStudent/{id}:
 *  post:
 *      tags:
 *          - developers
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema: 
 *              type: string
 *            description: Id of the class in which the student has to be added
 *      summary: Add student in that particular class
 *      responses:
 *          200:
 *              description: Successfully added the student
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *          500:
 *              description: User is unauthorized to perform the operation or the password provided by the user is incorrect
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          studentEmail:
 *                              type: string                               
 */
router.post("/addStudent/:x",authController.addStudent)

/**
 * @swagger
 * /auth/addTeacher/{id}:
 *  post:
 *      tags:
 *          - developers
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema: 
 *              type: string
 *            description: Id of the class in which the teacher has to be added
 *      summary: Add teacher in that particular class
 *      responses:
 *          200:
 *              description: Successfully added the teacher
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *          500:
 *              description: User is unauthorized to perform the operation or the password provided by the user is incorrect
 *              content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             success:
 *                                 type: boolean
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          teacherEmail:
 *                              type: string                               
 */
router.post("/addTeacher/:x",authController.addTeacher)

// router.post("/addClass",authController.addClass)

module.exports = router
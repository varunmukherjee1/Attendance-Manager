const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/admin')

/**
 * @swagger
 * /admin/add:
 *  post:
 *      tags:
 *          - admins
 *      summary: Adds a new admin to the database
 *      responses:
 *          200:
 *              description: Successfully added new admin to the database
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
 *                          full_name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          admin_password:
 *                              type: string
 */
router.post('/add', adminController.addAdmin)

/**
 * @swagger
 * /admin/remove:
 *  get:
 *      tags:
 *          - admins
 *      summary: Removes admin data from the database
 *      responses:
 *          200:
 *              description: Successfully added new admin to the database
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
 *                          id:
 *                              type: string
 */
router.post('/remove', adminController.removeAdmin)
router.get('/removeStudent/:x', adminController.removeStudent)
router.get('/removeTeacher/:x', adminController.removeTeacher)
router.get('/removeCourse/:x', adminController.removeClass)
router.get('/getStudents', adminController.sendStudents)
router.get('/getTeachers', adminController.sendTeachers)
router.get('/getCourses', adminController.sendClasses)
router.get('/getAdmins', adminController.sendAdmins)

module.exports = router
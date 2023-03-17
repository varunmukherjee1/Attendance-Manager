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
 *              description: Successfully removed the admin from the database
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
router.post('/remove', adminController.removeAdmin)

/**
 * @swagger
 * /admin/removeStudent/{id}:
 *  get:
 *      tags:
 *          - admins
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema: 
 *              type: string
 *            description: Id of the student to be removed
 *      summary: Removes student data from the database
 *      responses:
 *          200:
 *              description: Successfully removed the student from the database
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
router.get('/removeStudent/:x', adminController.removeStudent)

/**
 * @swagger
 * /admin/removeTeacher/{id}:
 *  get:
 *      tags:
 *          - admins
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema: 
 *              type: string
 *            description: Id of the teacher to be removed
 *      summary: Removes teacher data from the database
 *      responses:
 *          200:
 *              description: Successfully removed the teacher from the database
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
router.get('/removeTeacher/:x', adminController.removeTeacher)

/**
 * @swagger
 * /admin/removeCourse/{id}:
 *  get:
 *      tags:
 *          - admins
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema: 
 *              type: string
 *            description: Id of the course to be removed
 *      summary: Removes course data from the database
 *      responses:
 *          200:
 *              description: Successfully removed the course from the database
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
router.get('/removeCourse/:x', adminController.removeClass)

/**
 * @swagger
 * /admin/getStudents:
 *  get:
 *      tags:
 *          - admins
 *      summary: Retrieve students data from the database
 *      responses:
 *          200:
 *              description: Successfully retrieved the students data from the database
 *          404:
 *              description: Page not found
 *          500:
 *              description: User is unauthorized to perform the operation or the password provided by the user is incorrect
 */
router.get('/getStudents', adminController.sendStudents)

/**
 * @swagger
 * /admin/getTeachers:
 *  get:
 *      tags:
 *          - admins
 *      summary: Retrieve Teachers data from the database
 *      responses:
 *          200:
 *              description: Successfully retrieved the Teachers data from the database
 *          404:
 *              description: Page not found
 *          500:
 *              description: User is unauthorized to perform the operation or the password provided by the user is incorrect
 */
router.get('/getTeachers', adminController.sendTeachers)

/**
 * @swagger
 * /admin/getCourses:
 *  get:
 *      tags:
 *          - admins
 *      summary: Retrieve Courses data from the database
 *      responses:
 *          200:
 *              description: Successfully retrieved the Courses data from the database
 *          404:
 *              description: Page not found
 *          500:
 *              description: User is unauthorized to perform the operation or the password provided by the user is incorrect
 */
router.get('/getCourses', adminController.sendClasses)

/**
 * @swagger
 * /admin/getAdmins:
 *  get:
 *      tags:
 *          - admins
 *      summary: Retrieve Admins data from the database
 *      responses:
 *          200:
 *              description: Successfully retrieved the Admins data from the database
 *          404:
 *              description: Page not found
 *          500:
 *              description: User is unauthorized to perform the operation or the password provided by the user is incorrect
 */
router.get('/getAdmins', adminController.sendAdmins)

module.exports = router
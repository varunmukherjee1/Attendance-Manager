const Student = require("../Models/student")
const Teacher = require('../Models/teacher')
const Admin = require('../Models/admin')
const Class = require('../Models/class')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const COOKIE_NAME = 'user'
const encryption = require('../public/scripts/encryption')

// const showDashboard = (req, res) => {
//     if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
//         res.redirect('login')
//     } else if (req.cookies[COOKIE_NAME].userType == "teacher" || req.cookies[COOKIE_NAME].userType == "admin") {
//         res.redirect('/pageNotFound')
//     } else {
//         res.render('dashboardStudent', req.cookies[COOKIE_NAME])
//     }
// }

const register = async (req, res) => {

    try {
        
        const {
            full_name,
            roll_number,
            email,
            password,
            user_type,
        } = req.body

    
        let encryptedPassword = String(await encryption.encrypt(password))
        // console.log(encrypt(password));
    
        let student = await Student.findOne({ email })
        let teacher = await Teacher.findOne({ email })

        if (student || teacher) {
            return res
                .status(200)
                .send({
                    message: "User already exists",
                    success: false
                })
        }
    
        if (user_type == 'Student') {

            const registerStudent = new Student({
                name: full_name,
                roll_number: roll_number,
                email: email,
                password: encryptedPassword
            })

            let registeredStudent = await registerStudent.save()
            // registeredStudent.userType = "student"
            // res.cookie(COOKIE_NAME, registeredStudent)

            return res
                .status(200)
                .send({
                    message: "User created successfully",
                    success: true
                })
        }

        if (user_type == 'Teacher') {
            const registerTeacher = new Teacher({
                name: full_name,
                email: email,
                password: encryptedPassword,
            })

            let registeredTeacher = await registerTeacher.save()
            registeredTeacher.userType = "teacher"
            res.cookie(COOKIE_NAME, registeredTeacher)
            
            return res
                .status(200)
                .send({
                    message: "User created successfully",
                    success: true
                })  
        }
        
    } catch (error) {
        
        console.log("Error = " + error);

        return res
            .status(500)
            .send({
                message: "Error creating user",
                success: false
            })
    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body

        let student = await Student.findOne({ email })
        let teacher = await Teacher.findOne({ email })
        let admin = await Admin.findOne({ email })

        if (student != null) {
            let isValid = await encryption.comparePasswords(student.password, password)
            if (isValid) {
                let studentCookie = {
                    name: student.name,
                    email: student.email,
                    roll_number: student.roll_number,
                    password: student.password,
                    userType: "student",
                    __v: student.__v
                }
                res.cookie(COOKIE_NAME, studentCookie)

                return res
                    .status(200)
                    .send({
                        success: true,
                        message: "Login successful"
                    })
            } else {
                return res
                    .status(200)
                    .send({
                        success: false,
                        message: "Wrong password"
                    })
            }
        } 
        else if (teacher != null) {
            let isValid = await encryption.comparePasswords(teacher.password, password)
            if (isValid) {
                let teacherCookie = {
                    name: teacher.name,
                    email: teacher.email,
                    password: teacher.password,
                    userType: "teacher",
                    __v: teacher.__v
                }
                res.cookie(COOKIE_NAME, teacherCookie)

                return res
                    .status(200)
                    .send({
                        success: true,
                        message: "Login successful"
                    })
            } else {
                
                return res
                    .status(200)
                    .send({
                        success: false,
                        message: "Wrong password"
                    })
            }
        } 
        else if (admin != null) {
            let isValid = await encryption.comparePasswords(admin.password, password)
            if (isValid) {
                let adminCookie = {
                    name: admin.name,
                    email: admin.email,
                    roll_number: admin.roll_number,
                    password: admin.password,
                    userType: "admin",
                    __v: admin.__v
                }
                res.cookie(COOKIE_NAME, adminCookie)

                return res
                    .status(200)
                    .send({
                        success: true,
                        message: "Login successful"
                    })
            } else {               
                return res
                    .status(200)
                    .send({
                        success: false,
                        message: "Wrong password"
                    })
            }
        } else {
            return res
                    .status(200)
                    .send({
                        success: false,
                        message: "User doesn't exist"
                    })
        }
        
    } catch (error) {
        
        console.log("Error = " + error);

        return res
                .status(500)
                .send({
                    success: false,
                    message: "Error Logging in"
                })
    }

}

module.exports = {
    login,
    register
}
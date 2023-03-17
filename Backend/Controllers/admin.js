const Admin = require('../Models/admin')
const Student = require('../Models/student')
const Teacher = require('../Models/teacher')
const Class = require('../Models/class')
const encryption = require('../public/scripts/encryption')
const COOKIE_NAME = 'user'

const addAdmin = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res
            .status(500)
            .send({
                success: false
            })
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res
            .status(500)
            .send({
                success: false
            })
    }
    const {
        full_name,
        email,
        password,
        admin_password
    } = req.body

    // console.log("here")
    // console.log({
    //     full_name,
    //     email,
    //     password,
    //     admin_password
    // })

    let encryptedPassword = String(await encryption.encrypt(password))
    if (!(await encryption.comparePasswords(req.cookies[COOKIE_NAME].password, admin_password))) {
        return res
            .status(500)
            .send({
                success: false
            })
    }
    const registerAdmin = new Admin({
        name: full_name,
        email,
        password: encryptedPassword
    })
    const registeredAdmin = await registerAdmin.save()
    console.log(registeredAdmin);

    return res
            .status(200)
            .send({
                success: true
            })
}

const removeAdmin = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res
            .status(500)
            .send({
                success: false
            })
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res
            .status(500)
            .send({
                success: false
            })
    }
    const {id} = req.body

    let admin = await Admin.deleteOne({ _id: id })
    console.log(admin);

    return res
            .status(200)
            .send({
                success: true
            })
}

const removeStudent = async (req, res) => {

    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res
            .status(500)
            .send({
                success: false
            })
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res
            .status(500)
            .send({
                success: false
            })
    }

    try {
        const id = req.params.x
        let student = await Student.deleteOne({ _id: id })
        console.log(student);

        return res
            .status(200)
            .send({
                success: true
            })

    } catch (error) {

        return res
            .status(500)
            .send({
                success: false
            })
    }
    
}

const removeTeacher = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res
            .status(500)
            .send({
                success: false
            })
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res
            .status(500)
            .send({
                success: false
            })
    }

    try {
        const email = req.params.x
        let teacher = await Teacher.deleteOne({ email: email })
        console.log(teacher);

        return res
            .status(200)
            .send({
                success: true
            })
    } catch (error) {
        return res
            .status(500)
            .send({
                success: false
            })
    }
    

}

const removeClass = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res
            .status(500)
            .send({
                success: false
            })
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res
            .status(400)
            .send({
                success: false
            })
    }
    const id = req.params.x
    let Course = await Class.deleteOne({ _id: id })
    console.log(Course);

    return res
            .status(200)
            .send({
                success: true
            })
}

const sendStudents = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.status(500).redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.status(404).redirect('/pageNotFound')
    }
    try {
        let studObj = await Student.find()
        res.status(200).send(studObj);
    } catch (error) {
        console.log(error);
    }
}

const sendTeachers = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.status(500).redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.status(404).redirect('/pageNotFound')
    }
    try {
        let teachObj = await Teacher.find()
        res.status(200).send(teachObj);
    } catch (error) {
        console.log(error);
    }
}

const sendClasses = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.status(500).redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.status(404).redirect('/pageNotFound')
    }
    try {
        let classObj = await Class.find()
        res.status(200).send(classObj);
    } catch (error) {
        console.log(error);
    }
}

const sendAdmins = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.status(500).redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.status(404).redirect('/pageNotFound')
    }
    try {
        let adminObj = await Admin.find()
        res.status(200).send(adminObj);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addAdmin,
    removeAdmin,
    removeStudent,
    removeTeacher,
    removeClass,
    sendStudents,
    sendTeachers,
    sendClasses,
    sendAdmins
}
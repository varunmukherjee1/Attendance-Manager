const Admin = require('../Models/admin')
const Student = require('../Models/student')
const Teacher = require('../Models/teacher')
const Class = require('../Models/class')

const addAdmin = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    const {
        full_name,
        email,
        password,
        admin_password
    } = req.body
    let encryptedPassword = String(await encryption.encrypt(password))
    if (!(await encryption.comparePasswords(req.cookies[COOKIE_NAME].password, admin_password))) {
        return res.redirect('/admin')
    }
    const registerAdmin = new Admin({
        name: full_name,
        email,
        password: encryptedPassword
    })
    const registeredAdmin = await registerAdmin.save()
    res.redirect('/admin')
}

const removeAdmin = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    const {
        email
    } = req.body
    let admin = await Admin.deleteOne({ email: email })
    console.log(admin);
    res.redirect('/admin')
}

const removeStudent = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    const email = req.params.x
    let student = await Student.deleteOne({ email: email })
    console.log(student);
    res.redirect('/admin')
}

const removeTeacher = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    const email = req.params.x
    let teacher = await Teacher.deleteOne({ email: email })
    console.log(teacher);
    res.redirect('/admin')
}

const removeClass = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    const name = req.params.x
    let Course = await Class.deleteOne({ name: name })
    console.log(Course);
    res.redirect('/admin')
}

const sendStudents = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    try {
        let studObj = await Student.find()
        res.send(studObj);
    } catch (error) {
        console.log(error);
    }
}

const sendTeachers = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    try {
        let teachObj = await Teacher.find()
        res.send(teachObj);
    } catch (error) {
        console.log(error);
    }
}

const sendClasses = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    try {
        let classObj = await Class.find()
        res.send(classObj);
    } catch (error) {
        console.log(error);
    }
}

const sendAdmins = async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    } else if (req.cookies[COOKIE_NAME].userType == "student" || req.cookies[COOKIE_NAME].userType == "teacher") {
        return res.redirect('/pageNotFound')
    }
    try {
        let adminObj = await Admin.find()
        res.send(adminObj);
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
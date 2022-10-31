const Class = require('../Models/class')
const Students = require("../Models/student")
const Teachers = require("../Models/teacher")
const Admins = require("../Models/admin")

const sendClasses = async (req, res) => {
    // if (req.cookies == undefined || req.cookies == null || req.cookies['user'] == null) {
    //     return res.redirect('login')
    // }

    const classes = await Class.find()
    // console.log(classes)

    res.send(classes);
}

const sendStudents = async (req,res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies['user' == null]){
        return res.redirect('login')
    }

    const students = await Students.find()

    res.send(students)
}

const sendTeachers = async (req,res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies['user' == null]){
        return res.redirect('login')
    }

    const teachers = await Teachers.find()

    res.send(teachers)
}

const sendAdmins = async (req,res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies['user' == null]){
        return res.redirect('login')
    }

    const admins = await Admins.find()

    res.send(admins)
}


module.exports = {
    sendClasses,
    sendStudents,
    sendTeachers,
    sendAdmins
}
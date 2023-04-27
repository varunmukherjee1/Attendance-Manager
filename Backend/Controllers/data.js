const Class = require("../Models/class");
const Students = require("../Models/student");
const Teachers = require("../Models/teacher");
const Admins = require("../Models/admin");

const sendClasses = async (req, res) => {
  if (
    req.cookies == undefined ||
    req.cookies == null ||
    req.cookies["user"] == null
  ) {
    return res.status(200).send({ success: false });
  }

  const classes = await Class.find();
  // console.log("classes = " + classes)

  return res.status(200).send({ success: true, data: classes });
};

const sendStudents = async (req, res) => {
  if (
    req.cookies == undefined ||
    req.cookies == null ||
    req.cookies["user"] == null
  ) {
    return res.status(200).send({ success: false });
  }

  const students = await Students.find();

  return res.status(200).send({ success: true, data: students });
};

const sendTeachers = async (req, res) => {
  if (
    req.cookies == undefined ||
    req.cookies == null ||
    req.cookies["user"] == null
  ) {
    return res.status(200).send({ success: false });
  }

  const teachers = await Teachers.find();

  return res.status(200).send({ success: true, data: teachers });
};

const sendAdmins = async (req, res) => {
  if (
    req.cookies == undefined ||
    req.cookies == null ||
    req.cookies["user"] == null
  ) {
    return res.status(200).send({ success: false });
  }

  const admins = await Admins.find();

  return res.status(200).send({ success: true, data: admins });
};

const sendCookieData = (req, res) => {
  if (
    req.cookies == undefined ||
    req.cookies == null ||
    req.cookies["user"] == null
  ) {
    return res.status(200).send({ success: false });
  }

  console.log(req.cookies);

  return res.status(200).send({ success: true, data: req.cookies });
};

const sendClass = async (req, res) => {
  if (
    req.cookies == undefined ||
    req.cookies == null ||
    req.cookies["user"] == null
  ) {
    return res.status(200).send({ success: false });
  }

  const cid = req.params.cid;
  const classData = await Class.findOne({ _id: cid });
  if (classData != null) {
    return res.status(200).send({ success: true, data: classData });
  }

  return res.status(200).send({ success: false });
};

module.exports = {
  sendClasses,
  sendStudents,
  sendTeachers,
  sendAdmins,
  sendCookieData,
  sendClass
};

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

const generateQrCode = async (req, res) => {
  if (
    req.cookies == undefined ||
    req.cookies == null ||
    req.cookies["user"] == null
  ) {
    return res.status(200).send({ success: false });
  }
  try {
    let classObj = await Class.findOne({ _id: req.params.x });
    let studClass = classObj.students;
    let d = new Date();
    let timeStr1 = `${Math.floor(d.getTime() / (1000 * 60))}`;
    // let timeStr1 = `${Math.floor(d.getTime()/(1000*60*60))}`
    let timeStr2 = `${Math.floor(d.getTime() / (1000 * 60)) + 5}`;
    // let timeStr2 = `${Math.floor(d.getTime()/(1000*60*60)) + 1}`
    let dateStr = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    let arr = [];
    // Adding Absent array
    for (let i = 0; i < studClass.length; i++) {
      let tempObj = {
        roll_no: studClass[i].roll_number,
        status: "A",
      };
      arr.push(tempObj);
    }
    let timeStampStr = `${dateStr} ${timeStr1} ${timeStr2}`;
    let matchFound = false;
    let attObj = {
      date: timeStampStr,
      values: arr,
    };
    for (let i = 0; i < classObj.attendance.length; i++) {
      dateVal = classObj.attendance[i].date.split(" ");
      if (
        dateVal[0] == dateStr &&
        parseInt(dateVal[1]) >= parseInt(timeStr1) &&
        parseInt(dateVal[1]) <= parseInt(timeStr2)
      ) {
        console.log("here");
        matchFound = true;
      }
    }
    if (!matchFound) {
      // Generating Qr Unique String
      studClass.forEach((std) => {
        let roll = std.roll_number;
        let qrStr = `${roll}%%${req.params.x}%%${dateStr}%%${timeStr1}`;

        std.qrcode_string = qrStr;
      });
      classObj.attendance.push(attObj);
      const co = await classObj.save();
    }

    return res
        .status(200)
        .send({ success: true })
  } catch (error) {
    console.log(error);
    return res
        .status(200)
        .send({ success: false })
  }
};

module.exports = {
  sendClasses,
  sendStudents,
  sendTeachers,
  sendAdmins,
  sendCookieData,
  sendClass,
  generateQrCode
};

const fs = require("fs")

const Class = require("../Models/class");
const Students = require("../Models/student");
const Teachers = require("../Models/teacher");
const Admins = require("../Models/admin");
const COOKIE_NAME = 'user'

const generateQrCode = async (req, res) => {

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
          (parseInt(dateVal[1]) >= parseInt(timeStr1) &&
          parseInt(dateVal[1]) <= parseInt(timeStr2) ) ||
          (parseInt(dateVal[2]) >= parseInt(timeStr1) &&
          parseInt(dateVal[2]) <= parseInt(timeStr2))
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

const markAttendance = async (req, res) => {

  try {
    
    let val = req.body.qrCodeArr;

    console.log("Here");
    console.log(val);

    const classObj = await Class.findOne({ _id: req.params.id })
    const stds = classObj.students;
    const attend = classObj.attendance;
    let passStr = val.split(";;")

    for (let i = 0; i < passStr.length; i++) {
        let tempStr = passStr[i];

        for (let j = 0; j < stds.length; j++) {

            if (stds[j].qrcode_string == tempStr) {

                let tempRoll = stds[j].roll_number;
                let tempArr = tempStr.split("%%");
                let dateStr = tempArr[2];
                let timeStr = tempArr[3];

                attend.forEach((att) => {
                    let attDate = att.date.split(" ");
                    if ((attDate[0] == dateStr) && (attDate[1] == timeStr)) {
                        att.values.forEach((stdVal) => {
                            if (stdVal.roll_no == tempRoll) {
                                stdVal.status = "P";
                            }
                        })
                    }
                });
            }
        }
    }
    const co = await classObj.save();

    return res
      .status(200)
      .send({
        success: true
      })

  } catch (error) {
    console.log("Mark Attendace Error");
    console.log(error);

    return res
      .status(500)
      .send({
        success:false
      })
  }
}

const addStudent =  async (req, res) => {
  if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
    return res
      .status(400)
      .send({
        success:false
      })
  }
  try {
      let studObj = await Students.findOne({ email: req.body.studentEmail })
      let classObj = await Class.findOne({ _id: req.params.x })
      if (studObj == null || classObj == null){
        return res
              .status(400)
              .send({
                success:false
              })
      }

      let i = 0
      while (i < classObj.students.length) {
          if (classObj.students[i].roll_number == studObj.roll_number) {
            return res
              .status(400)
              .send({
                success:false
              })
          }
          i++
      }
      let newStudObj = {
          roll_number: studObj.roll_number,
          qrcode_string: `${studObj.roll_number}%%${req.params.x}%%06/04/2022`
      }
      for (let i = 0; i < classObj.attendance.length; i++) {
          let newObj = {
              roll_no: studObj.roll_number,
              status: "A"
          }
          classObj.attendance[i].values.push(newObj);
      }
      classObj.students.push(newStudObj)
      classObj.save();

      return res
        .status(200)
        .send({
          success: true
        })
  } catch (error) {
      console.log(error);

      return res
        .status(500)
        .send({
          success:false
        })
  }
}

const addTeacher =  async (req, res) => {
  if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
    return res
      .status(400)
      .send({
        success:false
      })
  }
  try {
      let teacObj = await Teachers.findOne({ email: req.body.teacherEmail })
      let classObj = await Class.findOne({ _id: req.params.x })

      if (teacObj == null || classObj == null){
        return res
          .status(400)
          .send({
            success:false
          })
      }
      let i = 0
      while (i < classObj.teachers.length) {
          if (classObj.teachers[i].email == teacObj.email) {
            return res
              .status(400)
              .send({
                success:false
              })
          }
          i++
      }

      classObj.teachers.push({
          email: teacObj.email
      })
      classObj.save();

      return res
        .status(200)
        .send({
          success: true
        })
  } catch (error) {
      console.log(error);

      return res
        .status(500)
        .send({
          success:false
        })
  }
}

const addClass = async (req,res) => {

  if (req.cookies == undefined || req.cookies == null || req.cookies['user'] == null) {
    return res
    .status(400)
    .send({
      success:false
    })
  }

  try {

    let { className } = req.body
    let date = new Date()

    const uID = {
        email: req.cookies[COOKIE_NAME].email
    }

    let classObj = new Class({
        name: className,
        teachers: [uID],
        students: [],
        attendance: []
    })

    await classObj.save()

    let classObject = await Class.findOne({ name: className })

    // if (studentEmail != '') {
    //     let student = await Student.findOne({ email: studentEmail })
    //     const sID = {
    //         roll_number: student.roll_number,
    //         qrcode_string: `${student.roll_number}%%${className}%%${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    //     }
    //     classObject.students.push(sID);
    // }
    // if (teacherEmail != '') {
    //     let teacher = await Teacher.findOne({ email: teacherEmail })
    //     const tID = {
    //         email: teacher.email
    //     }
    //     classObject.teachers.push(tID);
    // }

    let results1 = [];
    fs.createReadStream(`public/Files/teachers.csv`)
        .pipe(csv({}))
        .on('data', (data) => results1.push(data))
        .on('end', async () => {
            if(results1 != '') {
                let j = 0;
                while (j < results1.length) {
                    try {
                        let detail = `${results1[j].mail}`;
                        let teacObj = await Teacher.findOne({ email: detail })
                        if (teacObj == null || classObject == null) res.redirect('/dashboardTeacher')
                        let i = 0
                        while (i < classObject.teachers.length) {
                            if (classObject.teachers[i].email == teacObj.email) {
                                return res.redirect('/dashboardTeacher')
                            }
                            i++
                        }
                        classObject.teachers.push({
                            email: teacObj.email
                        })
                    } catch (error) {
                        console.log(error);
                    }
                    j++;
                }
                await classObject.save();
            }
        });

    let results = [];
    fs.createReadStream(`public/Files/students.csv`)
        .pipe(csv({}))
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            if(results != '') {
                let j = 0;
                while (j < results.length) {
                    try {
                        let detail = `${results[j].mail}`;
                        // console.log(detail);
                        let studObj = await Student.findOne({ email: detail })
                        if (studObj == null || classObject == null) res.redirect('/dashboardTeacher')
                        let i = 0
                        while (i < classObject.students.length) {
                            if (classObject.students[i].roll_number == studObj.roll_number) {
                                return res.redirect('/dashboardTeacher')
                            }
                            i++
                        }
                        let newStudObj = {
                            roll_number: studObj.roll_number,
                            qrcode_string: `${studObj.roll_number}%%${className}%%06/04/2022`
                        }
                        classObject.students.push(newStudObj)
                    } catch (error) {
                        console.log(error);
                    }
                    j++;
                }
                await classObject.save();
            }
        });

    await classObject.save()

    fs.writeFile(__dirname + '/public/Files/teachers.csv', '', function () { console.log("File 1 cleared"); })
    fs.writeFile(__dirname + '/public/Files/students.csv', '', function () { console.log("File 2 cleared"); })
    // res.redirect('/dashboardTeacher')
    return res
            .status(200)
            .send({success: true, message: "Teachers and students added"})

  } catch (error) {
    
  }
}

module.exports = {
    generateQrCode,
    markAttendance,
    addStudent,
    addTeacher,
    addClass
}
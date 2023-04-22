const fs = require("fs")
const csv = require("csv-parse");
const { parse } = require("csv-parse");

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

const addClass = async (req, res) => {
  if (req.cookies == undefined || req.cookies == null || req.cookies['user'] == null) {
      return res
      .status(400)
      .send({
          success:false
      })
  }

  try{

      let { className} = req.body
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

      if(req.body.students == 'undefined' && req.body.teachers == 'undefined'){
          console.log("Here");
          return res
              .status(200)
              .send({
                  success:true,
                  message: "Class created successfully"
              })
      }

      let classObject = await Class.findOne({name: className})

      const addTeachers = () => new Promise((resolve, reject) => {
          let teachersList = []
  
          fs.createReadStream(__dirname + '/../uploads/files/teachers.csv')
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (row) {
              teachersList.push(row[0])
          })
          .on("end", async function () {
              if(teachersList.length != 0){
                  let j = 0;
                  while(j < teachersList.length){
                      try {
                          let tMail = teachersList[j];
                          let teachObj = await Teachers.findOne({email: tMail})
  
                          if(teachObj === null){
                              return res
                                  .status(400)
                                  .send({
                                      success: false,
                                      message: "teacher is not registered"
                                  })
                          }
  
                          let add = true;
                          classObject.teachers.forEach((teach) => {
                              if(teach.email === tMail){
                                  add = false;
                              }
                          })
  
                          if(add){
                              classObject.teachers.push({
                                  email: tMail
                              })
                          }
                          await classObject.save();
                      } catch (error) {
                          console.log("Teachers List error :-");
                          console.log(error);
                          return res
                              .status(400)
                              .send({
                                  success: false,
                                  message: "Error in teachers list"
                              })
                      }
                      j++;
                  }
  
                  await classObject.save();
                  resolve();
              }
  
          })
          .on("error", function (error) {
              console.log("teach Error");
              console.log(error.message);
              reject()
              return res
                  .status(400)
                  .send({
                      success: false,
                      message: "Error in teachers list"
                  })
          });
      })

      const addStudents = () => new Promise((resolve, reject) => {
          let studentsList = []
          fs.createReadStream(__dirname + '/../uploads/files/students.csv')
          .pipe(parse({ delimiter: ",", from_line: 2 }))
          .on("data", function (row) {
              studentsList.push(row[0])
          })
          .on("end", async function () {
              if(studentsList.length != 0){
                  let j = 0;
                  while( j < studentsList.length){
                      try {
                          let stdEmail = studentsList[j];
                          let stdObj = await Students.findOne({email: stdEmail})
                          if(stdObj === null){
                              return res
                                  .status(400)
                                  .send({
                                      success: false,
                                      message: "student is not registered"
                                  })
                          }
  
                          let add = true;
                          classObject.students.forEach((stud) => {
                              if(stud.roll_number === stdObj.roll_number){
                                  add = false
                              }
                          })    
  
                          if(add){
                              classObject.students.push({
                                  roll_number: stdObj.roll_number,
                                  qrcode_string: `${stdObj.roll_number}%%${className}%%06/04/2022`
                              })
                          }
                          await classObject.save();
                      } catch (error) {
                          console.log("Student List error :-");
                          console.log(error);
                          return res
                              .status(400)
                              .send({
                                  success: false,
                                  message: "Error in students list"
                              })
                      }
                      j++;
                  }
                  await classObject.save();
                  resolve()
              }
          })
          .on("error", function (error) {
              console.log(error.message);
              reject()
          });
      })

      await addTeachers();
      await addStudents();

      await classObject.save();

      return res
          .status(200)
          .send({
              success: true,
              message: "Class Added successfully"
          })
  }
  catch(err){
      console.log("Add Class Error");
      console.log(err);

      return res
      .status(500)
      .send({
          success:false
      })
  }

}

const removeClass = async (req, res) => {
  if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
      return res
          .status(400)
          .send({
              success: false,
              message: "user not autherized"
          })
  }
  try {
      let classObj = await Class.deleteOne({ _id: req.params.x })
      console.log(classObj);
      // res.redirect('/dashboardTeacher')

      return res
          .status(200)
          .send({
              success: true,
              message: "Class deleted successfully"
          })

  } catch (error) {
      console.log(error);
      return res
          .status(500)
          .send({
              success: false,
              message: "Something went wrong"
          })
  }
}

const addMultipleStudents = async (req,res) => {
  try {

    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
      return res
          .status(400)
          .send({
              success: false,
              message: "user not autherized"
          })
    }

    const cid = req.params.x;

    const classObj = await Class.findOne({_id: cid})

    let studentsList = [];

    fs.createReadStream(__dirname + "/../uploads/files/students.csv")
    .pipe(parse({delimiter: ",", from_line:2}))
    .on("data",function(row) {
      studentsList.push(row[0])
    })
    .on("end", async function() {

      if(studentsList.length !== 0){
        for(let i = 0 ; i < studentsList.length ; i++){
          try{
            let sMail = studentsList[i];
            let stdObj = await Students.findOne({email: sMail});

            if(stdObj === null){
              continue;
            }

            let add = true;

            classObj.students.forEach((std) => {
              if(std.roll_number === stdObj.roll_number){
                add = false;
              }
            })

            if(add){
              classObj.students.push({
                roll_number: stdObj.roll_number,
                qrcode_string: `${stdObj.roll_number}%%${classObj.name}%%06/04/2022`
              })
            }

          }
          catch(err){
            console.log("File Error");
            console.log(err);

            return res
              .status(400)
              .send({
                success: false,
                message: "Error in students list"
              })
          }
        }
      }

      await classObj.save();
    })
    .on("error", function(error){
      console.log("Add student error");
      console.log(error.message);

      return res
        .status(400)
        .send({
          success: false,
          message: "Adding student failed"
        })
    })

    // console.log("Students added");

    return res
      .status(200)
      .send({
        success: true,
        message: "Students Added Successfully"
      })
    
  } catch (error) {
    console.log(error);
      return res
          .status(500)
          .send({
              success: false,
              message: "Something went wrong"
          })
  }
}

const addMultipleTeachers = async (req,res) => {
  try {

    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
      return res
          .status(400)
          .send({
              success: false,
              message: "user not autherized"
          })
    }

    const cid = req.params.x;

    const classObj = await Class.findOne({_id: cid})

    console.log(classObj);

    let teachersList = [];

    fs.createReadStream(__dirname + "/../uploads/files/teachers.csv")
    .pipe(parse({delimiter: ",", from_line:2}))
    .on("data",function(row) {
      teachersList.push(row[0])
    })
    .on("end", async function() {

      if(teachersList.length !== 0){
        for(let i = 0 ; i < teachersList.length ; i++){
          try{
            let sMail = teachersList[i];
            let teachObj = await Teachers.findOne({email: sMail});

            if(teachObj === null){
              continue;
            }

            let add = true;

            classObj.teachers.forEach((teach) => {
              if(teach.email === sMail){
                add = false;
              }
            })

            if(add){
              classObj.teachers.push({
                email: sMail
              })
            }

          }
          catch(err){
            console.log("File Error");
            console.log(err);

            return res
              .status(400)
              .send({
                success: false,
                message: "Error in students list"
              })
          }
        }
      }

      await classObj.save();
    })
    .on("error", function(error){
      console.log("Add student error");
      console.log(error.message);

      return res
        .status(400)
        .send({
          success: false,
          message: "Adding teachers failed"
        })
    })

    return res
      .status(200)
      .send({
        success: true,
        message: "Teachers Added Successfully"
      })
    
  } catch (error) {
    console.log(error);
      return res
          .status(500)
          .send({
              success: false,
              message: "Something went wrong"
          })
  }
}

const removeStudent = async (req,res) => {
  try {

    const sid = req.body.email;
    // const rollNo = req.body.rollNo;
    const cid = req.params.x;

    const classObj = await Class.findOne({_id: cid})

    if(sid !== undefined){

      const stdObj = await Students.findOne({email: sid})

      if(stdObj === null){
        return res
          .status(200)
          .send({
            success: false,
            message: "Student doesn't exist"
          })
      }
      else{
        classObj.students = classObj.students.filter((val) => val.roll_number !== stdObj.roll_number)

        classObj.attendance = classObj.attendance.map(val => {
          return {
            date: val.date,
            values: val.values.filter(t => t.roll_no !== stdObj.roll_number),
            _id: val._id
          }
        })

        await classObj.save();

        return res
          .status(200)
          .send({
            success: true,
            message: "Student removed Successfully"
          })

      }
    }
    
  } catch (error) {
    
    console.log(error);

    return res
      .status(400)
      .send({
        success: false,
        message: "Something went wrong"
      })
  }
}

const removeTeacher = async (req,res) => {
  try {

    const cid = req.params.x;
    const tid = req.body.email;

    const classObj = await Class.findOne({_id: cid})

    const teachObj = await Teachers.findOne({email:tid})

    if(teachObj === null){
      return res
        .status(200)
        .send({
          success: false,
          message: "Teacher doesn't exist"
        })
    }

    classObj.teachers = classObj.teachers.filter(val => val.email !== tid)

    await classObj.save();

    return res
      .status(200)
      .send({
        success: true,
        message: "Teacher removed successfully"
      })
    
  } catch (error) {
    
    console.log(error);

    return res
      .status(400)
      .send({
        success: false,
        message: "Something went wrong"
      })
  }
}

module.exports = {
    generateQrCode,
    markAttendance,
    addStudent,
    addTeacher,
    addClass,
    removeClass,
    addMultipleStudents,
    addMultipleTeachers,
    removeStudent,
    removeTeacher,
}
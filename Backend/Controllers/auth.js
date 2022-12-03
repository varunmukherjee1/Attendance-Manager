const Class = require("../Models/class");
const Students = require("../Models/student");
const Teachers = require("../Models/teacher");
const Admins = require("../Models/admin");

const generateQrCode = async (req, res) => {
    // if (
    //   req.cookies == undefined ||
    //   req.cookies == null ||
    //   req.cookies["user"] == null
    // ) {
    //   return res.status(200).send({ success: false });
    // }
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

module.exports = {
    generateQrCode,
    markAttendance
}
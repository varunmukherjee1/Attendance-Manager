const csv = require('csv-parser')
const fs = require('fs')
const express = require('express')
const path = require('path')
const app = express()
const PORT = 5000
const STATIC_PATH = path.join(__dirname + '/public')


const Student = require('./Models/student')
const Teacher = require('./Models/teacher')
const Admin = require('./Models/admin')
const Class = require('./Models/class')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const COOKIE_NAME = 'user'
require('./public/db/conn')
const encryption = require('./public/scripts/encryption')
const adminRoutes = require('./routes/admin')
const dataApisRoutes = require('./routes/dataApis')
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")

/**Saket Ranjan */
const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/Files')
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine })

app.use(express.static(STATIC_PATH));
app.use(cookieParser())
app.use(express.json())

app.use('/admin', adminRoutes)
app.use("/api",dataApisRoutes)
app.use("/user",userRoutes)
app.use("/auth",authRoutes)

app.listen(PORT, (req, res) => {
    console.log(`Server started at http://localhost:${PORT}`);
});

app.post('/addClass', upload.array("Files", 2), async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies['user'] == null) {
        return res.redirect('login')
    }

    let { className, teacherEmail, studentEmail } = req.body
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

    classObj.save()

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
})

app.get('/showAttendance/:name/', async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    }
    let className = req.params.name.replace('%20', ' ')
    let dataObj = {
        name: className
    }
    res.render('showAttendance', dataObj)
});

app.get('/removeClass/:x', async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    }
    try {
        let classObj = await Class.deleteOne({ name: req.params.x })
        console.log(classObj);
        res.redirect('/dashboardTeacher')
    } catch (error) {
        console.log(error);
    }
})

app.post('/addStudent/:x', async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    }
    try {
        let studObj = await Student.findOne({ email: req.body.studentEmail })
        let classObj = await Class.findOne({ name: req.params.x })
        if (studObj == null || classObj == null) res.redirect('/dashboardTeacher')
        let i = 0
        while (i < classObj.students.length) {
            if (classObj.students[i].roll_number == studObj.roll_number) {
                return res.redirect('/dashboardTeacher')
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
        res.redirect('/dashboardTeacher')
    } catch (error) {
        console.log(error);
    }
})

app.post('/addTeacher/:x', async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
        return res.redirect('login')
    }
    try {
        let teacObj = await Teacher.findOne({ email: req.body.teacherEmail })
        let classObj = await Class.findOne({ name: req.params.x })
        if (teacObj == null || classObj == null) res.redirect('/dashboardTeacher')
        let i = 0
        while (i < classObj.teachers.length) {
            if (classObj.teachers[i].email == teacObj.email) {
                return res.redirect('/dashboardTeacher')
            }
            i++
        }
        classObj.teachers.push({
            email: teacObj.email
        })
        classObj.save();
        res.redirect('/dashboardTeacher')
    } catch (error) {
        console.log(error);
    }
})

// app.post('/markAttendance/:cname', async (req, res) => {
//     if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
//         return res.redirect('login')
//     }
//     let val = req.body.qrCodeArr;
//     const classObj = await Class.findOne({ name: req.params.cname })
//     const stds = classObj.students;
//     const attend = classObj.attendance;
//     let passStr = val.split(";;")
//     for (let i = 0; i < passStr.length; i++) {
//         let tempStr = passStr[i];

//         for (let j = 0; j < stds.length; j++) {

//             if (stds[j].qrcode_string == tempStr) {

//                 let tempRoll = stds[j].roll_number;
//                 let tempArr = tempStr.split("%%");
//                 let dateStr = tempArr[2];
//                 let timeStr = tempArr[3];

//                 attend.forEach((att) => {
//                     let attDate = att.date.split(" ");
//                     if ((attDate[0] == dateStr) && (attDate[1] == timeStr)) {
//                         att.values.forEach((stdVal) => {
//                             if (stdVal.roll_no == tempRoll) {
//                                 stdVal.status = "P";
//                             }
//                         })
//                     }
//                 });
//             }
//         }
//     }
//     const co = await classObj.save();
//     res.redirect("/dashboardTeacher")
// })
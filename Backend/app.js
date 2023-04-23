require('./public/db/conn')
require("dotenv").config();

const fs = require("fs");
const csv = require("csv-parse");
const { parse } = require("csv-parse");
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')
const rfs = require('rotating-file-stream')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const multer = require('multer');

const PORT = 5000
const STATIC_PATH = path.join(__dirname + '/public')


const Student = require('./Models/student')
const Teacher = require('./Models/teacher')
const Admin = require('./Models/admin')
const Class = require('./Models/class')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const COOKIE_NAME = 'user'
const encryption = require('./public/scripts/encryption')
const adminRoutes = require('./routes/admin')
const dataApisRoutes = require('./routes/dataApis')
const userRoutes = require("./routes/user")
const authRoutes = require("./routes/auth")

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Attendance Capturer and Manager API",
            version: "1.0.0",
            description: "This is the API documentation for our FSD Project"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
        tags: [
            {
                name: "admins",
                description: "API's available to only admins"
            },
            {
                name: "developers",
                description: "API's available to the developers"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
let logStream = rfs.createStream('access.log', {
    interval: '1h',
    path: path.join(__dirname, 'logs')
})

app.use(express.static(STATIC_PATH));
app.use(cookieParser())
app.use(express.json())
app.use(morgan('combined', {stream: logStream}))
app.use(morgan(":method :url :status :response-time ms"))
app.use(helmet())

app.use('/admin', adminRoutes)
app.use("/api",dataApisRoutes)
app.use("/user",userRoutes)
app.use("/auth",authRoutes)

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine })

app.listen(PORT, (req, res) => {
    console.log(`Server started at http://localhost:${PORT}`);
});

const cpUpload = upload.fields([{ name: 'students', maxCount: 1 }, { name: 'teachers', maxCount: 1 }])

app.post("/testApi", (req,res) => {
    console.log("Test api called");
    console.log(req.body);
    console.log(req.files);
})

// app.post('/addClass', cpUpload, async (req, res) => {
//     if (req.cookies == undefined || req.cookies == null || req.cookies['user'] == null) {
//         return res
//         .status(400)
//         .send({
//             success:false
//         })
//     }

//     try{

//         let { className} = req.body
//         let date = new Date()

//         console.log("Clasname :");
//         console.log(className);
    
//         const uID = {
//             email: req.cookies[COOKIE_NAME].email
//         }

//         console.log("uid");
//         console.log(uID);

//         let classObj = new Class({
//             name: className,
//             teachers: [uID],
//             students: [],
//             attendance: []
//         })
    
//         classObj.save()
    
//         let classObject = await Class.findOne({ name: className })

//         console.log(classObject);
    
//         // if (studentEmail != '') {
//         //     let student = await Student.findOne({ email: studentEmail })
//         //     const sID = {
//         //         roll_number: student.roll_number,
//         //         qrcode_string: `${student.roll_number}%%${className}%%${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
//         //     }
//         //     classObject.students.push(sID);
//         // }
//         // if (teacherEmail != '') {
//         //     let teacher = await Teacher.findOne({ email: teacherEmail })
//         //     const tID = {
//         //         email: teacher.email
//         //     }
//         //     classObject.teachers.push(tID);
//         // }
    
//         let results1 = [];
//         fs.createReadStream(`uploads/files/teachers.csv`)
//             .pipe(csv({}))
//             .on('data', (data) => results1.push(data))
//             .on('end', async () => {
//                 if(results1 != '') {
//                     let j = 0;
//                     while (j < results1.length) {
//                         try {
//                             let detail = `${results1[j].mail}`;
//                             let teacObj = await Teacher.findOne({ email: detail })
//                             if (teacObj == null || classObject == null) 
//                                 return res
//                                     .status(400)
//                                     .send({
//                                         success: false,
//                                         message: "teacher not found"
//                                     })
//                             let i = 0
//                             while (i < classObject.teachers.length) {
//                                 if (classObject.teachers[i].email == teacObj.email) {
//                                     return res
//                                     .status(400)
//                                     .send({
//                                         success: false,
//                                         message: "teacher not found"
//                                     })
//                                 }
//                                 i++
//                             }
//                             classObject.teachers.push({
//                                 email: teacObj.email
//                             })
//                         } catch (error) {
//                             console.log("Teacher parse error");
//                             console.log(error);
//                         }
//                         j++;
//                     }
//                     await classObject.save();
//                 }
//             });
    
//         let results = [];
//         fs.createReadStream(`uploads/files/students.csv`)
//             .pipe(csv({}))
//             .on('data', (data) => results.push(data))
//             .on('end', async () => {
//                 if(results != '') {
//                     let j = 0;
//                     while (j < results.length) {
//                         try {
//                             let detail = `${results[j].mail}`;
//                             // console.log(detail);
//                             let studObj = await Student.findOne({ email: detail })
//                             if (studObj == null || classObject == null) res.redirect('/dashboardTeacher')
//                             let i = 0
//                             while (i < classObject.students.length) {
//                                 if (classObject.students[i].roll_number == studObj.roll_number) {
//                                     return res.redirect('/dashboardTeacher')
//                                 }
//                                 i++
//                             }
//                             let newStudObj = {
//                                 roll_number: studObj.roll_number,
//                                 qrcode_string: `${studObj.roll_number}%%${className}%%06/04/2022`
//                             }
//                             classObject.students.push(newStudObj)
//                         } catch (error) {
//                             console.log(error);
//                         }
//                         j++;
//                     }
//                     await classObject.save();
//                 }
//             });
    
//         await classObject.save()
    
//         fs.writeFile(__dirname + '/public/Files/teachers.csv', '', function () { console.log("File 1 cleared"); })
//         fs.writeFile(__dirname + '/public/Files/students.csv', '', function () { console.log("File 2 cleared"); })
//         // res.redirect('/dashboardTeacher')
//         return res
//                 .status(200)
//                 .send({success: true, message: "Teachers and students added"})
//     }
//     catch(err){
//         console.log("Add Class Error");
//         console.log(err);

//         return res
//         .status(500)
//         .send({
//             success:false
//         })
//     }

// })

const readTeachersFile = (teachersList) => {
    return new Promise((resolve,reject) => {
        fs.createReadStream(__dirname + '/uploads/files/teachers.csv')
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", async function (row) {
            // console.log(`email = ${row[0]}`);
            // teachersList.push(row[0])
            let teachObj = await Teacher.findOne({email: row[0]})

            if(teachObj !== null){
                teachersList.push(row[0]);
            }

        })
        .on("end", async function () {
            console.log("Teachers parsed");
            resolve();
        })
        .on("error", function (error) {
            console.log("teach Error");
            console.log(error.message);
            return res
                .status(400)
                .send({
                    success: false,
                    message: "Error in teachers list"
                })
        });

    })
}

const readStudentsFile = (studentsList) => {
    return new Promise((resolve,reject) => {
        fs.createReadStream(__dirname + '/uploads/files/students.csv')
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", async function (row) {
            // console.log(row);
            const stdEmail = row[0];
            // console.log(`std Email : ${stdEmail}`);
            let stdObj = await Student.findOne({email: stdEmail})

            if(stdObj !== null){
                studentsList.push(stdObj)
            }
        })
        .on("end", async function () {
            console.log("students finished");
            resolve();
        })
        .on("error", function (error) {
            console.log("error reading students");
            console.log(error.message);
        });
        
    })
}

app.post('/addClass', cpUpload, async (req, res) => {
    if (req.cookies == undefined || req.cookies == null || req.cookies['user'] == null) {
        return res
        .status(400)
        .send({
            success:false
        })
    }

    try{

        let { className} = req.body
        console.log("Clasname :");
        console.log(className);
    
        const uID = {
            email: req.cookies[COOKIE_NAME].email
        }

        console.log("uid");
        console.log(uID);

        let classObj = new Class({
            name: className,
            teachers: [uID],
            students: [],
            attendance: []
        })
    
        await classObj.save()

        let classObject = await Class.findOne({name: className})

        console.log("File parsing :-");

        console.log("Teachers file :-");
        let teachersList = []

        fs.createReadStream(__dirname + '/uploads/files/teachers.csv')
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            console.log(row);
            teachersList.push(row[0])
        })
        .on("end", async function () {
            console.log("finished");
            console.log(teachersList);
            if(teachersList.length != 0){
                let j = 0;

                while(j < teachersList.length){
                    try {
                        let tMail = teachersList[j];
                        let teachObj = await Teacher.findOne({email: tMail})

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
            }

        })
        .on("error", function (error) {
            console.log("teach Error");
            console.log(error.message);
            return res
                .status(400)
                .send({
                    success: false,
                    message: "Error in teachers list"
                })
        });

        console.log("Students file :-");
        let studentsList = []

        fs.createReadStream(__dirname + '/uploads/files/students.csv')
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            console.log(row);
            studentsList.push(row[0])
        })
        .on("end", async function () {
            console.log("finished");

            if(studentsList.length != 0){
                let j = 0;
                while( j < studentsList.length){
                    try {
                        let stdEmail = studentsList[j];

                        let stdObj = await Student.findOne({email: stdEmail})

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
            }
        })
        .on("error", function (error) {
            console.log(error.message);
        });

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

})

app.get('/removeClass/:x', async (req, res) => {
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

        console.log("remove class");
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .send({
                success: false,
                message: "Something went wrong"
            })
    }
})
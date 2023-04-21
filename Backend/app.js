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
// const multer = require('multer');

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

// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/files')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage: fileStorageEngine })

app.listen(PORT, (req, res) => {
    console.log(`Server started at http://localhost:${PORT}`);
});

// const cpUpload = upload.fields([{ name: 'students', maxCount: 1 }, { name: 'teachers', maxCount: 1 }])

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
//         const uID = {
//             email: req.cookies[COOKIE_NAME].email
//         }

//         let classObj = new Class({
//             name: className,
//             teachers: [uID],
//             students: [],
//             attendance: []
//         })
    
//         await classObj.save()

//         if(req.body.students == 'undefined' && req.body.teachers == 'undefined'){
//             console.log("Here");
//             return res
//                 .status(200)
//                 .send({
//                     success:true,
//                     message: "Class created successfully"
//                 })
//         }

//         let classObject = await Class.findOne({name: className})

//         const addTeachers = () => new Promise((resolve, reject) => {
//             let teachersList = []
    
//             fs.createReadStream(__dirname + '/uploads/files/teachers.csv')
//             .pipe(parse({ delimiter: ",", from_line: 2 }))
//             .on("data", function (row) {
//                 teachersList.push(row[0])
//             })
//             .on("end", async function () {
//                 if(teachersList.length != 0){
//                     let j = 0;
//                     while(j < teachersList.length){
//                         try {
//                             let tMail = teachersList[j];
//                             let teachObj = await Teacher.findOne({email: tMail})
    
//                             if(teachObj === null){
//                                 return res
//                                     .status(400)
//                                     .send({
//                                         success: false,
//                                         message: "teacher is not registered"
//                                     })
//                             }
    
//                             let add = true;
//                             classObject.teachers.forEach((teach) => {
//                                 if(teach.email === tMail){
//                                     add = false;
//                                 }
//                             })
    
//                             if(add){
//                                 classObject.teachers.push({
//                                     email: tMail
//                                 })
//                             }
//                             await classObject.save();
//                         } catch (error) {
//                             console.log("Teachers List error :-");
//                             console.log(error);
//                             return res
//                                 .status(400)
//                                 .send({
//                                     success: false,
//                                     message: "Error in teachers list"
//                                 })
//                         }
//                         j++;
//                     }
    
//                     await classObject.save();
//                     resolve();
//                 }
    
//             })
//             .on("error", function (error) {
//                 console.log("teach Error");
//                 console.log(error.message);
//                 reject()
//                 return res
//                     .status(400)
//                     .send({
//                         success: false,
//                         message: "Error in teachers list"
//                     })
//             });
//         })

//         const addStudents = () => new Promise((resolve, reject) => {
//             let studentsList = []
//             fs.createReadStream(__dirname + '/uploads/files/students.csv')
//             .pipe(parse({ delimiter: ",", from_line: 2 }))
//             .on("data", function (row) {
//                 studentsList.push(row[0])
//             })
//             .on("end", async function () {
//                 if(studentsList.length != 0){
//                     let j = 0;
//                     while( j < studentsList.length){
//                         try {
//                             let stdEmail = studentsList[j];
//                             let stdObj = await Student.findOne({email: stdEmail})
//                             if(stdObj === null){
//                                 return res
//                                     .status(400)
//                                     .send({
//                                         success: false,
//                                         message: "student is not registered"
//                                     })
//                             }
    
//                             let add = true;
//                             classObject.students.forEach((stud) => {
//                                 if(stud.roll_number === stdObj.roll_number){
//                                     add = false
//                                 }
//                             })    
    
//                             if(add){
//                                 classObject.students.push({
//                                     roll_number: stdObj.roll_number,
//                                     qrcode_string: `${stdObj.roll_number}%%${className}%%06/04/2022`
//                                 })
//                             }
//                             await classObject.save();
//                         } catch (error) {
//                             console.log("Student List error :-");
//                             console.log(error);
//                             return res
//                                 .status(400)
//                                 .send({
//                                     success: false,
//                                     message: "Error in students list"
//                                 })
//                         }
//                         j++;
//                     }
//                     await classObject.save();
//                     resolve()
//                 }
//             })
//             .on("error", function (error) {
//                 console.log(error.message);
//                 reject()
//             });
//         })

//         await addTeachers();
//         await addStudents();

//         await classObject.save();

//         return res
//             .status(200)
//             .send({
//                 success: true,
//                 message: "Class Added successfully"
//             })
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

// app.get('/removeClass/:x', async (req, res) => {
//     if (req.cookies == undefined || req.cookies == null || req.cookies[COOKIE_NAME] == null) {
//         return res
//             .status(400)
//             .send({
//                 success: false,
//                 message: "user not autherized"
//             })
//     }
//     try {
//         let classObj = await Class.deleteOne({ _id: req.params.x })
//         console.log(classObj);
//         // res.redirect('/dashboardTeacher')

//         return res
//             .status(200)
//             .send({
//                 success: true,
//                 message: "Class deleted successfully"
//             })

//         console.log("remove class");
//     } catch (error) {
//         console.log(error);
//         return res
//             .status(500)
//             .send({
//                 success: false,
//                 message: "Something went wrong"
//             })
//     }
// })
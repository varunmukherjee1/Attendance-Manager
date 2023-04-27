require("./public/db/conn");
require("dotenv").config();

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const rfs = require("rotating-file-stream");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const PORT = 5000;
const STATIC_PATH = path.join(__dirname + "/public");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const encryption = require("./public/scripts/encryption");
const adminRoutes = require("./routes/admin");
const dataApisRoutes = require("./routes/dataApis");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

// const cors = require("cors");
// app.use(
//   cors({
//     origin: ["https://group-27.netlify.app/", "http://localhost:3000/", "http://localhost:5000"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//     credentials: true
//   })
// );

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,HEAD,OPTIONS,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Attendance Capturer and Manager API",
      version: "1.0.0",
      description: "This is the API documentation for our FSD Project",
    },
    servers: [
      {
        url: "https://group-27.netlify.app/"
      },
      {
        url: "http://localhost:5000"
      },
    ],
    tags: [
      {
        name: "admins",
        description: "API's available to only admins",
      },
      {
        name: "developers",
        description: "API's available to the developers",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

let logStream = rfs.createStream("access.log", {
  interval: "1h",
  path: path.join(__dirname, "logs"),
});

app.use(express.static(STATIC_PATH));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("combined", { stream: logStream }));
app.use(morgan(":method :url :status :response-time ms"));
app.use(helmet());

app.use("/admin", adminRoutes);
app.use("/api", dataApisRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server started at http://localhost:${PORT}`);
});

module.exports = app;

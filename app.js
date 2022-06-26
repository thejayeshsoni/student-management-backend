require('dotenv').config();
const express = require("express");
require("./config/database").connect();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

//for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and file middleware
app.use(cookieParser());
app.use(fileUpload());

//import all routes here
const admin = require("./routes/admin");
const student = require("./routes/student");

//router middleware
app.use("/admin", admin);
app.use("/student", student);

//export app.js
module.exports = app;
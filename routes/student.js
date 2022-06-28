const express = require("express");
const router = express.Router();

const { login, getUserDetails, updateStudent, checkResult, checkResultBySubject, logout } = require("../controllers/studentController");
const { isAuthenticated } = require("../middlewares/auth");
const { isStudent } = require("../middlewares/isStudent");

router.route("/login").post(login);
router.route("/me").get(isAuthenticated, isStudent, getUserDetails);
router.route("/update/:studentId").put(isAuthenticated, isStudent, updateStudent);
router.route("/results").get(isAuthenticated, isStudent, checkResult);
router.route("/resultBySubject").get(isAuthenticated, isStudent, checkResultBySubject);
router.route("/logout").get(logout);

module.exports = router;
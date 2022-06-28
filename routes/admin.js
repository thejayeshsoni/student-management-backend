const express = require("express");
const router = express.Router();

const { signUp, login, getUserDetails, addStudent, deleteStudent, updateStudentByAdmin, logout } = require("../controllers/adminController");
const { isAuthenticated } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/me").get(isAuthenticated, isAdmin, getUserDetails);
router.route("/logout").get(logout);
router.route("/addStudent").post(isAuthenticated, isAdmin, addStudent);
router.route("/students/:studentId").put(isAuthenticated, isAdmin, updateStudentByAdmin);
router.route("/students/:studentId").delete(isAuthenticated, isAdmin, deleteStudent);

module.exports = router;
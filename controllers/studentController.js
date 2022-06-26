const User = require("../models/User");
const cookieToken = require("../config/cookieToken");

// login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Account does not exist" });
        }
        const passwordValidate = await user.validatePassword(password);
        if (!passwordValidate) {
            return res.status(400).json({ message: "email and password does not match" });
        }
        cookieToken(user, res);
    } catch (error) {
        res.status(500).json({ message: "Can't be log in" });
    }
};

// logout
exports.logout = async (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({
            Succes: true,
            message: "Logout Success"
        });
    } catch (error) {
        res.status(500).json({ message: "Can not be logout..." });
    }
};

// getuser
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role === "admin") {
            user.results = undefined;
        }
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(400).json({ message: "Student doesn't exist" });
    }
}

// update student by student itself...
exports.updateStudent = async (req, res) => {
    try {
        const newDetails = {
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone
        }
        const updatedStudent = await User.findByIdAndUpdate(req.params.studentId || req.query.studentId, newDetails, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            updatedStudent
        });
    } catch (error) {
        console.log(error);
    }
};

// check result...
exports.checkResult = async (req, res) => {
    try {
        const student = await User.findById(req.user.id);
        let totalMarks = 0;
        for (let index = 0; index < student.results.length; index++) {
            totalMarks += Number.parseFloat(student.results[index].marks);
        }
        let percentageScore = totalMarks / student.results.length;
        percentageScore = Math.round((percentageScore + Number.EPSILON) * 100) / 100;
        res.status(200).json({
            totalMarks,
            "Percentage": percentageScore
        });
    } catch (error) {
        res.status(400).json({ message: "Student doesn't exist" });
    }
};

// filter by Subject Name
exports.checkResultBySubject = async (req, res) => {
    try {
        const { subject } = req.body;

        const student = await User.findById(req.user.id);

        const marksBySubject = student.results.filter(function (el) {
            return el.subject.toLowerCase() === subject.toLowerCase()
        });
        let marksBySubjectName = marksBySubject[0].marks;
        // console.log(marksBySubjectName);
        res.status(200).json({
            marksBySubjectName
        });
    } catch (error) {
        res.status(400).json({ message: "Subject Missmatch" });
    }
};
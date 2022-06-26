const User = require("../models/User");
const cookieToken = require("../config/cookieToken");

// Admin signup
exports.signUp = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;

        if (!(email || password || firstName || lastName || phone)) {
            return res.status(400).json({ message: "All fields are necessary to Signup..!!" });
        }

        const existingAdmin = await User.findOne({ email: email }).exec();
        console.log(existingAdmin);
        if (existingAdmin) {
            return res.status(400).json({ message: "User already exists.." });
        }

        const admin = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            phone,
            role: "admin"
        });
        // console.log(admin);
        //token generation Utility method
        cookieToken(admin, res);
    } catch (error) {
        res.status(400).json({ message: "Admin Signup Failed.." });
    }
};

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
        res.status(500).json({ message: "Login failed" });
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
        res.status(500).json({ message: "Logout Failed" });
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
        res.status(400).json({ message: "Admin Doesn't exist" });
    }
}

// add student
exports.addStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, password, results, phone, address, dateOfBirth } = req.body;

        // Check mandatory fields...
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All fields are required!!");
        }

        const existingStudent = await User.findOne({ email });
        if (existingStudent) {
            return res.status(401).send("Student already exists..!!");
        }

        const student = new User(req.body);

        await student.save();
        student.password = undefined;
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
};

// delete student
exports.deleteStudent = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.studentId || req.query.studentId);
        res.status(200).json({
            success: true,
            user,
            message: "User has been deleted"
        });
    } catch (error) {
        res.status(400).json({ message: "Can't delete student" });
    }
};

// update student by admin
exports.updateStudentByAdmin = async (req, res) => {
    try {
        const { email, password, results, address, phone } = req.body;
        const newDetails = {
            email,
            password,
            results,
            address,
            phone
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
        res.status(400).json({ message: "Can not update student details.." });
    }
};
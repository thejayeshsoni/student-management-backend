exports.isStudent = (req, res, next) => {
    if (req.user.role === "student") {
        next();
    }
    else {
        res.status(400).json({
            error: "You are not a student"
        });
    }
};
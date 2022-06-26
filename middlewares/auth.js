const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        return res.status(403).send("Token is missing...!!");
    }
    try {
        const result = jsonwebtoken.verify(token, process.env.SECRET_KEY);
        //adding user to req if we got one
        req.user = await User.findById(result.id);
    } catch (error) {
        return res.status(403).send("Invalid token..!!");
    }
    return next();
};
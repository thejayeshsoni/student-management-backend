const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please Provide First Name'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please Provide Last Name'],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [validator.isEmail, 'Please Check email is correct or not']
    },
    password: {
        type: String,
        required: [true, 'Please provide Password'],
        minlength: [6, 'Password should be of 6 character'],
        select: false //does not return password field in object
    },
    results: [
        {
            subject: {
                type: String,
                default: null
            },
            marks: {
                type: Number,
                default: null
            }
        }],
    dateOfBirth: { type: Date },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "student"
    }
}, { timestamps: true });

// encrypting before creating user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.validatePassword = async function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: `${process.env.JWT_EXPIRY
            }`
    });
};

// to encrypt the password after updating the student details...
userSchema.pre('findOneAndUpdate', async function () {
    this._update.password = await bcrypt.hash(this._update.password, 10);
})

module.exports = mongoose.model("user", userSchema);

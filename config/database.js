const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log("DB connected successfully..!!"))
        .catch((error) => {
            console.log("DB connection failed...");
            console.log(error);
            process.exit(1)
        });
};

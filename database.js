const mongoose  = require("mongoose");

require('dotenv').config();

exports.dbconnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connection successful")) 
    .catch((err) => {
        console.log("DB connection failed");
    }); 
}

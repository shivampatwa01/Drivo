const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');

const carRouter = require('./routes/carsRoute');
const authRouter =require('./routes/authRoute');
const bookRouter = require('./routes/bookingRoute');



require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:true,
    methods:["GET", "POST", "PUT", "DELETE"],
    Credentials:true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

require('./database').dbconnect();  

app.use('/api/cars' , carRouter);
app.use('/api/auth', authRouter);
app.use('/api/bookings' , bookRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
}); 


app.use('/', express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => res.send('welcome to drivo API'))


app.listen(PORT, () => { 
    console.log(`node js server started at ${PORT}`);
})  

const bcryptjs = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error");


exports.register = async (req, res, next) => {

   const { username, email,  password} = req.body;

       //check if user already exist
       const existingUser = await userModel.findOne({username});

       if(existingUser){
        return res.status(400).json({
            success:false,
            message:'username already exist',
        });
       }
       const existingUser1 = await userModel.findOne({email});

       if(existingUser1){
        return res.status(400).json({
            success:false,
            message:'email already exist',
        });
       }

   const hashedPassword = await bcryptjs.hash(password, 10);
   const newUser = new userModel({ username, email, password: hashedPassword });
   try{
    await newUser.save()
        res.status(201).json("user created successfully");
   } catch(error) {
        next(error);
   }
     
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try{
        const validUser = await userModel.findOne({username});

        if(!validUser) return next(errorHandler(404, 'User not found')); 

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

        const {password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true})         //{ httpOnly: true, expires: new Date(Date.now() + 1000)})
        .status(200)
        .json(rest);

    } catch(error) {
        next(error);
    }
}

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db = require("../models");
const tryCatch = require("../utils/tryCatch");

const User = db.users; //get the User collection or table
const Contact = db.contacts; //get the Contact table

const registerUser = tryCatch(async (req, res) => {
  const userData = req.body;
  const savedUser = await User.create(userData);
  // send response of success
  res.status(200).send({
    message: "User Registered Successfully.",
    registeredUser: savedUser,
  });
});


const loginUser = tryCatch(async (req,res)=>{
  const phoneNum = req.body.phoneNum;
  const enteredPsd = req.body.password;
  const userData = await User.findOne({
    where:{
      phoneNumber:phoneNum
    }
  })
  if(userData){
    const isPsdMatched = await bcrypt.compare(enteredPsd, userData.password); 
    if(isPsdMatched){
      const generateToken = jwt.sign({phoneNum}, process.env.JWT_SECRET,{ expiresIn:"1d"});
      res.cookie("token", generateToken, {
        httpOnly:true,
        maxAge:24*60*60*1000 //24hour 60min 60 sec 1000 mili second =>  1 Day
      });
      res.status(200).send({
        message:"user logged in Successfully",
        loggedInUser:userData
      })
    }else{
      throw new Error("Invalid Credentials.");
    }
  }else{
    throw new Error("Invalid Credentials! Register!!")
  }
})


const getAllUser = tryCatch(async (req, res) => {
  const allUser = await User.findAll({ include: ["contacts"] });

  res.status(200).send({
    message: "List of all User:",
    users: allUser,
  });
});

const getAllContactOfThisNum = tryCatch(async (req, res) => {
  const phonenum = req.user.phoneNumber;

  const allContactInfo = await User.findAll({
    where: {
      phoneNumber: phonenum,
    },
    include: ["contacts"],
  });

  res.status(200).send({
    message: "List of all the Contacts:",
    contactList: allContactInfo,
  });
});

const addEmail = tryCatch(async (req, res) => {
  const phoneNum = req.user.phoneNumber;
  const email = req.body.emailAddress;
  await User.update(
    { emailAddress: email },
    {
      where: {
        phoneNumber: phoneNum,
      },
    }
  );
  res.status(200).send({
    message: "Email Address added successfully!",
  });
});

module.exports = {
  registerUser,
  getAllUser,
  addEmail,
  getAllContactOfThisNum,
  loginUser,
};

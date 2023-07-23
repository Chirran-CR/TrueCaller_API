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

const getAllUser = tryCatch(async (req, res) => {
  const allUser = await User.findAll({ include: ["contacts"] });

  res.status(200).send({
    message: "List of all User:",
    users: allUser,
  });
});

const getAllContactOfThisNum = tryCatch(async (req, res) => {
  const phonenum = req.params.phonenum;

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
  const phoneNum = req.params.phonenum;
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
};

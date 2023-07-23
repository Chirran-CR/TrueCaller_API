const db = require("../models");
const tryCatch = require("../utils/tryCatch");

const User = db.users; //get the User collection or table


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
  const allUser = await User.findAll();

  res.status(200).send({
    message: "List of all User:",
    users: allUser,
  });
});

const addEmail = tryCatch(async (req,res) => {
    const id = req.params.id;
    const email = req.body.emailAddress;
    await User.update({emailAddress:email},{
        where:{
            id:id
        }
    })
    res.status(200).send({
        message:"Email Address added successfully!",
    })
})

module.exports = {
  registerUser,
  getAllUser,
  addEmail,
};

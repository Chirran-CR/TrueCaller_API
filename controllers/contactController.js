const db = require("../models");
const gdb = require("../models/indexGlobalDB");
const tryCatch = require("../utils/tryCatch");

const User = db.users; //get the User collection or table
const Contact = db.contacts; //contact table
const GlobalUser = gdb.globalUsers;

const addContact = tryCatch(async (req, res) => {
  const phoneNo = req.user.phoneNumber; //registered user's num, who is saving a contact
  const contactObj = {
    contactName: req.body.name, //contact's  name
    contactNum: req.body.phoneNum, //contact's phone num
    linkedPhoneNo: phoneNo,
  };
  const savedContactObj = await Contact.create(contactObj);
   //save data into global db
   const globalUserData = {
    name:req.body.name,
    phoneNumber:req.body.phoneNum,
  };
  const savedGlobalUserData = await GlobalUser.create(globalUserData);
  res.status(200).send({
    message: "Contact added Successfully!!",
    addedContact: savedContactObj,
    addedContactIntoGlobalDB:savedGlobalUserData
  });
});

const getContactInfo = tryCatch(async (req, res) => {
  const contactNum = req.params.contactnum;
  const allSavedContact = await Contact.findAll({
    where: {
      contactNum: contactNum,
    },
    include: ["user"],
  });
  res.status(200).send({
    message:"Contact Info. fetched successfully.",
    contactInfo:allSavedContact
  })
})

module.exports = {
  addContact,
  getContactInfo,
};

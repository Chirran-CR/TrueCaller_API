const { registerUser } = require("../controllers/userController");
const db = require("../models/index");
const showOrNotShowEmailAddress = require("./showOrNotShowEmailAddr");

const Spam = db.spams;

const spamCheckerFn = async (usr,searchingUser) => {
  let jsonUsr = usr.toJSON();
  const spamDetails = await Spam.findOne({
    where: {
      phoneNum: jsonUsr.phoneNumber,
    },
  });
  if (spamDetails) {
    //if this num is present in spam array
    jsonUsr.noOfPeopleMarkAsSpam = spamDetails.toJSON().whoMarkedSpam.length;
  } else {
    //this is not a spam number
    jsonUsr.noOfPeopleMarkAsSpam = 0;
  }
  //if the user is a register user then only check, either to show or not show the email
  if(jsonUsr.registeredUser == true){
    jsonUsr = await showOrNotShowEmailAddress(jsonUsr, searchingUser);
  }else{//not registered user
    jsonUsr.emailAddress = undefined;
  }
  //id and registeredUser value is removed before sending to client
  jsonUsr.registeredUser = undefined;
  jsonUsr.id = undefined;
  return jsonUsr;
};

module.exports = spamCheckerFn;

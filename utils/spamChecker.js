const db = require("../models/index");

const Spam = db.spams;

const spamCheckerFn = async (usr) => {
  const jsonUsr = usr.toJSON();
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
  jsonUsr.emailAddress = undefined;
  jsonUsr.registeredUser = undefined;
  jsonUsr.id = undefined;
  return jsonUsr;
};

module.exports = spamCheckerFn;

const db = require("../models");
const tryCatch = require("../utils/tryCatch");

const Spam = db.spams;

const markAsSpam = tryCatch(async (req, res) => {
  const spammingNumber = req.body.phoneNum;
  const whoMarked = req.user.phoneNumber; //who wants to mark this number as spam
  //if number(spaming Number) is already present then only update the who marked
  //other wise create an entry(row)
  const isAlreadyPresent = await Spam.findOne({
    where: {
      phoneNum: spammingNumber,
    },
  });
  if (isAlreadyPresent) {
    let whoAlreadyMarked = isAlreadyPresent.toJSON().whoMarkedSpam;
    if (whoAlreadyMarked.includes(whoMarked)) {
      throw new Error("You already marked this number as Spam!");
    } else {
      whoAlreadyMarked = [...whoAlreadyMarked, whoMarked];
      const updatedSpamData = await Spam.update(
        { whoMarkedSpam: whoAlreadyMarked },
        {
          where: {
            phoneNum: spammingNumber,
          },
        }
      );
      res.status(200).send({
        message:"Number Marked as Spam!!",
        spammedData:updatedSpamData,
      })
    }
  } else {
    const savedSpamData = await Spam.create({
      phoneNum: spammingNumber,
      whoMarkedSpam: [whoMarked],
    });
    res.status(200).send({
      message: "Number marked as spam successfully",
      savedSpamData: savedSpamData,
    });
  }
});

module.exports = {
  markAsSpam,
};

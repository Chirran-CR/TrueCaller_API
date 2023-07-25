const { Op } = require("sequelize");
const db = require("../models/index");
const gdb = require("../models/indexGlobalDB");
const tryCatch = require("../utils/tryCatch");
const spamCheckerFn = require("../utils/spamChecker");

const GlobalUser = gdb.globalUsers;
const Contact = db.contacts;
const User = db.users;
const Spam = db.spams;

const search = tryCatch(async (req, res) => {
  const queryObj = req.query;
  const searchingUser = req.user;//who is searching, req. for check contact details

  if (queryObj.name) {
    let queryUser = await GlobalUser.findAll({
      where: {
        name: {
          [Op.like]: `%${queryObj.name}%`,
        },
      },
    });

    queryUser.sort((a, b) => {
      if (a.name.toLowerCase().startsWith(queryObj.name.toLowerCase())) {
        return -1;
      } else if (b.name.toLowerCase().startsWith(queryObj.name.toLowerCase())) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    //check spam from the spam table for each user
    if (Array.isArray(queryUser)) {
      //get more than one search result
      queryUser = await Promise.all(
        queryUser.map(async (usr) => {
          return await spamCheckerFn(usr,searchingUser); //check num is spam or not and then add how many num
          //of people mark this number as spam
        })
      );
    } else {
      //single search result
      queryUser = await spamCheckerFn(queryUser,searchingUser);
    }

    res.status(200).send({
      message: "User fetched Successfully",
      users: queryUser,
    });
  } else if (queryObj.number) {
    const isRegisteredNumPresent = await GlobalUser.findOne({
      where: {
        [Op.and]: [{ phoneNumber: queryObj.number }, { registeredUser: true }],
      },
      attributes: {
        exclude: ["id"],
      },
    });
    if (isRegisteredNumPresent) {
      const userAfterCheckingSpam = await spamCheckerFn(isRegisteredNumPresent,searchingUser);

      res.status(200).send({
        message: "User Fetched successfully",
        user: userAfterCheckingSpam,
      });
    } else {
      let getAllNum = await GlobalUser.findAll({
        where: {
          phoneNumber: queryObj.number,
        },
        attributes: {
          exclude: ["emailAddress", "id"],
        },
      });
      //loop over the non-registered user and check the spam likelihood
      getAllNum = await Promise.all(
        getAllNum.map(async (usr) => {
          return await spamCheckerFn(usr,searchingUser);
        })
      );
      res.status(200).send({
        message: "User Fetched successfully",
        user: getAllNum,
      });
    }
  }
});

module.exports = {
  search,
};

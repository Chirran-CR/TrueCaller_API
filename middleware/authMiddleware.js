const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const tryCatch = require("../utils/tryCatch");

const User = db.users;

const authMiddleware = tryCatch(async (req, res,next) => {
  let token;
  if (req?.cookies?.token) {
    token = req.cookies.token;
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
          where: {
            phoneNumber: decoded?.phoneNum,
          }
        });
        req.user = user.toJSON();
        // vla of usre is: {
        //     name: 'Chirran5',
        //     phoneNumber: 1234567894,
        //     emailAddress: '',
        //     password: '$2b$10$7q5KB7yxDJQo9xnqrz6aFeK.0A9eNzMbt5dw8fmMbh/MsQ6xlwfrq'
        //   }
        next();
      }
    } catch (err) {
      throw new Error("Not Authorized, Login Again!");
    }
  } else {
    throw new Error("There is no token in Header.");
  }
});

module.exports = authMiddleware;
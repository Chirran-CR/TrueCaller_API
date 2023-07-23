const express = require("express");
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

//static api
router.get("/",authMiddleware, userController.getAllUser);
router.post("/register",userController.registerUser);
router.post("/login",userController.loginUser);
//dynamic api
router.put("/addemail",authMiddleware, userController.addEmail);
router.get("/getallcontact",authMiddleware, userController.getAllContactOfThisNum);
module.exports = router;
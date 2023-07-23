const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();

router.get("/",userController.getAllUser);
router.post("/",userController.registerUser);
router.put("/addemail/:phonenum",userController.addEmail);
router.get("/:phonenum",userController.getAllContactOfThisNum);

module.exports = router;
const express = require("express");
const userController = require("../controllers/userController.js");
const router = express.Router();

router.get("/",userController.getAllUser);
router.post("/",userController.registerUser);
router.put("/addemail/:id",userController.addEmail);

module.exports = router;
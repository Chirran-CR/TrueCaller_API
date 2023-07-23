const express = require("express");
const { addContact, getContactInfo } = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addcontact",authMiddleware, addContact);//add contact wrt a phone num
router.get("/:contactnum",authMiddleware,getContactInfo);//this contact num is saved in whose phonebook.

module.exports = router;
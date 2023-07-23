const express = require("express");
const { addContact, getContactInfo } = require("../controllers/contactController");
const router = express.Router();

router.post("/addcontact/:phonenum",addContact);//add contact wrt a phone num
router.get("/:contactnum",getContactInfo);//this contact num is saved in whose phonebook.

module.exports = router;
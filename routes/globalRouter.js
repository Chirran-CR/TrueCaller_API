const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const { searchByName } = require("../controllers/globalController.js");
const router = express.Router();

//static api
router.get("/",authMiddleware, searchByName);

module.exports = router;
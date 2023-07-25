const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const { search } = require("../controllers/globalController.js");
const router = express.Router();

//static api
router.get("/",authMiddleware, search);

module.exports = router;
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { markAsSpam } = require("../controllers/spamController");
const router = express.Router();

router.post("/markspam",authMiddleware,markAsSpam);

module.exports = router;
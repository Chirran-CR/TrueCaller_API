const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/markspam",authMiddleware,)
const express = require("express");
const router = express.Router();
const { createShortLink } = require("../controllers/linkController");
const authenticateUser = require("../middlewares/authMiddleware");

router.post("/shorten", authenticateUser, createShortLink);
module.exports = router;
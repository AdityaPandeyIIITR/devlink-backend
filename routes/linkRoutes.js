const express = require("express");
const router = express.Router();
const { createShortLink } = require("../controllers/linkController");
const authenticateUser = require("../middlewares/authMiddleware");
const { handleRedirect } = require("../controllers/clickController");

router.post("/shorten", authenticateUser, createShortLink);
module.exports = router;

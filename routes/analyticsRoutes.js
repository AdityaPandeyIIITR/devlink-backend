const express = require("express");
const router = express.Router();

const { getClickAnalytics } = require("../controllers/analyticsController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:shortId", authMiddleware ,getClickAnalytics);

module.exports = router;
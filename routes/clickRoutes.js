const express = require("express");
const router = express.Router();

const { handleRedirect } = require("../controllers/clickController");

router.get("/:shortId", handleRedirect);

module.exports = router;

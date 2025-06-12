const express = require("express");
const router = express.Router();

const {signup,login} = require("../controllers/authController");

const authenticateUser = require("../middlewares/authMiddleware");

router.post("/signup" , signup);
router.post("/login", login);

router.get("/protected", authenticateUser, (req,res) => {
    res.json({message: "Access granted to protected route",userId:req.user});
});

module.exports = router;

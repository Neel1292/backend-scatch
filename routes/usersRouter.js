const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const router = express.Router();

router.get("/", function(req, res){ 
    res.send("Hello User!");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", loginUser);

module.exports = router
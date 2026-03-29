const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit")
const {signup , login , refresh , logout , getMe} = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware")


const authLimiter = rateLimit({
    windowMs: 15*60*1000, //15 min
max : 10,
message: {
    success: false,
    message: "Too many attempts, please try again"
},
standardHeaders : true,
 legacyHeaders : false,
})

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/me", protect, getMe);

module.exports = router;
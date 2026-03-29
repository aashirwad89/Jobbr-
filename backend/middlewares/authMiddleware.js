const {verifyAccessToken} = require("../utils/jwt");

const User = require("../models/User")

const protect = async(req, res, next)=>{
    try{
const authHeader = req.headers.authorization;

if(!authHeader || !authHeader.startsWith("Bearer")){
    return res.status(401).json({
        success:false,
        message:"Access denied , No token found"
    })
}

const token = authHeader.spilt(" ")[1];
let decoded;
try{
    decoded = verifyAccessToken(token);
}catch(err){
    if(err.name == "TokenExpiredError"){
        return  res.status(401).json({
            success:false,
            message:"Token expired, please refresh",
            code: "TOKEN_EXPIRED",
        })
    }
    return res.status(401).json({
        success:false,
        message:"Invalid token",
    })
}

const user = await User.findById(decoded.id);
if(!user){
    return res.status(401).json({
        success:false,
        message: "user no longer exists"
    })
}
req.user = user;
next();
    }catch(err){
        console.log(err, "Error in auth middleware protect")
        return res.status(500).json({message: "Server error"});
    }
}

const restrictTo = (...roles)=>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                 message: "Access denied , required role needed"
            })
        }
        next();
    }
}

module.exports = {protect, restrictTo};
const User = require("../models/User");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    setRefrreshToken, 
    clearRefreshToken,
    setRefreshTokenCookie,
    clearRefreshTokenCookie,
} = require("../utils/jwt")

const {validateSignup, validateLogin} = require('../utils/validators');


const signup = async(req, res)=>{
    try{
const {firstName, lastName , email, password, role} = req.body;

const {isValid , errors}  = validateSignup({firstName, lastName, email, password})
if(!isValid){
    return res.status(400).json({success: false, errors});
}

const existingUser = await User.findOne({email:email.toLowerCase()});
if(existingUser){
    return res.status(409).json({
        success:false,
        errors: {email: "An account eith this email already exists"},
    })
}

const user = await User.create({
    firstName: firstName.trim(),
    lastName : lastName.trim(),
    email: email.toLowerCase().trim(),
    password,
    role: role === "recruiter" ? "recuriter" : "candidate",
})

const accessToken = generateAccessToken(user._id);
const refreshToken = generateRefreshToken(user._id);

user.refreshToken = refreshToken;
user.lastLogin = new Date();
await user.save();

setRefreshToken(res, refreshToken);

return res.status(200).json({
    success:true,
    message:"Account created successfully",
    accessToken,
    user:user.toJSON(),
})
    }catch(err){
        console.log(err, "Error in signup controller");
        return res.status(500).json({message: "Server error"})
    }
}



const login = async(req, res)=>{
    try{
const {email , password} = req.body;

const{isValid, errors} = validateLogin({email, password});

if(!isValid){
return res.status(400).json({success:false, errors});
}

const user = await User.findOne({email: email.toLowerCase()}).select("+password");

if(!user){
    return res.status(401).json({
        sucess: false,
        message: "Invalid email or password"
    })
}

if(!user.password){
    return res.status(400).json({
        success:false,
        message: "This account uses Google sign in , please continue with google"
    })
}

const accessToken = generateAccessToken(user._id);
const refreshToken = generateRefreshToken(user._id);

user.refreshToken = refreshToken;
user.lastLogin = new Date();
await user.save();

setRefreshTokenCookie(res, refreshToken);

return res.status(200).json({
    success:true,
    message:"Logged in successfully",
    accessToken,
    user: user.toJSON()
})
    }catch(err){
        console.log("Error in login controller", err);
        return res.status(500).json({message: "Server error"})
    }
}


const refresh = async(req, res)=>{
try{
const token = req.cookies?.refreshToken;
if(!token){
    return res.status(401).json({sucess:false, message:"No refresh token"})
}

let decode;
try{
    decode = verifyRefreshToken(token);
}catch(e){
    clearRefreshTokenCookie(res);
    return res.status(403).json({sucess:false, message:"Invalid refresh token"})
}

const user = await User.findById(decode.id).select("+refreshToken")
if(!user || user.refreshToken !== token){
    clearRefreshTokenCookie(res);
    return res.status(403).json({success: false, message:"refresh token mismatch"})
}

const newAcessToken = generateAccessToken(user._id);
const newRefreshToken = generateRefreshToken(user._id);

user.refreshToken = newRefreshToken;
await user.save();
setRefreshTokenCookie(res, newRefreshToken);

return res.status(200).json({
    success:true,
    accessToken: newAccessToken,
})
}catch(err){
    console.log(err, "Error in refresh controller");
    return res.status(500).json({message: "Server error"})
}
}


const logout = async(req, res)=>{
    try{
const token = req.cookies?.refreshToken;

if(token){
    await User.findOneAndUpdate(
        {refreshToken: token},
        {refreshToken : null}
    )
}
clearRefreshToken(res);

return res.status(200).json({success: true, message: "Logout sucessfully"})
    }catch(err){
        console.log("error in logout controller", err);
    }
}

const getMe = async(req, res)=>{
    try{
const user =    await User.findById(req.user.id);
if(!user){
    return res.status(404).json({success: false, message:"User not found"});
}

return res.status(200).json({success: true , user})
    }catch(err){
        console.log(err, "Error in get me controller")
        res.status(500).json({message:"Server error"})
    }
}

module.exports = {signup, login, refresh, logout , getMe};


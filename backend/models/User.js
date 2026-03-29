const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
{
    firstName:{
        type:String , 
        required:[true , "First name is required"],
        trim: true,
        minLength:[2],
        maxLength:[50]
    },
    lastName:{
        type:String,
        required: [true, "Last name is required"],
        trim: true,
        minLength:[2],
        maxLength:[50]
    },
    email:{
        type:String,
        required:[true, "email is required"], // 👈 fix bhi kar diya
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type: String,
        minLength: [8],
        select:false,
    },
    role:{
        type:String,
        enum:["candidate", "recruiter", "admin"], // 👈 typo fix
        default: "candidate"
    },
    googleId:{
        type:String,
        sparse:true,
    },
    avatar:{
        type:String,
        default: "",
    },
    isEmailVerified:{
        type: Boolean,
        default: false,
    },
    refreshToken:{
        type: String,
        select:false,
    },
    lastLogin:{
        type:Date,
    },
},
{
    timestamps: true,
}
);

// ✅ without next
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getFullName = function(){
    return `${this.firstName} ${this.lastName}`; // 👈 comma hata diya (clean)
};

userSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    delete obj.refreshToken;
    delete obj.__v;
    return obj;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
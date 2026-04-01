const mongoose = require('mongoose');
const resumeSchema  = new mongoose.Schema({
    fileName:String,
    extractedText:String,
    analysis:{
        score:Number,
        skills:[String],
        suggestions:[String]
    }
}, {timestamps: true});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports  = Resume;
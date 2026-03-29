const errorHandler = (err, req, res, next)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    if(err.code == 11000){
        const field = Object.keys(err.keyValue)[0];
        statusCode = 409;
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`; 
    }

    if(err.name == "ValidateError"){
        statusCode = 400;
        const error = {};
        Object.keys(err.error).forEach((key)=>{
            error[key] = err.errors[key].message;
        })
        return res.status(statusCode).json({success:false , error});
    }

    if(err.name == "CastError"){
        statusCode = 400;
        message: "Invalid error"
    }
    console.log("Error", err);

    res.status(statusCode).json({
        sucess:false,
        message,
        ...(process.env.NODE_ENV == "developement" && {stack: err.stack})
    })
}

const notFound = (req, res)=>{
    res.status(404).json({
        sucess:false,
        message:"Route not found"
    })
}

module.exports = {errorHandler, notFound};
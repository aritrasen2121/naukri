import ErrorHandler from "../utils/ErrorHandler.js";

export const errorMiddleware=(err,req,res,next) =>{
    err.statusCode=err.statusCode || 500
    err.message=err.message || "Internal Server Error"

    // wrong mongodb id err
    if(err.name === 'CastError'){
        err = new ErrorHandler(`Resource not found ${err.path}`,400)
    }

    // duplicate key err
    if(err.code === 11000){
        err = new ErrorHandler(`Duplicate Key ${Object.keys(err.keyValue)}`,400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}


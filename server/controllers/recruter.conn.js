import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import Recruter from '../model/recruter.model.js'


export const signUp = catchAsyncError(async (req,res,next) =>{
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password) return next(new ErrorHandler("enter all the fields",400))

        let recruter = await Recruter.findOne({email})

        if(recruter) return next(new ErrorHandler("Recruter already exixts",400))

        recruter = await Recruter.create({
            name,
            email,
            password
        })

        res.status(201).json({
            success: true,
            recruter
        })
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }    
    
})

export const logIn = catchAsyncError(async (req,res,next) =>{
    try {
        const {email,password} = req.body

        if(!email || !password) return next(new ErrorHandler("enter all the fields",400))

        const recruter = await Recruter.findOne({email})

        if(!recruter) {
            return next(new ErrorHandler("recruter not found",400))
        }
        res.status(200).json({
            success: true,
            recruter
        })
    } catch (err) {
        return next(new ErrorHandler(err.message,400))
    }        
})



import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors'
import rectuterRouter from './route/recruter.route.js';
import jobRouter from './route/job.route.js';
import applicationRouter from './route/application.route.js';
import userRouter from './route/user.route.js';

export const app =express()

//middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));

//route
app.use("/api/v1/recruter",rectuterRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/application",applicationRouter)


//testing api
app.get("/test",(req,res,next) =>{
    res.status(200).json({
        success: true,
        message: "api is working"
    })
})

app.all("*",(req,res,next) =>{
    const err = new Error(`route ${req.originalUrl} not found`);
    err.statusCode=404
    next(err)
})

app.use(errorMiddleware)

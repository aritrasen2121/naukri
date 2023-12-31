import dotenv from 'dotenv'
dotenv.config()
import {app} from "./app.js";
import connectDB from "./DB/db.js";


app.listen(process.env.PORT,() =>{
    console.log('server is running')
    connectDB()
})
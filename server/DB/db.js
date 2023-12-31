import { mongoose } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dbUrl = process.env.MONGO_URL || ''

const connectDB = async () =>{
    try {
        await mongoose.connect(dbUrl)
        .then(() => console.log("db connected"))
    } catch (err) {
        console.log(err.message);
        setTimeout(connectDB,5000)
    }
}

export default connectDB
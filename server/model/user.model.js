import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    appliedJobs:[
        {
            type: Types.ObjectId,
            ref: 'job'
        }
    ]
})

export default model("user",userSchema)
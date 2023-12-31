import { Schema, Types, model } from "mongoose";

const recruterSchema = new Schema({
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
    postedJobs:[
        {
            type: Types.ObjectId,
            ref: "job",
        }
    ]
})

export default model("recruter",recruterSchema)
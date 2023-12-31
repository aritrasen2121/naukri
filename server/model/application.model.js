import { Schema, Types, model } from "mongoose";

const applicationSchema = Schema({
    userEmail:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    skills:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    coverletter:{
        type: String,
        required: true
    },
})

export default model("application",applicationSchema)
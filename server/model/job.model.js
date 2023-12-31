import { Schema, Types, model } from "mongoose";

const jobSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    application:[
        {
            type: Types.ObjectId,
            ref: "application"
        }
    ],
})

export default model("job",jobSchema)
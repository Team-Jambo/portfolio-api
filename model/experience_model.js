import { Schema, model, Types } from "mongoose";

// create new Schema
const experienceSchema = new Schema ({
        position: {type: String, required: true},
        company: {type: String, required: true},
        location: {
            type: String,
            default: null
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        responsibilies: {
            type: String,
            required: true
        },
        user: {type: Types.ObjectId, ref: 'User'}
    });

export const Experience = model("Workexperience", experienceSchema);

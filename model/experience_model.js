import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new Schema
const experienceSchema = new Schema({
    position: { type: String, required: true },
    company: { type: String, required: true },
    location: {type: String, default: null},
    skills: {type: String},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    responsibilities: {type: String, required: true},
    user: { type: Types.ObjectId, ref: 'User' }
});

experienceSchema.plugin(toJSON);
export const Experience = model("Experience", experienceSchema);

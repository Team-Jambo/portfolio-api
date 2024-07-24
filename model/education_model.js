import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new Schema
const educationSchema = new Schema({
    institution: {
        type: String,
        required: true
    },

    program: {
        type: String
    },

    location: { type: String },

    grade: {
        type: String
    },

    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },

    user: {
        type: Types.ObjectId, ref: 'User'
    }

});

educationSchema.plugin(toJSON)
export const Education = model('Education', educationSchema);
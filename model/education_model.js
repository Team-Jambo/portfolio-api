import { Schema, model, Types } from "mongoose";


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
        type: Types.ObjectId, ref: 'User'}

});

export const Education = model('EducationAndTraining', educationSchema);
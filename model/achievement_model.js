import { Schema, model, Types } from "mongoose";

// create a new Schema
const Achievements = new Schema ({
    awardType: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String
    },

    Date: {
        type: String,

    },

    nameOfInstitution: {
        type: String,

    },

    user: {
        type: Types.ObjectId, ref: 'User'}

});

//install to json


export const Achievement = model('Achievement', achievementSchema);
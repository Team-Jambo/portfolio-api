import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

// create new schema

const volunteeringSchema = new Schema({
    organisation: {
        type: String
    },

    description: {
        type: String
    },

    skills: {
        type: String
    },

    startDate: {
        type: String
    },

    endDate: {
        type: String
    },

    role: {
        type: String
    },

    responsibility: {
        type: String
    },
    location: {
        type: String
    },

    user: {
        type: Types.ObjectId, ref: 'User'}
});


volunteeringSchema.plugin(toJSON);
export const Volunteering = model('Volunteering', volunteeringSchema);


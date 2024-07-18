import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create a new Schema
const achievementSchema = new Schema({
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
        type: Types.ObjectId, ref: 'User'
    }

});

//install to json

achievementSchema.plugin(toJSON);
export const Achievement = model('Achievement', achievementSchema);
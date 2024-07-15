import { Schema, model, Types } from "mongoose";

// create new schema

const volunteerSchema = new Schema({
    organisation: {
        type: String
    },

    description: {
        type: String
    },

    skill: {
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

export const VolunteerModel = model('Volunteer', volunteerSchema);



// import { model, Schema, Types } from "mongoose";
// import { toJSON } from '@reis/mongoose-to-json';

// const volunteerSchema = new Schema({
//     userId: { type: Types.ObjectId, ref: 'User', required: true },
//     organization: { type: String },
//     role: { type: String },
//     description: { type: String },
//     skills: { type: String },
//     location: { type: String },
//     startDate: { type: String },
//     endDate: { type: String },
//     projectName: { type: String }
// }, {
//     timestamps: true
// })

// volunteerSchema.plugin(toJSON)

// export const VolunteerModel = model('Volunteering', volunteeringSchema)

import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new Schema
const userProfileSchema = new Schema({
    profilePicture: { type: String },
    bio: { type: String },
    maritalStatus: { type: String, enum: ['single', 'married', 'prefer-not-to-say'] },
    sex: { type: String },
    resume: { type: String },
    location: { type: String },
    about: { type: String },
    contact: { type: String },
    dateofBirth: { type: Date },
    languages: { type: String, enum: ['English', 'Ga', 'Twi', 'Ewe'] },
    resume: { type: String },
    linkedinLink: { type: String }, /* socials*/
    twitterLink: { type: String },
    githubLink: { type: String },
    user: { type: Types.ObjectId, ref: 'User' }
});

userProfileSchema.plugin(toJSON);
export const userProfile = model('Profile', userProfileSchema);
import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new Schema
const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: { type: String, required: true, unique: true, },
    password: { type: String },
    userName: { type: String, unique: true },
    termsAndconditions: { type: String },
    education: [{ type: Types.ObjectId, ref: 'Education' }],
    skills: [{ type: Types.ObjectId, ref: 'Skill' }],
    achievements: [{ type: Types.ObjectId, ref: 'Achievement' }],
    projects: [{ type: Types.ObjectId, ref: 'Project' }],
    userProfile: { type: Types.ObjectId, ref: 'UserProfile' },
    volunteering: [{ type: Types.ObjectId, ref: 'Volunteering' }],
    experiences: [{ type: Types.ObjectId, ref: 'Experience' }],

}, {
    timestamps: true

});


userSchema.plugin(toJSON);

export const User = model('User', userSchema)

import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import bcrypt from "bcrypt";

// create new Schema
const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: {type: String,required: true, unique: true,},
    password: { type: String },
    userName: { type: String, unique: true },
    termsAndconditions: { type: String },

    user: {type: Types.ObjectId, ref: 'User'}
});


userSchema.plugin(toJSON);

export const User = model ('User', userSchema)

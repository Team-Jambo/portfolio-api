import { Schema, model, Types } from "mongoose";

// create new schema

const skillsSchema = new Schema ({
typeOfSkill: {
    type: String 
},

levelOfProficiency: { 
    type: String, 
    enum: [
        'beginner', 'intermediate', 'expert'
    ] },

    user: {
        type: Types.ObjectId, ref: 'User', select:false}
});

export const Skill= model('Skill', skillsSchema);
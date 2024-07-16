import { Schema, model, Types } from "mongoose";

// create new schema

const skillsSchema = new Schema ({
typeOfskill: {
    type: String 
},

levelOfProficiency: { 
    type: String, 
    enum: [
        'beginner', 'intermediate', 'expert'
    ] },

    user: {
        type: Types.ObjectId, ref: 'User'}
});

export const SkillModel = model('Skill', skillsSchema);
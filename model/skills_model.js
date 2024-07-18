import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


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


skillsSchema.plugin(toJSON);
export const Skill= model('Skill', skillsSchema);
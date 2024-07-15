import { Schema, model, Types } from "mongoose";

// create new schema

const projectSchema = new Schema ({
    user: {type: Types.ObjectId, ref: 'User'},
    projectName: {type: String},
    description: {type: String},
    contributors: {type: String},
    date: {type: Date},
    skills: {type: String}, /* shows the skills demonstrated in this project */
    // add a few more features an accomplished look
    projectUrl: {type: String}, /* this is the link that takes you to the full project */
    image: {type: String}
});

export const projectModel = model('Project', projectSchema);
import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


// create new schema

const projectSchema = new Schema ({
    user: {type: Types.ObjectId, ref: 'User'},
    projectName: {type: String},
    description: {type: String},
    contributors: {type: String},
    nameOfInstitution: { type: String },
    skills: { type: String },
    startDate: {type: String},
    endDate: {type: String},
    skills: {type: String}, /* shows the skills demonstrated in this project */
    // add a few more features an accomplished look
    projectUrl: {type: String}, /* this is the link that takes you to the full project */
    image: {type: String}
});

projectSchema.plugin(toJSON);
export const Project = model('Project', projectSchema);
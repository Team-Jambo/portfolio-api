import joi from "joi";


export const projectSchema = joi.object({
        projectName:joi.string().required(),
        description:joi.string(),
        contributors:joi.string(),
        date:joi.string(),
        skills: joi.string(),
        projectUrl: joi.string(),
        image: joi.string()
    
});
import joi from "joi";


export const projectSchema = joi.object({
        image: joi.string(),
        projectName: joi.string().required(),
        description: joi.string().required(),
        contributors: joi.string(),
        skills: joi.string().required(),
        projectUrl: joi.string().required(),
        nameOfInstitution: joi.string(),
        startDate: joi.string().required(),
        endDate: joi.string(),
        user: joi.string()
})
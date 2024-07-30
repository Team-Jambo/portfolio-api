import joi from 'joi';

export const volunteeringSchema = joi.object({
        organisation: joi.string().required(),
        description: joi.string().required(),
        skills: joi.string(),
        startDate: joi.string().required(),
        endDate: joi.string(),
        role: joi.string().required(),
        responsibility: joi.string().required(),
        location: joi.string(),
        projectName: joi.string(),
        user: joi.string()
})




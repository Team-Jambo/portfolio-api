import joi from 'joi';

export const experienceSchema = joi.object({

        company: joi.string().required(),
        position: joi.string().required(),
        skills: joi.string().required(),
        responsibilities: joi.string().required(),
        location: joi.string().required(),
        startDate: joi.string().required(),
        endDate: joi.string(),
        user: joi.string()
})

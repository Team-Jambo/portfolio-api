import joi from 'joi';

export const experienceSchema = joi.object({
        position: joi.string().required(),
        company: joi.string().required(),
        location: joi.string().default(null),
        startDate: joi.string().required(),
        endDate: joi.string().required(),
        responsibilities: joi.string().required(),
});

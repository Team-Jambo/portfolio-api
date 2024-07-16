import joi from 'joi';

export const volunteeringSchema = joi.object({
        organisation:joi.string().required(),
        description:joi.string(),
        skill:joi.string(),
        startDate:joi.string().required(),
        endDate:joi.string().required(),
        role:joi.string(),
        responsibility:joi.string(),
        location:joi.string() 
});




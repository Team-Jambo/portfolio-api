import joi from 'joi';

export const volunteerSchema = joi.object({
   volunteer:{
        organisation:joi.string().required().sanitize(),
        description:joi.string(),
        skill:joi.string(),
        startDate:joi.string().required(),
        endDate:joi.string().required(),
        role:joi.string(),
        responsibility:joy.string(),
        location:joi.string() 
    }
});




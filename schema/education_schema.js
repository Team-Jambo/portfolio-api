import joi from 'joi';

const educationSchema = joi.object({
        institution:joi.string().required(),
        program:joi.string(),
        location:joi.string(),
        grade:joi.string(),
        startDate:joi.string().required(),
        endDate:joi.string().required(),
    
});



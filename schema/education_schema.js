import joi from 'joi';

const educationBackgroundSchema = joi.object({
    educationalBackground:{
        institution:joi.string().required(),
        program:joi.string(),
        location:joi.string(),
        grade:joi.string(),
        startDate:joi.string().required(),
        endDate:joi.string().required(),
    }
});



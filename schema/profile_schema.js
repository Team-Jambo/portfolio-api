import joi from 'joi';

export const userProfileSchema = joi.object({
    profile:{
        profilePicture:joi.string(),
        bio:joi.string(),
        maritalStatus:joi.string().valid('single','married','prefer-not-to-say'),
        sex:joi.string().valid('male','female'),
        location:joi.string(),
        contact: joi.string(),
        about:joi.string(),
        dateOfBirth:joi.string(),
        languages:joi.string().valid('English','Ga','Twi','Ewe'),
        resume:joi.string(),
        linkedinLink:joi.string(),
        twitterLink:joi.string(),
        user: joi.string().required()
    }
});

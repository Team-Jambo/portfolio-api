import joi from 'joi';

const achievementSchema = joi.object({
    achievement:{
        awardType:joi.string().required(),
        description:joi.string(),
        image:joi.string(),
        date:joi.string(),
        nameOfInstitution:joi.string(),
    }
});



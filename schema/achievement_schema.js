import joi from 'joi';

const Achievement = joi.object({
 
        awardType:joi.string().required(),
        description:joi.string(),
        image:joi.string(),
        date:joi.string(),
        nameOfInstitution:joi.string(),
 
});



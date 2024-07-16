import joi from 'joi';

const workexperienceSchema = joi.object({
   workExperience:{
        position:joi.string().required(),
        company:joi.string().required(),
        location:joi.string().default(null),
        startDate:joi.string().required(),
        endDate:joi.string().required(),
        responsibilities:joy.string().required(),
      
    }
});

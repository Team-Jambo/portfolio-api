import joi from "joi";

export const skillsSchema = joi.object({

        typeOfSkill:joi.string(),
        levelOfProficiency:joi.string().valid('beginner','intermediate','expert')
   
});

const skillSchema = joi.object({

    skill:{
        typeOfSkill:joi.string(),
        levelOfProficiency:joi.string().valid('beginner','intermediate','expert')
    }
});

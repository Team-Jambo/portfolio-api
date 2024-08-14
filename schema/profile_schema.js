import joi from 'joi';

export const userProfileSchema = joi.object({
  profilePicture: joi.string().allow('').optional(),
  location: joi.string().required(),
  maritalStatus: joi.string().valid('single', 'married', 'prefer-not-to-say').optional(),
  sex: joi.string().valid('male', 'female', 'other').required(),
  bio: joi.string().required(),
  about: joi.string().required(),
  dateOfBirth: joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/).required().messages({
    'string.pattern.base': 'Date of birth must be in the format DD-MM-YYYY'
  }),
  contact: joi.string().pattern(/^\d{10}$/).required().messages({
    'string.pattern.base': 'Contact must be a 10-digit number'
  }),
  resume: joi.string().allow('').optional(),
  languages: joi.alternatives().try(
    joi.array().items(joi.string()),
    joi.string()
  ).required(),
  linkedinLink: joi.string().uri().allow('').optional(),
  twitterLink: joi.string().uri().allow('').optional(),
  githubLink: joi.string().uri().allow('').optional(),
  user: joi.string()
});




// import joi from 'joi';

// export const userProfileSchema = joi.object({
   
//     profilePicture: joi.string(),
//     location: joi.string(),
//     maritalStatus: joi.string().valid('single', 'married', 'prefer-not-to-say'),
//     sex: joi.string().valid('male', 'female'),
//     bio: joi.string(),
//     about: joi.string(),
//     dateOfBirth: joi.date(),
//     contact: joi.string(),
//     resume: joi.string(),
//     languages: joi.array().items(joi.string()),
//     user: joi.string()
//   })

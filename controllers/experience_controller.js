import { Experience } from "../model/experience_model.js";
import { User } from "../model/user_model.js";
import { experienceSchema } from "../schema/experience_schema.js";


//  defining routes to get experiences, create experiences and find experiences by id
export const getExperiences = async (req, res, next) => {
    try {
        //we are fetching workExperiences that belongs to a particular user
        const userId = req.params.id
        const allExperiences = await Experience.find({user: userId}).populate('experiences');
    // if(allExperiences.length == 0){
    //     return res.status(404).send(allExperiences)
    // }
    res.status(200).json({Experience: allExperiences});
    } catch (error) {
        next(error)
    }
};


export const addExperience = async (req, res, next) => {
    try {
        const {error, value} = experienceSchema.validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message)
        };

        //create workExperience with the value
        const newExperience = await Experience.create(value)

         // assign a userid var
         const userId = req.session?.user?.id || req?.user?.id;
        //after, find the user with the id that you passed when creating the workExperience 
        // bear this in mind that the session should be available in order to execute this
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found'); /*optionally console.log the error if you encounter challenges*/
        }
       
        //if you find the user, push the workExperience id you just created inside
        user.experience.push(newExperience._id);

        //and save the user now with the workExperienceId
        await user.save();

        //return the workExperience
        res.status(201).json({message:"Experience has been added.",newExperience});
    } catch (error) {
        next(error)
    }
};



export const getExperience = async (req, res, next) => {

    try {
        const Experience = await Experience.findById(req.params.id).populate('experiences');
        res.status(200).json(Experience);
    } catch (error) {
        next(error)
    }

};




// controller to update a work experience
export const updateExperience = async (req, res, next) => {
    try {
        const { error, value } = experienceSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.experienceId, /* the id is a plaaceholder*/
            value,
            { new: true }
        );

        if (!updatedExperience) {
            return res.status(404).send("Experience not found");
        }

        res.status(200).json({ message:"Experience has been updated" ,updatedExperience });
    } catch (error) {
       next(error)
    }
};


//  controller to delete an experience
export const deleteExperience = async (req, res, next) => {
    try {
     
        const userId = req.session?.user?.id || req?.user.id;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        const experience = await Experience.findByIdAndDelete(req.params.id);
          if (!experience) {
              return res.status(404).send("experience not found");
          }
    
          user.experiences.pull(req.params.id);
          await user.save();
        res.status(200).json("Experience deleted");
      } catch (error) {
        return res.status(500).json({error})
      }
    };
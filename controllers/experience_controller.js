import { Experience } from "../model/experience_model.js";
import { User } from "../model/user_model.js";
import { experienceSchema } from "../schema/experience_schema.js";


//  defining routes to get experiences, create experiences and find experiences by id
export const getExperiences = async (req, res) => {
    try {
        //we are fetching workExperiences that belongs to a particular user
        const userId = req.params.id
        const allExperiences = await Experience.find({user: userId})
    if(allExperiences.length == 0){
        return res.status(404).send('No work experience added')
    }
    res.status(200).json({workExperience: allExperiences});
    } catch (error) {
        return res.status(500).send(error);
    }
};


export const addExperience = async (req, res) => {
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
        user.workExperience.push(newExperience._id);

        //and save the user now with the workExperienceId
        await user.save();

        //return the workExperience
        res.status(201).json({newExperience});
    } catch (error) {
        return res.status(500).send(error); /* yu can cnsole log abve too*/
    }
};

export const getOneWorkExperience = async (req, res) => {

    try {
        const workExperience = await Experience.findById(req.params.id);
        res.status(200).json(workExperience);
    } catch (error) {
        return res.status(500).send(error);
    }

};


// controoller to update a work experience
export const updateExperience = async (req, res) => {
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

        res.status(200).json({ experience: updatedExperience });
    } catch (error) {
        console.error("Experience update error!: ", error); /* console logging this can optionlly be ignored*/
        res.status(500).send(error.message);
    }
};


//  controller to delete an experience
export const deleteExperience = async (req, res) => {
    try {
        const deletedExperience = await Experience.findByIdAndDelete(req.params.experienceId);

        if (!deletedExperience) {
            return res.status(404).send("experience not found!");
        }

        // filter out experience from user
        const user = await User.findById(deletedExperience.user);
        if (user) {
            user.experiences = user.experiences.filter(experienceId => experienceId.toString() !== req.params.experienceId);
            await user.save();
        }

        res.status(200).json({ experience: deletedExperience });
    } catch (error) {
        console.error("Experience deletion error: ", error);
        res.status(500).send(error.message);
    }
};
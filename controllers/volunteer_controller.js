// import { User } from "../model/user_model.js";
import { Volunteering } from "../model/uservolunteer_model.js";
import {  volunteeringSchema } from "../schema/volunteer_schema.js";



export const getAllVolunteers = async (req, res) => {
    try {
        const userId = req.params.id
        const allvolunteers = await Volunteering.find({user: userId});
        if (allvolunteers.length == 0) {
            return res.status(404).send("No volunteer added!");
        }
        res.status(200).json({contact: allvolunteers});
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const postVolunteer = async (req, res) => {
    try {
        const {error, value} = volunteeringSchema.validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message)
        };

        //create volunteer with the value
        const volunteer = await Volunteering.create(value)

        //after, find the user with the id that you passed when creating the volunteer 
        const userId = req.session.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        //if you find the user, push the volunteer id you just created inside
        user.volunteer.push(volunteer._id);

        //and save the user now with the volunteerId
        await user.save();

        //return the volunteer
        res.status(201).json({volunteer});
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const getOneVolunteer = async (req, res) => {

    try {
        const volunteer = await Volunteering.findById(req.params.id);
        if (!volunteer) {
            return res.status(404).send('Volunteer not found');
        }
        //  return volunteer
        res.status(200).json(volunteer);
    } catch (error) {
        return res.status(500).send(error);
    }

};


//  controller to update volunteer
export const updateVolunteer = async (req, res) => {
    try {
      const { error, value } = volunteeringSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const updatedVolunteer = await Volunteering.findByIdAndUpdate(
        req.params.volunteerId,
        value,
        { new: true }
      );
  
      if (!updatedVolunteer) {
        return res.status(404).send('Volunteer not found');
      }
  
      res.status(201).json({ volunteer: updatedVolunteer });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };


//    controller to delete volunteer
export const deleteVolunteer = async (req, res) => {
    try {
      const deletedVolunteer = await Volunteering.findByIdAndDelete(req.params.volunteerId);
  
      if (!deletedVolunteer) {
        return res.status(404).send('Volunteer not found');
      }
  
      // Remove volunteer from user
      const user = await userModel.findById(deletedVolunteer.user);
      if (user) {
        user.volunteer = user.volunteer.filter(volunteerId => volunteerId.toString() !== req.params.volunteerId);
        await user.save();
      }
  
      res.status(201).json({ volunteer: deletedVolunteer });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };


import { userProfile } from "../model/profile_model.js";
import { User } from "../model/user_model.js";
import { userProfileSchema } from "../schema/profile_schema.js";


// Create user profile
export const createUserProfile = async (req, res) => {
    try {
      const { error, value } = userProfileSchema.validate({
        ...req.body,
        profilePicture: req.files.profilePicture[0].filename,
        resume: req.files.resume[0].filename,
      });
  
      // Finding the user by ID
      const userId = value.user; 
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Create or update the user profile
      let userProfile = await userProfile.findOneAndUpdate(
        { user: userId }, // Find by user ID
        value,
        { new: true, upsert: true } 
      );
  
      // Associate the user profile with the user
      user.userProfile = userProfile._id;
      await user.save();
  
      // Return the user profile
      res.status(201).json({ userProfile });
  
    } catch (error) {
      console.error('Error adding/updating user profile:', error);
      res.status(500).send(error.message);
    }
  };


  // controller to get user profiles
export const getUserProfile = async (req, res) => {
    try {
      const allUserProfiles = await userProfile.find();
      if (allUserProfiles.length === 0) {
        return res.status(404).send('No user profiles found');
      }
      res.status(200).json({ userProfiles: allUserProfiles });
    } catch (error) {
      console.error('Error fetching user profiles:', error);
      res.status(500).send(error.message);
    }
  };


  // export const getOneProfile = async (req, res) => {
  //   try {
  //     const userProfile = await userProfile.findById(req.params.id);
  //     if (!userProfile) {
  //       return res.status(404).send('User profile not found');
  //     }
  //     res.status(200).json({ userProfile });
  //   } catch (error) {
  //     console.error('Error fetching user profile:', error);
  //     res.status(500).send(error.message);
  //   }
  // };


  export const updateUserProfile = async (req, res) => {
    try {
      const { error, value } = userProfileSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const updatedProfile = await userProfile.findByIdAndUpdate(
        req.params.userProfileId,
        value,
        { new: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).send('User profile not found');
      }
  
      res.status(200).json({ userProfile: updatedProfile });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).send(error.message);
    }
  };


  // Delete a profile
export const deleteProfile = async (req, res) => {
    try {
      const deletedProfile = await userProfile.findByIdAndDelete(req.params.userProfileId);
  
      if (!deletedProfile) {
        return res.status(404).send('User profile not found');
      }
  
      // Remove user profile reference from user
      const user = await userModel.findById(deletedProfile.user);
      if (user) {
        user.userProfile = null;
        await user.save();
      }
  
      res.status(200).json({ userProfile: deletedProfile });
    } catch (error) {
      console.error('Error deleting user profile:', error);
      res.status(500).send(error.message);
    }
  };
  
  

import { userProfile } from "../model/profile_model.js";
import { User } from "../model/user_model.js";
import { userProfileSchema } from "../schema/profile_schema.js";


// Create user profile
// export const createUserProfile = async (req, res, next) => {
//     try {
//       const { error, value } = userProfileSchema.validate({
//         ...req.body,
//         profilePicture: req.file.profilePicture[0].filename,
//         resume: req.file.resume[0].filename,
//       });
  
//       // Finding the user by ID
//       const userId = req.session?.user?.id || req?.user?.id; 
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).send('User not found');
//       }
  
//       // Create or update the user profile
//       let userProfile = await userProfile.findOneAndUpdate(
//         { user: userId }, // Find by user ID
//         value,
//         { new: true, upsert: true } 
//       );
  
//       // Associate the user profile with the user
//       user.userProfile = userProfile._id;
//       await user.save();
  
//       // Return the user profile
//       res.status(201).json({ message:"Profile has been added.",userProfile });
  
//     } catch (error) {
//       // console.error('Error adding/updating user profile:', error);
//       // res.status(500).send(error.message);
//       next(error)
//     }
//   };

// export const postuserProfile = async (req, res) => {
//   try {
//     const { error, value } = userProfileSchema.validate({
//       ...req.body,
//       profilePicture: req.files?.profilePicture[0].filename,
//       resume: req.files?.resume[0].filename,
//     });

//     if (error) {
//       return res.status(400).send(error.details[0].message);
//     }

//     const userId = req.session?.user?.id || req?.user.id;
   

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     const profile = await userProfile.create({ ...value, user: userId });

//     user.userProfile = profile._id;

//     await user.save();

//     res.status(201).json({ profile });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const postuserProfile = async (req, res, next) => {
  try {
    const { error, value } = userProfileSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ error: error.details.map(d => d.message) });
    }

    // If languages is a string, split it into an array
    if (typeof value.languages === 'string') {
      value.languages = value.languages.split(',').map(lang => lang.trim());
    }

    const userSessionId = req.session?.user?.id || req?.user?.id;
    const user = await User.findById(userSessionId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const profile = await userProfile.create({
      ...value,
      user: userSessionId
    });

    user.profile = profile._id;
    await user.save();

    res.status(201).json({ message: "Profile has been created", profile });
  } catch (error) {
    console.error('Error in postuserProfile:', error);
    next(error);
  }
};



  // controller to get user profiles
export const getUserProfile = async (req, res, next) => {
    try {
      const allUserProfiles = await userProfile.find();
      
      // if (allUserProfiles.length === 0) {
      //   return res.status(404).send(allUserProfiles);
      // }
      res.status(200).json({ userProfiles: allUserProfiles });
    } catch (error) {
      // console.error('Error fetching user profiles:', error);
      // res.status(500).send(error.message);
      next(error)
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


  export const updateProfile = async (req, res, next) => {
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
  
      res.status(200).json({ message:"Profile has been updated.", updatedProfile });
    } catch (error) {
      next(error)
      // console.error('Error updating user profile:', error);
      // res.status(500).send(error.message);
    }
  };


  // Delete a profile
export const deleteProfile = async (req, res, next) => {
    try {
      const deletedProfile = await userProfile.findByIdAndDelete(req.params.userProfileId);
  
      if (!deletedProfile) {
        return res.status(404).send('User profile not found');
      }
  
      // Remove user profile reference from user
      const user = await User.findById(deletedProfile.user);
      if (user) {
        user.userProfile = null;
        await user.save();
      }
  
      res.status(200).json({ userProfile: deletedProfile });
    } catch (error) {
      next(error)
      // console.error('Error deleting user profile:', error);
      // res.status(500).send(error.message);
    }
  };
  
  

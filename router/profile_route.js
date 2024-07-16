import { Router } from "express";
import { addUserProfile, createUserProfile, deleteProfile, deleteUserProfile, getAllUserProfiles, getUserProfile, getUserProfiles, updateProfile, updateUserProfile } from "../controllers/profile_controller.js";
import { checkUserSession } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/uploads.js";

export const userProfileRouter = Router();

userProfileRouter.get('/userProfile', getUserProfiles);

userProfileRouter.get('/userprofile', addUserProfile);

userProfileRouter.patch('/userprofile', updateProfile);

userProfileRouter.delete('/userprofile', deleteProfile);


userProfileRouter.post( '/userProfile', remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    createUserProfile
  );


export default userProfileRouter;
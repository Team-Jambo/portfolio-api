import { Router } from "express";
import { createUserProfile, deleteProfile, getUserProfiles, updateProfile } from "../controllers/profile_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userProfileRouter = Router();

userProfileRouter.get('/userProfile', getUserProfiles);

// userProfileRouter.get('/userprofile', addUserProfile);

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
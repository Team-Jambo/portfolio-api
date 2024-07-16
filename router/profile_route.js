import { Router } from "express";
import { createUserProfile, deleteProfile, getUserProfile, updateUserProfile } from "../controllers/profile_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userProfileRouter = Router();

// userProfileRouter.get('/userProfile', getUserProfiles);

// userProfileRouter.get('/userprofile', creaUserProfile);

// userProfileRouter.patch('/userprofile', updateProfile);

userProfileRouter.delete('/userprofile', deleteProfile);

userProfileRouter.get( "/users/userProfile", checkUserSession, getUserProfile);


userProfileRouter.post( '/userProfile', remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    createUserProfile
  );

  userProfileRouter.patch(
    "/users/userProfile/:id",
    remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    updateUserProfile
  );


export default userProfileRouter;
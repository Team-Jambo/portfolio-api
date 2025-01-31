import { Router } from "express";
import { postuserProfile, deleteProfile, getUserProfile, updateProfile } from "../controllers/profile_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userProfileRouter = Router();

// userProfileRouter.get('/userProfile', getUserProfiles);

// userProfileRouter.get('/userprofile', addUserProfile);

// userProfileRouter.patch('/userprofile', updateProfile);

userProfileRouter.delete('/userprofile', deleteProfile);

userProfileRouter.get( "/users/userProfile", checkUserSession, getUserProfile);


userProfileRouter.post( '/userProfile',checkUserSession, remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    postuserProfile
  );

  userProfileRouter.patch(
    "/users/userProfile/userProfileId",
    remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    updateProfile
  );



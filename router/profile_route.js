import { Router } from "express";
import { createUserProfile, deleteUserProfile, getAllUserProfiles, getUserProfile, updateUserProfile } from "../controller/userprofile_controller.js";
import { checkUserSession } from "../middleware/auth.js";
import { remoteUpload } from "../middleware/uploads.js";

export const userProfileRouter = Router();

userProfileRouter.get('/userProfile', getAllUserProfiles);

userProfileRouter.get('/userprofile', getUserProfile);

userProfileRouter.patch('/userprofile', updateUserProfile);

userProfileRouter.delete('/userprofile', deleteUserProfile);


userProfileRouter.post( '/userProfile', remoteUpload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ]),
    checkUserSession,
    createUserProfile
  );


export default userProfileRouter;

import { getUser, getUsers, login, signup } from "../controllers/user_controller.js";
import { Router } from "express";
// import { createUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfile_controller.js";
// import { checkUserSession } from "../middlewares/auth.js";
// import { remoteUpload } from "../middlewares/uploads.js";

export const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.post("/users/auth/login", login);

userRouter.post("/users/auth/token", login);


userRouter.post("/users/auth/signup", signup);



userRouter.get("/users/auth/:userName", getUser);


// userRouter.get( "/users/userProfile", checkUserSession, getUserProfile);

// userRouter.post(
//   "/users/userProfile",
//   remoteUpload.fields([
//     { name: "profilePicture", maxCount: 1 },
//     { name: "resume", maxCount: 1 },
//   ]),
//   checkUserSession,
//   createUserProfile
// );


// userRouter.patch(
//     "/users/userProfile/:id",
//     remoteUpload.fields([
//       { name: "profilePicture", maxCount: 1 },
//       { name: "resume", maxCount: 1 },
//     ]),
//     checkUserSession,
//     updateUserProfile
//   );




// // import { Router } from "express";
// // import {signup, login, logout, getAllUsers, updateUser, deleteUser, getUser} from "../controller/user_controller.js";
// // import { checkUserSession } from "../middleware/auth.js";



// //  Create Router
// export const userRouter = Router();

// userRouter.get("/users", getAllUsers);

// userRouter.post("/signup", signup);

// userRouter.post("/login",  login);

// userRouter.patch('/user/auth/updateUser', updateUser);

// userRouter.delete('/user/auth/deleteUser', deleteUser);

// userRouter.post('/logout', checkUserSession, logout);

// userRouter.get("/users/auth/:userName",  getUser);






// Export Router to index.js
export default userRouter;
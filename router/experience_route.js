import { Router } from "express";
import { addExperience, deleteExperience, getExperiences, getExperience, updateExperience } from "../controllers/experience_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

// instantiate the router
export const experienceRouter = Router();

// define all possible routes to be used
experienceRouter.post("/users/experience", checkUserSession, addExperience);
experienceRouter.get("/users/experience", checkUserSession, getExperiences);
experienceRouter.get("/users/experience/:id", checkUserSession, getExperience);
experienceRouter.patch('/users/experience/:experienceId', checkUserSession, updateExperience)
experienceRouter.delete('/users/experience/:experienceId', checkUserSession, deleteExperience)
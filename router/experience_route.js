import { Router } from "express";
import { addExperience, deleteExperience, getExperiences, getOneWorkExperience, updateExperience } from "../controllers/experience_controller.js";

// instantiate the router
export const experienceRouter = Router();

// define all possible routes to be used
experienceRouter.post("/users/experience", addExperience);
experienceRouter.get("/experience", getExperiences);
experienceRouter.get("/users/experience/:id", getOneWorkExperience);
experienceRouter.patch('/users/experience/:experienceId', updateExperience)
experienceRouter.delete('/users/experience/:experienceId', deleteExperience)
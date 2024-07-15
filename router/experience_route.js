import { Router } from "express";
import { addExperience, getExperiences, getOneWorkExperience } from "../controller/workexperience_controller.js";

// instantiate the router
export const experienceRouter = Router();

// define all possible routes to be used
experienceRouter.post("/experience", addExperience);
experienceRouter.get("/experience", getExperiences);
experienceRouter.get("/experience/:id", getOneWorkExperience);
experienceRouter.patch('/experience/:experienceId',updateExperience)
experienceRouter.delete('/experience/:experienceId',deleteExperience)
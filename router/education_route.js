import { Router } from "express";
import { addEducation, deleteEducation, getAllEducation, getOneEducation, updateEducation } from "../controllers/education_controller";

//  instantiate
export const educationRouter = Router();

//  define routes for education
educationRouter.post('/users/education', addEducation)
educationRouter.get('/users/education', getAllEducation)
educationRouter.get('/users/education/:id', getOneEducation)
educationRouter.patch('/users/education/:educationId', updateEducation);
educationRouter.delete('/users/education/:educationId', deleteEducation);

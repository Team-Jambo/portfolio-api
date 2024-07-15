import { Router } from "express";
import { addEducation, deleteEducation, getAllEducation, getOneEducation, updateEducation } from "../controller/usereducation_controller";

//  instantiate
export const educationRouter = Router();

//  define routes for education
educationRouter.post('/education', addEducation)
educationRouter.get('/education', getAllEducation)
educationRouter.get('/education/:id', getOneEducation)
educationRouter.patch('/education/:educationId', updateEducation);
educationRouter.delete('/education/:educationId', deleteEducation);

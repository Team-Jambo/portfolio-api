import { Router } from "express";
import { addEducation, deleteEducation, getAllEducation, getOneEducation, updateEducation } from "../controllers/education_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

//  instantiate
export const educationRouter = Router();

//  define routes for education
educationRouter.post('/users/education',checkUserSession, addEducation)
educationRouter.get('/users/education',checkUserSession, getAllEducation)
educationRouter.get('/users/education/:id',checkUserSession, getOneEducation)
educationRouter.patch('/users/education/:educationId',checkUserSession, updateEducation);
educationRouter.delete('/users/education/:educationId',checkUserSession, deleteEducation);

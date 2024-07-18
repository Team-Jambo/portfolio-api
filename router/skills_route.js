import { Router } from "express";
import { deleteSkills, getSkill, getSkills, patchSkills, postSkills } from "../controllers/skills_controller.js";
import { checkUserSession } from "../middlewares/auth.js";


export const skillsRouter =Router();

skillsRouter.get('/users/skills',getSkills);

skillsRouter.get('/users/skills/:id', getSkill);

skillsRouter.post('/users/skills',checkUserSession, postSkills);

skillsRouter.patch('/users/skills/:id',checkUserSession, patchSkills);

skillsRouter.delete('/users/skills/:id',checkUserSession, deleteSkills);


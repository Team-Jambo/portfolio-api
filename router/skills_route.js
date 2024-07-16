import { Router } from "express";
import { deleteSkills, getSkill, getSkills, patchSkills, postSkills } from "../controllers/skills_controller.js";
import { checkUserSession } from "../middlewares/auth.js";


export const skillsRouter =Router();

skillsRouter.get('/skills',getSkills);

skillsRouter.get('/skills/:id', getSkill);

skillsRouter.post('/skills',checkUserSession, postSkills);

skillsRouter.patch('/skills/:id',checkUserSession, patchSkills);

skillsRouter.delete('/skills/:id',checkUserSession, deleteSkills);


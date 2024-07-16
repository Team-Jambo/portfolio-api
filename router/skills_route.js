import { Router } from "express";
import { deleteSkills, getSkill, getSkills, patchSkills, postSkills } from "../controller/skill_controller.js";
import { checkUserSession } from "../middleware/auth.js";


const skillsRouter =Router();

skillsRouter.get('/skills',getSkills);

skillsRouter.get('/skills/:id', getSkill);

skillsRouter.post('/skills',checkUserSession, postSkills);

skillsRouter.patch('/skills/:id',checkUserSession, patchSkills);

skillsRouter.delete('/skills/:id',checkUserSession, deleteSkills);

export default skillsRouter;
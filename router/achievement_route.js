import {Router} from "express";
import { deleteAchievements, getAchievement, getAchievements, patchAchievements, postAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import {remoteUpload} from "../middlewares/uploads.js"


export const achievementRouter = Router();


achievementRouter.get('/users/achievements', getAchievements);

achievementRouter.get('/users/achievements/:id', getAchievement);

achievementRouter.post('/users/achievements', checkUserSession, remoteUpload.single('image'), postAchievement);

achievementRouter.patch('/users/achievements/:id',checkUserSession, remoteUpload.single('image'), patchAchievements);

achievementRouter.delete('/users/achievements/:id',checkUserSession, deleteAchievements);


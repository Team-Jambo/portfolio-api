import {Router} from "express";
import { deleteAchievements, getAchievement, getAchievements, patchAchievements, postAchievement } from "../controllers/achievement_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import {remoteUpload} from "../middlewares/uploads.js"


export const achievementRouter = Router();


achievementRouter.get('/achievements', getAchievements);

achievementRouter.get('/achievements/:id', getAchievement);

achievementRouter.post('/achievements', checkUserSession, remoteUpload.single('image'), postAchievement);

achievementRouter.patch('/achievements/:id',checkUserSession, remoteUpload.single('image'), patchAchievements);

achievementRouter.delete('/achievements/:id',checkUserSession, deleteAchievements);


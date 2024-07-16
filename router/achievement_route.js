import {Router} from "express";
import { deleteAchievements, getAchievement, getAchievements, patchAchievements, postAchievement } from "../controller/achievement_controller.js";
import { checkUserSession } from "../middleware/auth.js";


const achievementRouter = Router();


achievementRouter.get('/achievements', getAchievements);

achievementRouter.get('/achievements/:id', getAchievement);

achievementRouter.post('/achievements', checkUserSession, remoteUpload.single('image'), postAchievement);

achievementRouter.patch('/achievements/:id',checkUserSession, remoteUpload.single('image'), patchAchievements);

achievementRouter.delete('/achievements/:id',checkUserSession, deleteAchievements);


export default achievementRouter;
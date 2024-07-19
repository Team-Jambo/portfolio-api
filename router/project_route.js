import { Router } from "express";
import { deleteProject, getAllProjects, getOneProject, postProject, updateProject } from "../controllers/project_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

// instantiate the router
export const projectRouter = Router();

// define all possible routes to be used
projectRouter.post( '/users/projects', checkUserSession, remoteUpload.single('image'), postProject);

projectRouter.get("/users/projects", getAllProjects);
projectRouter.get("/users/projects/projectId", getOneProject);

projectRouter.patch(
    "/users/projects/projectId",
    remoteUpload.single('image'),
    checkUserSession,
    updateProject
  );

projectRouter.delete('/users/projects/:projectId', deleteProject)
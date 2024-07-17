import { Router } from "express";
import { deleteProject, getAllProjects, getOneProject, postProject, updateProject } from "../controllers/project_controller.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

// instantiate the router
export const projectRouter = Router();

// define all possible routes to be used
projectRouter.post( '/users/projects', remoteUpload.fields([
    { name: "image", maxCount: 1 },
  ]),
  checkUserSession,
  postProject
);

projectRouter.get("/users/projects", getAllProjects);
projectRouter.get("/users/projects/projectId", getOneProject);

projectRouter.patch(
    "/users/projects/projectId",
    remoteUpload.fields([
      { name: "image", maxCount: 1 },
    ]),
    checkUserSession,
    updateProject
  );

projectRouter.delete('/users/project/:projectId', deleteProject)
import { Router } from "express";
import { deleteProject, getAllProjects, getOneProject, postProject, updateProject } from "../controller/userproject_controller.js";

// instantiate the router
export const projectRouter = Router();

// define all possible routes to be used
projectRouter.post("/projects", postProject);
projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/:id", getOneProject);
projectRouter.patch('/project/:projectId', updateProject)
projectRouter.delete('/project/:projectId', deleteProject)
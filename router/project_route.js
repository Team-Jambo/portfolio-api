import { Router } from "express";
import { deleteProject, getAllProjects, getOneProject, postProject, updateProject } from "../controllers/project_controller.js";

// instantiate the router
export const projectRouter = Router();

// define all possible routes to be used
projectRouter.post("/users/projects", postProject);
projectRouter.get("/users/projects", getAllProjects);
projectRouter.get("/users/projects/:id", getOneProject);
projectRouter.patch('/users/project/:projectId', updateProject)
projectRouter.delete('/users/project/:projectId', deleteProject)
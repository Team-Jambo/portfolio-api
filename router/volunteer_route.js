import { Router } from "express";
import { getAllVolunteers, getOneVolunteer, postVolunteer } from "../controllers/volunteer_controller.js";
import { deleteVolunteer, updateVolunteer } from "../controllers/volunteer_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

// instantiate the router
export const volunteerRouter = Router();

// define all possible routes to be used
volunteerRouter.post("/users/volunteering",checkUserSession, postVolunteer);
volunteerRouter.get("/users/volunteering",checkUserSession, getAllVolunteers);
volunteerRouter.get("/users/volunteering/:volunteerId",checkUserSession, getOneVolunteer);
volunteerRouter.patch('/users/volunteering/:volunteerId',checkUserSession, updateVolunteer);
volunteerRouter.delete('/users/volunteering/:volunteerId',checkUserSession, deleteVolunteer);


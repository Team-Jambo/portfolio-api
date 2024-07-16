import { Router } from "express";
import { getAllVolunteers, getOneVolunteer, postVolunteer } from "../controllers/volunteer_controller.js";
import { deleteVolunteer, updateVolunteer } from "../controllers/volunteer_controller.js";

// instantiate the router
export const volunteerRouter = Router();

// define all possible routes to be used
volunteerRouter.post("/users/volunteering", postVolunteer);
volunteerRouter.get("/users/volunteering", getAllVolunteers);
volunteerRouter.get("/users/volunteering/:volunteerId", getOneVolunteer);
volunteerRouter.patch('/users/volunteering/:volunteerId', updateVolunteer);
volunteerRouter.delete('/users/volunteering/:volunteerId', deleteVolunteer);


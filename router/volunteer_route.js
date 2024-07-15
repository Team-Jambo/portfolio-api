import { Router } from "express";
import { getAllVolunteers, getOneVolunteer, postVolunteer } from "../controller/uservolunteer_controller.js";

// instantiate the router
export const volunteerRouter = Router();

// define all possible routes to be used
volunteerRouter.post("/volunteer", postVolunteer);
volunteerRouter.get("/volunteer", getAllVolunteers);
volunteerRouter.get("/volunteer/:volunteerId", getOneVolunteer);
volunteerRouter.patch('/volunteer/:volunteerId', updateVolunteer);
volunteerRouter.delete('/volunteer/:volunteerId', deleteVolunteer);


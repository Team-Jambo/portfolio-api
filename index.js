// import necessary modules
import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import expressOasGenerator from "@mickeymond/express-oas-generator";

//  instantiate express
const app = express();

//  for the swagger
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ["achievements", "user", "userProfile", "education", "experience", "volunteer", "skills", "project"],
    mongooseModels: mongoose.modelNames()
});

//  user generator
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect("/api-docs"));


// instantiate dbconnection
dbConnection();

const port = process.env.PORT || 3090;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
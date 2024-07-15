// import necessary modules
import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";

//  instantiate express
const app = express();

// instantiate dbconnection
dbConnection();

const port = process.env.PORT || 3090;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
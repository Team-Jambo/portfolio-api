// import necessary modules
import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import MongoStore from "connect-mongo"
import userRouter from "./router/user_routes.js";
import session from "express-session";

//  instantiate express
const app = express();

// instantiate dbconnection
dbConnection();

app.use(express.json());

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      // Store session
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
      }),
    })
  );

app.use("/api/v1",userRouter);

const port = process.env.PORT || 3090;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
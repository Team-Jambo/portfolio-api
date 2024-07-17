// import necessary modules
import express from "express";
import { dbConnection } from "./config/db.js";
import MongoStore from "connect-mongo"
import userRouter from "./router/user_route.js";
import cors from "cors";
import session from "express-session";
import { experienceRouter } from "./router/experience_route.js";
import { projectRouter } from "./router/project_route.js";
import { educationRouter } from "./router/education_route.js";
import { volunteerRouter } from "./router/volunteer_route.js";
import { skillsRouter } from "./router/skills_route.js";
import { achievementRouter } from "./router/achievement_route.js";
import userProfileRouter from "./router/profile_route.js";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import { restartServer } from "./restart_server.js";
import mongoose from "mongoose";



//  instantiate express
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3090' }));

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP" });
});


//  for the swagger ui
expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: true,
  tags: ["achievements", "user", "userProfile", "education", "experience", "volunteer", "skills", "project"],
  mongooseModels: mongoose.modelNames()
});


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

app.use("/api/v1", userRouter);
app.use("/api/v1", experienceRouter);
app.use("/api/v1", volunteerRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", skillsRouter);
app.use("/api/v1", educationRouter);
app.use("/api/v1", userProfileRouter);
app.use("/api/v1", achievementRouter);

//  use generator
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect("/api-docs"));

const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL)
};



// const PORT = process.env.PORT || 3090;

// app.listen(port, () => {
//     console.log(`App is listening on port ${port}`);
// });

dbConnection()
  .then(() => {
    const PORT = 3090
    app.listen(PORT, () => {
      reboot().then(() => {
        console.log(`Server Restarted`);
      });
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });
//  import mongoose and dotenv modules
import mongoose from "mongoose";
import "dotenv/config";


// create database

const Uri = process.env.MONGO_URL;

export const dbConnection = async () => {
    try {
        await mongoose.connect(Uri);
        console.log("Database is connected!");
    } catch (error) {
        console.log(error);
    }
};
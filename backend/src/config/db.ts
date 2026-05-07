import mongoose from "mongoose"; 
import { config } from "./env";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodbUri!);
        console.log("Connected to MongoDB: ", config.mongodbUri);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
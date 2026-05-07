import express from "express"; 
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import notesRouter from "./routes/notesRoutes";
import aiRouter from "./routes/aiRoutes";
import healthRouter from "./routes/healthRoutes";
import { globalErrorHandler } from "./middleware/errorHandler";

export const createApp = () => {
    const app = express(); 



    // --- Middleware -------------------------------------
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }));
    app.use((req, res, next) => {
        console.log(`${req.method} -----${req.path}`);
        next();
    });



    // --- Routes ---------------------------------------
     app.use('/api/v1/auth', authRouter); 
     app.use('/api/v1/notes', notesRouter);
     app.use('/api/v1/ai', aiRouter); 
     app.use('/api/v1/', healthRouter);
    


    // --- Handle Errors --------------------------------
    app.use(globalErrorHandler);


    return app; 
}
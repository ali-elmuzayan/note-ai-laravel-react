import dotenv from "dotenv";
dotenv.config();


export const config = {
    port: process.env.PORT, 
    nodeEnv: process.env.NODE_ENV,
    

    // JWT 
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    

    // Database 
    mongodbUri: process.env.MONGODB_URI,
    

    // clerk 
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
    
}
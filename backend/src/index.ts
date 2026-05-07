import { connectDB } from "./config/db";




async function startServer() {
    // connection DB 
    await connectDB(); 


    // create the app 
}

startServer(); 
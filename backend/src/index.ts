import { createApp } from "./app";
import { connectDB } from "./config/db";
import { config } from "./config/env";




async function startServer() {
    try {
    // connection DB 
    await connectDB(); 


    // create the app 
    const app = createApp(); 

    // Listen on the server 
     app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);

    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 
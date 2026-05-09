import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,

  // JWT
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN!,

  // Database
  sqlitePath: process.env.SQLITE_PATH!,

  // clerk
  clerk: {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  },

  // Openai
  openai: {
    apiKey: process.env.OpENAI_API_KEY || "",
  },
};

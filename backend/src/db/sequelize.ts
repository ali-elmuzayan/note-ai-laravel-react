import { Sequelize } from "sequelize";
import { config } from "../config/env";
import path from "path";
import fs from "fs";

// --- Ensure data directory exist ------------------------------------------
const dataDir = path.dirname(config.sqlitePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// --- Create Sequelize instance ---------------------------------------------
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: config.sqlitePath,
  logging: config.nodeEnv === "development" ? console.log : false,
});

// --- Initialize database connection and sync models in development ---------
export async function initializeDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Sync models in development (create tables if they don't exist)
    if (config.nodeEnv === "development") {
      await sequelize.sync({ alter: true });
      console.log("Database models synchronized");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

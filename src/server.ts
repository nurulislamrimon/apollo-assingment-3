// external imports
import mongoose from "mongoose";
// internal imports
import app from "./app";
import config from "./config/env_config";

const boostrap = async () => {
  try {
    await mongoose.connect(config.db_local as string);
    console.log("Database connection successful!");

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

boostrap();

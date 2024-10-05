import mongoose from "mongoose";
import ENV from "./env-config.js";

const mongodbConnect = async () => {
  await mongoose
    .connect(ENV.MONGODB_URI, {
      dbName: ENV.MONGODB_DBNAME,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err.message);
      process.exit(1);
    });
};

export default mongodbConnect;

import dotenv from "dotenv";
dotenv.config();

const ENV = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DBNAME: process.env.MONGODB_DBNAME,

  // CLOUDINARY
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER_NAME: process.env.CLOUDINARY_FOLDER_NAME,
};

export default ENV;

import { v2 as cloudinary } from "cloudinary";
import ENV from "./env-config.js";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function cloudinary_uploadImageFile(file) {
  const b64 = Buffer.from(file.buffer).toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;

  const fileUri = await cloudinary.uploader.upload(dataURI, {
    folder: ENV.CLOUDINARY_FOLDER_NAME,
  });

  return fileUri;
}

export async function cloudinary_deleteFile(fileUrl) {
  const public_id = fileUrl?.split("/")?.pop()?.split(".")?.[0];

  const url = await cloudinary.uploader.destroy(
    `${ENV.CLOUDINARY_FOLDER_NAME}/` + public_id
  );
  return url;
}

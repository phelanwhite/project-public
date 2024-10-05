import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10000 * 1024 * 1024, // 10GB
  },
});

export default upload;

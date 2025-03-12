import multer, { memoryStorage } from "multer";

export const uploadHandler = multer({
  storage: memoryStorage(),
  limits: {
    fileSize: 512 * 1024,
  },
});

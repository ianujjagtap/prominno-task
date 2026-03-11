import multer from "multer";
import path from "path";
import { messages } from "@/constants/index.js";

const upload = multer({
  dest: "uploads/brands",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(messages.BAD_FILE_TYPE));
    }
  },
});

export default upload.array("brandImages", 10);

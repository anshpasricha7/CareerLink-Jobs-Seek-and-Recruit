// uploadFile.js
import multer from "multer";
import path from "path";

// Configure storage
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // better to keep files in a subfolder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = "upload_" + Date.now() + ext;
    cb(null, uniqueName);
  }
});

// File filter to accept only images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|pdf/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF files are allowed"));
  }
};

export const uploadFile = multer({
  storage: storageConfig,
  fileFilter: fileFilter
});

// import { diskStorage } from "multer";
// import { extname } from "path";

// const allowedFileTypes = [".mp3", ".mp4", ".png", ".jpeg", ".jpg", ".mov"];
// export const MulterConfig = {
//   storage: diskStorage({
//     destination: "./uploads",
//     filename: (req, file, cb) => {
//       console.log("file===========>", file);
//       cb(null, file.originalname?.replace(/ /g, "_"));
//     },
//   }),
//   fileFilter: (req, file, callback) => {
//     const ext = extname(file.originalname).toLowerCase();
//     if (allowedFileTypes.includes(ext)) {
//       callback(null, true);
//     } else {
//       const error = new Error("Only MP3 and MP4 files are allowed!");
//       error.name = "FileTypeError";
//       callback(error, false);
//     }
//   },
//   limits: {
//     fileSize: 50 * 1024 * 1024, //50 MB
//   },
// };

import { Request } from "express";
import { memoryStorage } from "multer";
import { extname } from "path";

const allowedFileTypes = [".mp3", ".mp4", ".png", ".jpeg", ".jpg", ".mov"];
export const MulterConfig = {
  storage: memoryStorage(),
  fileFilter: (_req: Request, file: { originalname: string; }, callback: (arg0: Error, arg1: boolean) => void) => {
    const ext = extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(ext)) {
      callback(null, true);
    } else {
      const error = new Error("only images and videos are allowed! with extensions: .mp3, .mp4, .png, .jpeg, .jpg, .mov");
      error.name = "FileTypeError";
      callback(error, false);
    }
  },
};

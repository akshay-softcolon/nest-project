import { diskStorage } from "multer";
import { extname } from "path";

const allowedFileTypes = [".mp3", ".mp4", ".png", ".jpeg", ".jpg", ".mov"];
export const MulterConfig = {
  storage: diskStorage({
    destination: "./uploads/public",
    filename: (req, file: Express.Multer.File, cb) => {
      // console.log("file===========>", file);
      cb(null, file.originalname?.replace(/ /g, "_"));
    },
  }),

  fileFilter: (req, file: Express.Multer.File, callback) => {
    // console.log("file===========> 2334", file);
    
    const ext = extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(ext)) {
      callback(null, true);
    } else {
      const error = new Error("Only MP3 and MP4 files are allowed!");
      error.name = "FileTypeError";
      callback(error, false);
    }
  },
  
  limits: {
    fileSize: 50 * 1024 * 1024, //50 MB
  },
};

// import { memoryStorage } from "multer";

// // const allowedFileTypes = [".mp3", ".mp4", ".png", ".jpeg", ".jpg", ".mov"];
// export const MulterConfig = {
//   storage: memoryStorage(),
// };

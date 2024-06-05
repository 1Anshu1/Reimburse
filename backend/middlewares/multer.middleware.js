import multer from "multer";
import path from "path";
import CustomError from "../utils/customError.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1000000, // 1MB
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
            return cb(new CustomError(400, "only images are allowed"));
        }
        cb(null, true);
    },
});

export { uploadImage };

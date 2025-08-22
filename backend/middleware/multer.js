import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // Files uploads/ folder में save होंगी
    callback(null, path.join(process.cwd(),'./uploads'));
  },
  filename: function (req, file, callback) {
    // Unique name generate
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export default upload;

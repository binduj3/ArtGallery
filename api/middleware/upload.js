import multer from "multer";
import util from "util";
import path from "path";
import fs from "fs";
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// export const upload = multer({ storage: storage }).array("files", 10);

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);

    // const match = ["image/png", "image/jpeg"];

    // if (match.indexOf(file.mimetype) === -1) {
    //   var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
    //   return callback(message, null);
    // }

    // var filename = `${Date.now()}-bezkoder-${file.originalname}`;
    //callback(null, filename);
  },
});

var upload = multer({ storage: storage });
// const upload = util.promisify(uploadFiles);.array("files", 10);
export default upload;

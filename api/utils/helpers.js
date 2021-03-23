import ErrorResponse from "./errorResponse.js";
import {

  uploadFileToCloud,
} from "./googlecloud/googleCloud.js";

export const moveFile = async (file) => {
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`), 500);
    } else {
      console.log("t" + file.name);
      await uploadFileToCloud(file.name);
      return file.name;
    }
  });
};

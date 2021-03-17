import File from "../db/models/File.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "express-async-handler";
import { nanoid } from "nanoid";
import {
  deleteFileFromCloud,
  uploadFileToCloud,
} from "../utils/googlecloud/googleCloud.js";


//@desc Get all file details
//@route GET /api/v1/admin
//@access Private
export const getAllFiles = asyncHandler(async (req, res, next) => {
  const files = await File.find();

  res.status(200).json({ success: true, data: files });
});

//@desc Upload files
//@route POST /api/v1/admin
//@access Private
export const uploadFiles = asyncHandler(async (req, res, next) => {
  console.log("req" + req.body);
  const { year, description } = req.body;
  console.log(year, description, req.files.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorResponse("No files uploaded ", 400));
  }
  let newFileName = "";
  let storageUrl = "";
  let urls = [];
  //looks for root folder
  for (let file of req.files.files) {
    //+ nanoid();
    newFileName = file.name;
    await uploadFileToCloud(newFileName);

    storageUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${newFileName}`;
    urls = [...urls, storageUrl];
  }

  let createdFile = await File.create({ year, description, pic: urls });

  res.status(200).json({ success: true, data: createdFile });
});

//@desc Delete a file
//@route DELETE /api/v1/admin
//@access Private
export const deleteFile = asyncHandler(async (req, res, next) => {
  
  const file = await File.findById(req.params.id);
  const { fileName } = req.body;

  if (!file || !fileName) {
    return next(new ErrorResponse("File not found ,cannot delete ", 404));
  }
  await deleteFileFromCloud(fileName);

  //todo remove only file not whole record
  file.remove();
  res.send(200).json({ success: true, data: {} });
});

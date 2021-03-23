import Gallery from "../db/models/Gallery.js";
import Document from "../db/models/Document.js";

import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "express-async-handler";
import { nanoid } from "nanoid";

import { moveFile } from "../utils/helpers.js";
import fs from "fs";

import {
  deleteFileFromCloud,
  uploadFileToCloud,
} from "../utils/googlecloud/googleCloud.js";

//@desc Get all file details
//@route GET /api/v1/admin
//@access Private
export const getAllFiles = asyncHandler(async (req, res, next) => {
  const galleries = await Gallery.find().populate("documents");
  const documents = await Document.find().populate({
    path: "gallery",
    select: "year",
  });
  res.status(200).json({ success: true, data: documents, galleries });
});

//@desc Upload files
//@route POST /api/v1/admin
//@access Private
export const uploadFiles = asyncHandler(async (req, res, next) => {
  const { year, description } = req.body;
  //TODO: upload something needs to be fixed
  //Make sure files are present
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorResponse("No files uploaded ", 400));
  }

  let fileDocuments = [].concat(req.files.files);

  //Make sure the image is a photo
  for (let file of fileDocuments) {
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image file`), 400);
    }
  }

  let storageUrl = "";

  let galleryData = await Gallery.findOne({ year });
  if (!galleryData) {
    galleryData = await Gallery.create({ year });
  }

  let document = null;
  for (let file of fileDocuments) {
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload`), 500);
      } else {
        console.log("t" + file.name);

        await uploadFileToCloud(file.name);
        storageUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${file.name}`;

        document = await Document.create({
          description,
          storageUrl,
          gallery: galleryData._id,
        });

        fs.unlink(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
          if (err) {
            console.log(err);
            return next(new ErrorResponse(`Problem with file unlinking`), 500);
          }
        });
      }
    });
  }

  let documents = await Document.find({ gallery: galleryData._id });

  res.status(200).json({ success: true, data: documents });
});

//@desc Delete a file
//@route DELETE /api/v1/admin
//@access Private
export const deleteFile = asyncHandler(async (req, res, next) => {
  const file = await Document.findById(req.params.id);
  const { storageUrl } = req.body;

  if (!file || !storageUrl) {
    return next(new ErrorResponse("File not found cannot delete ", 404));
  }
  let filename = storageUrl.substring(storageUrl.lastIndexOf("/") + 1);

  await deleteFileFromCloud(filename);

  file.remove();
  res.status(200).json({ success: true, data: {} });
});

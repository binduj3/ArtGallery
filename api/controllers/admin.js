import Gallery from "../db/models/Gallery.js";
import Document from "../db/models/Document.js";

import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "express-async-handler";

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
  let fileDocuments = [].concat(req.files.files);
  let storageUrl = "";
  let documents = [];
  let document;

  //Make sure files are present
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorResponse("No files uploaded ", 400));
  }

  //Make sure the image is a photo
  for (let file of fileDocuments) {
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an image file`), 400);
    }
  }

  //TODO: check for duplicate documents

  let galleryData = await Gallery.findOne({ year });
  if (!galleryData) {
    galleryData = await Gallery.create({ year });
  }

  for (let file of fileDocuments) {
    storageUrl = await uploadFile(file);

    if (storageUrl) {
      document = await Document.create({
        description,
        storageUrl,
        gallery: galleryData._id,
      });
      documents.push(document);
    }
  }

  console.log("documents : " + documents);
  res.status(200).json({ success: true, data: documents });
});

const unLinkFile = async (file) => {
  try {
    fs.unlink(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file unlinking`), 500);
      }
    });
    console.log("unlinked file");
  } catch (error) {}
};

const uploadFile = async (file) => {
  let storageUrl = "";
  return new Promise((resolve, reject) => {
    //Copy file to upload folder
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        reject(`Problem with file upload`);
      } else {
        //Upload to cloud
        await uploadFileToCloud(file.name);

        //Remove file from upload folder
        await unLinkFile(file);

        storageUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${file.name}`;
        resolve(storageUrl);
      }
    });
  });
};

//@desc Delete a file
//@route DELETE /api/v1/admin/:id
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

//@desc Update a file
//@route PUT /api/v1/admin/:id
//@access Private
export const updateFile = asyncHandler(async (req, res, next) => {
  const { description } = req.body;
  console.log("desc" + description);
  const file = await Document.findById(req.params.id);

  if (!description) {
    return next(new ErrorResponse("Pls enter description ", 404));
  }

  if (!file) {
    return next(new ErrorResponse("File not found cannot update ", 404));
  }

  let document = await Document.findByIdAndUpdate(
    req.params.id,
    { description },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, data: document });
});

//@desc Login
//@route POST /api/v1/admin/login
//@access Private
export const login = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});

import Gallery from "../db/models/Gallery.js";

import asyncHandler from "express-async-handler";

//@desc Get all file details
//@route GET /api/v1/client
//@access Private

export const getDocuments = asyncHandler(async (req, res, next) => {
  const documents = await Gallery.find().populate("documents");

  res.status(200).json({ success: true, data: documents });
});

import express from "express";
import {
  getAllFiles,
  uploadFiles,
  deleteFile,
  updateFile,
} from "../controllers/admin.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();
// router.route("/").get(protect, getAllFiles).post(uploadFiles);

router.route("/").get(getAllFiles).post(uploadFiles);

router.route("/:id").delete(deleteFile).put(updateFile);

export default router;

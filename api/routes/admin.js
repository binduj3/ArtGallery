import express from "express";
import {
  getAllFiles,
  uploadFiles,
  deleteFile,
  updateFile,
  login,
} from "../controllers/admin.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getAllFiles).post(uploadFiles);

router.route("/:id").delete(deleteFile).put(updateFile);

router.route("/login").post(login);

export default router;

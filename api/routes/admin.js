import express from "express";
import { getAllFiles, uploadFiles, deleteFile } from "../controllers/admin.js";

const router = express.Router();

router.route("/").get(getAllFiles).post(uploadFiles);

router.route("/:id").delete(deleteFile);

export default router;

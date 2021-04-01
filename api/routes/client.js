import express from "express";
import { getDocuments } from "../controllers/client.js";

const router = express.Router();

router.route("/").get(getDocuments);

export default router;

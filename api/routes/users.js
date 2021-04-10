import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
} from "../controllers/users.js";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).delete(deleteUser);

export default router;

import User from "../db/models/User.js";
import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/errorResponse.js";

//@desc Get all users
//@route GET /api/v1/users
//@access Private
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  console.log("all user: " + users);
  if (!users) {
    return next(new ErrorResponse("User Not found", 400));
  }
  res.status(200).json({ success: true, count: users.length, data: users });
});

//@desc Get a user details
//@route GET /api/v1/users/:id
//@access Private
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log("single user: " + user);
  if (!user) {
    return next(new ErrorResponse("User not found", 400));
  }
  res.status(200).json({ success: true, data: user });
});

//@desc Create a user
//@route POST /api/v1/users
//@access Private
export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({ success: true, data: user });
});

//@desc Delete a user
//@route DELETE /api/v1/users/:id
//@access Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 400));
  }

  user.remove();

  res.status(200).json({ success: true, data: {} });
});

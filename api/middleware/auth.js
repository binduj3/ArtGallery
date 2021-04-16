import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../db/models/User.js";

//Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (!req.header("x-auth-token") && !req.cookies.token) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // )
  if (req.header("x-auth-token")) {
    //set token from bearer token
    // token = req.headers.authorization.split(" ")[1];
    token = req.header("x-auth-token");
    //set token from cookie
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  //Make sure token exists
  if (!token || token === undefined) {
    return next(new ErrorResponse(`Not authorized to access this route`, 401));
  }
  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {}
});

//Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} Not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

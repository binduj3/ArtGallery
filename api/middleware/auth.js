import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email & password ", 400));
  }

  if (
    email !== `${process.env.EMAIL}` &&
    password !== `${process.env.PASSWORD}`
  ) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  next();
});

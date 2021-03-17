import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./db/db.js";
import errorHandler from "./middleware/error.js";
import fileUpload from "express-fileupload";

//Route files
import admin from "./routes/admin.js";

//Load env variables
dotenv.config();

//Connect to Db
connectDB();

const app = express();

//Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 5000;

//File Upload
app.use(fileUpload());

//Mount routers
app.use("/api/v1/admin", admin);

app.get("/", (req, res) => {
  res.status(400).send({ success: true });
});

//error handling middleware
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
      .yellow.bold
  )
);

//Handle unhandle promise rejections
process.on("unhandleRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);
  //close server & exit process
  server.close(() => process.exit(1));
});

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./db/db.js";
import errorHandler from "./middleware/error.js";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";
import forceSecure from "force-secure-express";

//Route files
import admin from "./routes/admin.js";
import client from "./routes/client.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";

//Load env variables
dotenv.config();

//Connect to Db
connectDB();

const app = express();

//Body parser
app.use(express.json());
app.use(cors());
app.use(
  forceSecure(["reshmikagallery.herokuapp.com", "client-gallery.herokuapp.com"])
);
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 5000;

//File Upload
app.use(fileUpload());

//Set Static Folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

console.log("dirname" + __dirname);

//Mount routers
app.use("/api/v1/admin", admin);
app.use("/api/v1/client", client);
app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);

// app.get("/", (req, res) => {
//   res.status(400).send({ success: true });
// });

// Set folder paths for production deployment
if (process.env.NODE_ENV === "production") {
  // Admin App
  if (process.env.APP === "admin") {
    app.use(express.static(path.join(__dirname, "./front-admin/build")));
    app.get("*", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "front-admin", "build", "index.html")
      )
    );
  } else if (process.env.APP === "client") {
    app.use(express.static(path.join(__dirname, "./front-client/build")));
    app.get("*", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "front-client", "build", "index.html")
      )
    );
  }
}

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

import { Storage } from "@google-cloud/storage";
import path from "path";

const __dirname = path.resolve();
console.log(__dirname);
const storage = new Storage({
  projectId: "global-song-306717",
  keyFilename: `${__dirname}/api/utils/googlecloud/global-song-306717-2a063aae50c9.json`,
});


export const uploadFileToCloud = async (filename) => {
  console.log("bucketname : " + process.env.BUCKET_NAME);

  const res = await storage
    .bucket(process.env.BUCKET_NAME)
    .upload(process.env.FILE_UPLOAD_PATH + "/" + filename);
  // `mediaLink` is the URL for the raw contents of the file.
  const url = res[0].metadata.mediaLink;

  // Need to make the file public before you can access it.
  await storage.bucket(process.env.BUCKET_NAME).file(filename).makePublic();

  // Make a request to the uploaded URL.
  //   const axios = require("axios");
  //   const pkg = await axios.get(url).then((res) => res.data);
  console.log("Uploaded : " + url);
};

export const deleteFileFromCloud = async (fileName) => {
  try {
    await storage.bucket(process.env.BUCKET_NAME).file(fileName).delete();
  } catch (error) {
    console.log(error);
  }
};

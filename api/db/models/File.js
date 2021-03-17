import mongoose from "mongoose";

const FileSchema = mongoose.Schema({
  description: { type: String, required: [true, "Please add a description"] },
  year: { type: String },
  pic: [String],
});

export default mongoose.model("File", FileSchema);

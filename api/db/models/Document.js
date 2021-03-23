import mongoose from "mongoose";

const DocumentSchema = mongoose.Schema({
  description: { type: String, required: [true, "Please add a description"] },
  storageUrl: String,
  gallery: { type: mongoose.Schema.ObjectId, ref: "Gallery", required: true },
});

export default mongoose.model("Document", DocumentSchema);

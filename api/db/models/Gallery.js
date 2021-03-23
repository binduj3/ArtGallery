import mongoose from "mongoose";

const GallerySchema = mongoose.Schema({
  year: { type: String, required: [true, "Please enter year"], unique: true },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

//Reverse populate with virtuals
GallerySchema.virtual("documents", {
  ref: "Document",
  localField: "_id",
  foreignField: "gallery",
  justOne: false,
});

export default mongoose.model("Gallery", GallerySchema);

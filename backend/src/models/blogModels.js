import mongoose from "mongoose";

const { Schema } = mongoose;

// Schema blueprint
const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
  },

  { timestamps: true } // ✅ correct spelling
);

// Create the model / collection
const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;

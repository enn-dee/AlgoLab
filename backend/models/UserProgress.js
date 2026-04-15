import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  algorithmSlug: String,

  completedSections: [String] // ["linear-search"]
});

export default mongoose.model("UserProgress", userProgressSchema);
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  algorithm: String,

  code: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  feedback: String
});

export default mongoose.model("Submission", submissionSchema);
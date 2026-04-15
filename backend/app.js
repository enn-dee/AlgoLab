import express from "express";
import cors from "cors";

import algorithmRoutes from "./routes/algorithm.js";
import authRoutes from "./routes/auth.js";
import submissionRoutes from "./routes/submissions.js";
import assignmentRoutes from "./routes/assignments.js";
import connectDB from "./config/db.js";
import progressRoute from "./routes/progress.js"

const app = express();

app.use(cors());
app.use(express.json());


connectDB()

app.use("/api/algorithms", algorithmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/progress", progressRoute)
app.listen(3000, () => {
  console.log("Server running on 3000");
});
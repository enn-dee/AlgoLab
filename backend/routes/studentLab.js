import express from "express";
import Lab from "../models/Lab.js";
import Enrollment from "../models/Enrollment.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// GET LABS WHERE STUDENT IS ENROLLED
router.get("/labs", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;
    const enrollmentLabIds = (await Enrollment.find({ studentId, status: "active" }).select("labId")).map((item) => item.labId);
    const labs = await Lab.find({
      $or: [
        { kind: "academic", status: "current" },
        { students: studentId },
        { _id: { $in: enrollmentLabIds } },
      ],
    }).populate("teacherId", "fullName email");
    res.json(labs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

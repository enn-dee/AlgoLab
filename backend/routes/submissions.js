import express from "express";
import Submission from "../models/Submission.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// SUBMIT
router.post("/", authMiddleware, async (req, res) => {
  const { algorithm, code } = req.body;

  const sub = await Submission.create({
    studentId: req.user.id,
    algorithm,
    code
  });

  res.json(sub);
});

// ADMIN VIEW
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  const subs = await Submission.find().populate("studentId");
  res.json(subs);
});

// REVIEW
router.patch("/:id", authMiddleware, adminOnly, async (req, res) => {
  const { status, feedback } = req.body;

  const sub = await Submission.findByIdAndUpdate(
    req.params.id,
    { status, feedback },
    { new: true }
  );

  res.json(sub);
});

export default router;
import express from "express";
import Lab from "../models/Lab.js";
import LabTeacherAssignment from "../models/LabTeacherAssignment.js";
import { authMiddleware } from "../middleware/auth.js";
import { requireRoles } from "../middleware/roles.js";
import { loadLab, requireLabAccess } from "../middleware/labAccess.js";
import AuditLog from "../models/AuditLog.js";
import { recordAudit } from "../utils/audit.js";

const router = express.Router();
const labFields = ["name", "subjectCode", "session", "deadline", "status", "rules"];
const pickLabFields = (body) => Object.fromEntries(labFields
  .filter((field) => body[field] !== undefined)
  .map((field) => [field, body[field]]));

// Teachers own private labs. Academic labs are created and allocated by admins.
router.post("/private", authMiddleware, requireRoles("teacher"), async (req, res, next) => {
  try {
    const { name, subjectCode, session } = req.body;
    if (!name || !subjectCode || !session) {
      return res.status(400).json({ error: "name, subjectCode and session are required" });
    }
    const lab = await Lab.create({
      ...pickLabFields(req.body),
      name,
      subjectCode,
      session,
      kind: "private",
      teacherId: req.user.id,
      ownerTeacherId: req.user.id,
    });
    await recordAudit({ req, labId: lab._id, entityType: "lab", entityId: lab._id, action: "created", after: lab.toObject() });
    res.status(201).json(lab);
  } catch (error) {
    next(error);
  }
});

// Backwards-compatible alias: a teacher-created lab is private.
router.post("/", authMiddleware, requireRoles("teacher"), async (req, res, next) => {
  try {
    const { name, subjectCode, session } = req.body;
    if (!name || !subjectCode || !session) return res.status(400).json({ error: "name, subjectCode and session are required" });
    const lab = await Lab.create({ ...pickLabFields(req.body), name, subjectCode, session, kind: "private", teacherId: req.user.id, ownerTeacherId: req.user.id });
    await recordAudit({ req, labId: lab._id, entityType: "lab", entityId: lab._id, action: "created", after: lab.toObject() });
    res.status(201).json(lab);
  } catch (error) {
    next(error);
  }
});

router.get("/", authMiddleware, requireRoles("teacher"), async (req, res, next) => {
  try {
    const assigned = await LabTeacherAssignment.find({ teacherId: req.user.id, active: true }).select("labId");
    const assignedIds = assigned.map((item) => item.labId);
    const labs = await Lab.find({
      $or: [
        { ownerTeacherId: req.user.id },
        { teacherId: req.user.id }, // legacy labs
        { _id: { $in: assignedIds } },
        { kind: "academic" },
      ],
    }).populate("students", "fullName rollNumber");
    res.json(labs);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authMiddleware, loadLab, requireLabAccess("view"), async (req, res, next) => {
  try {
    const lab = await Lab.findById(req.lab._id)
      .populate("students", "fullName rollNumber")
      .populate("batches.students", "fullName rollNumber");
    res.json(lab);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, loadLab, requireLabAccess("manage"), async (req, res, next) => {
  try {
    const before = req.lab.toObject();
    const lab = await Lab.findByIdAndUpdate(req.lab._id, pickLabFields(req.body), { new: true, runValidators: true });
    await recordAudit({ req, labId: lab._id, entityType: "lab", entityId: lab._id, action: "updated", before, after: lab.toObject() });
    res.json(lab);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/status", authMiddleware, loadLab, requireLabAccess("manage"), async (req, res, next) => {
  try {
    const before = req.lab.toObject();
    const lab = await Lab.findByIdAndUpdate(req.lab._id, { status: req.body.status }, { new: true, runValidators: true });
    await recordAudit({ req, labId: lab._id, entityType: "lab", entityId: lab._id, action: "updated", before, after: lab.toObject() });
    res.json(lab);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/deadline", authMiddleware, loadLab, requireLabAccess("manage"), async (req, res, next) => {
  try {
    const deadline = req.body.deadline ? new Date(req.body.deadline) : null;
    if (deadline && Number.isNaN(deadline.getTime())) return res.status(400).json({ error: "Invalid deadline" });
    const before = req.lab.toObject();
    const lab = await Lab.findByIdAndUpdate(req.lab._id, { deadline }, { new: true });
    await recordAudit({ req, labId: lab._id, entityType: "lab", entityId: lab._id, action: "updated", before, after: lab.toObject() });
    res.json(lab);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, loadLab, requireLabAccess("manage"), async (req, res, next) => {
  try {
    await Lab.findByIdAndDelete(req.lab._id);
    await recordAudit({ req, labId: req.lab._id, entityType: "lab", entityId: req.lab._id, action: "deleted", before: req.lab.toObject() });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/:id/history", authMiddleware, loadLab, requireLabAccess("manage"), async (req, res, next) => {
  try {
    const history = await AuditLog.find({ labId: req.lab._id }).sort({ createdAt: -1 }).limit(200);
    res.json(history);
  } catch (error) { next(error); }
});

export default router;

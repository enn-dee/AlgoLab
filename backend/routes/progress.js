import express from "express";
import UserProgress from "../models/UserProgress.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

/**
 * ✅ Create / Update progress (safe)
 * - userId comes ONLY from JWT
 */
router.post("/progress", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { algorithmSlug, section } = req.body;

    if (!algorithmSlug || !section) {
      return res.status(400).json({
        message: "algorithmSlug and section are required"
      });
    }

    let progress = await UserProgress.findOne({
      userId,
      algorithmSlug
    });

    if (!progress) {
      progress = await UserProgress.create({
        userId,
        algorithmSlug,
        completedSections: [section]
      });
    } else {
      if (!progress.completedSections.includes(section)) {
        progress.completedSections.push(section);
        await progress.save();
      }
    }

    res.json({
      success: true,
      progress
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


/**
 * ✅ Get progress for a specific algorithm (SAFE)
 * - NO userId in params (important fix)
 */
router.get("/:slug", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { slug } = req.params;

    let progress = await UserProgress.findOne({
      userId,
      algorithmSlug: slug
    });

    if (!progress) {
      progress = await UserProgress.create({
        userId,
        algorithmSlug: slug,
        completedSections: []
      });
    }

    res.json({
      success: true,
      progress
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


/**
 * ✅ Mark section complete (safe alternative API)
 */
router.post("/complete", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { algorithmSlug, sectionId } = req.body;

    if (!algorithmSlug || !sectionId) {
      return res.status(400).json({
        message: "algorithmSlug and sectionId required"
      });
    }

    let progress = await UserProgress.findOne({
      userId,
      algorithmSlug
    });

    if (!progress) {
      progress = await UserProgress.create({
        userId,
        algorithmSlug,
        completedSections: []
      });
    }

    if (!progress.completedSections.includes(sectionId)) {
      progress.completedSections.push(sectionId);
      await progress.save();
    }

    res.json({
      success: true,
      progress
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;
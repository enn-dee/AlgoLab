import express from "express";
import UserProgress from "../models/UserProgress.js";
import Algorithm from "../models/Algorithm.js";
import { authMiddleware } from "../middleware/auth.js";
import { runPythonCode, runSimplePythonCode } from "../utils/RunPythonCode.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { algorithmSlug } = req.body;

    if (!algorithmSlug) {
      return res.status(400).json({
        message: "algorithmSlug is required"
      });
    }

    let progress = await UserProgress.findOne({
      userId,
      algorithmSlug
    });

    if (!progress) {
      progress = await UserProgress.create({
        userId,
        algorithmSlug
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

router.post("/complete", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { algorithmSlug } = req.body;

    // console.log("completing... ", algorithmSlug);
    if (!algorithmSlug) {
      return res.status(400).json({
        message: "algorithmSlug required"
      });
    }

    const progress = await UserProgress.findOneAndUpdate(
      { userId, algorithmSlug },
      {
        completed: true,
        completedAt: new Date()
      },
      {
        new: true,
        upsert: true
      }
    );

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

router.get("/user-progress", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await UserProgress.find({ userId });
    res.json(progress);
  } catch (err) {
    console.error("Error fetching user progress:", err);
    res.status(500).json({
      error: err.message
    });
  }
});


router.get("/next-unlocked", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const algorithms = await Algorithm.find().sort({ order: 1 });

    if (!algorithms || algorithms.length === 0) {
      return res.json({
        success: true,
        nextAlgorithm: null
      });
    }

    const progress = await UserProgress.find({ userId });
    const completedSet = new Set(
      progress.filter(p => p.completed).map(p => p.algorithmSlug)
    );

    let nextAlgorithm = null;
    for (let i = 0; i < algorithms.length; i++) {
      const algo = algorithms[i];
      if (!completedSet.has(algo.slug)) {
        nextAlgorithm = algo;
        break;
      }
    }

    res.json({
      success: true,
      nextAlgorithm: nextAlgorithm
    });

  } catch (err) {
    console.error("Error in next-unlocked:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ========== EXECUTE ROUTES ==========


// Simple run endpoint (for print statements and testing)
// router.post("/execute/simple-run", authMiddleware, async (req, res) => {
//   try {
//     const { code, language } = req.body;

//     if (language !== "python") {
//       return res.status(400).json({
//         success: false,
//         error: "Only Python is supported for now"
//       });
//     }

//     if (!code) {
//       return res.status(400).json({
//         success: false,
//         error: "Code is required"
//       });
//     }

//     const result = await runSimplePythonCode(code);

//     res.json({
//       success: result.success,
//       output: result.output,
//       error: result.error
//     });
//   } catch (err) {
//     console.error("Error executing code:", err);
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// Run with test cases endpoint
router.post("/execute/run", authMiddleware, async (req, res) => {
  try {
    const { code, language, algoId } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, error: "Code is required" });
    }
    if (language !== "python") {
      return res.status(400).json({
        success: false,
        error: "Only Python supported",
      });
    }

    if (!code.includes("def solution(")) {
      return res.status(400).json({
        success: false,
        error: "Define a solution() function",
      });
    }

    const algorithm = await Algorithm.findOne({ slug: algoId });

    if (!algorithm || !algorithm.testCases.length) {
      return res.status(400).json({
        success: false,
        error: "No test cases found",
      });
    }

    const results = await runPythonCode(code, algorithm.testCases);

    res.json({
      success: true,
      results,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Validate syntax endpoint
// router.post("/execute/validate", authMiddleware, async (req, res) => {
//   try {
//     const { code, language } = req.body;

//     if (language !== "python") {
//       return res.status(400).json({
//         success: false,
//         error: "Only Python is supported for now"
//       });
//     }

//     // Simple syntax validation
//     const hasDef = code.includes('def ');
//     const hasColon = code.includes(':');

//     if (!hasDef || !hasColon) {
//       return res.json({
//         success: true,
//         valid: false,
//         error: "Code doesn't look like valid Python. Make sure you have proper function definitions."
//       });
//     }

//     res.json({
//       success: true,
//       valid: true,
//       error: null
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });


export default router;
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Algorithm from "../models/Algorithm.js";

const seed = async () => {
  await connectDB();

  await Algorithm.deleteMany(); // reset

  await Algorithm.insertMany([
    {
      slug: "linear-search",
      title: "Linear Searchhhh",
      category: "Searching",
      verified: true,

      theory: {
        description: "Sequentially checks each element until target is found.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)"
      }
    },
    {
      slug: "binary-search",
      title: "Binary Search",
      category: "Searching",
      verified: true,

      theory: {
        description: "Divides sorted array to find target efficiently.",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)"
      }
    },
    {
      slug: "bubble-sort",
      title: "Bubble Sort",
      category: "Sorting",
      verified: false,

      theory: {
        description: "Swaps adjacent elements if in wrong order.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
      },
      pros:["very fast", 'easy to implement'],
      cons:["0(n)^2", "not ideal for large data sets"]
    },
    {
      slug: "selection-sort",
      title: "Selection Sort",
      category: "Sorting",
      verified: false,

      theory: {
        description: "Selects the smallest element and places it in correct position.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
      }
    },
    {
      slug: "insertion-sort",
      title: "Insertion Sort",
      category: "Sorting",
      verified: true,

      theory: {
        description: "Builds sorted array one element at a time.",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)"
      }
    }
  ]);

  console.log("✅ Algorithms seeded");
  process.exit();
};

seed();
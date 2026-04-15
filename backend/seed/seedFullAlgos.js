import connectDB from "../config/db.js";
import Algorithm from "../models/Algorithm.js";

const seed = async () => {
  await connectDB();

  // reset
  await Algorithm.deleteMany();

  await Algorithm.insertMany([
    // =========================
    // ✅ LINEAR SEARCH
    // =========================
    {
      slug: "linear-search",
      title: "Linear Search",
      category: "Searching",

      theory: {
        description:
          "Linear Search is a straightforward searching technique that scans each element of the array one by one from left to right until the target value is found or the list ends. It does not require the data to be sorted and works by sequential comparison with every element.",

        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Works on both sorted and unsorted arrays",
        "Simple and easy to implement",
        "Checks each element one by one"
      ],

      pros: [
        "No need for sorted data",
        "Very simple logic",
        "Works on all data structures (arrays, lists)"
      ],

      cons: [
        "Slow for large datasets",
        "O(n) time complexity",
        "Not efficient for repeated searches"
      ],

      input: {
        array: [3, 8, 2, 7, 5],
        target: 7
      },

      animationSteps: [
        { type: "start", flowNode: "start" },
        { type: "setIndex", index: 0, flowNode: "init" },
        { type: "compare", index: 0, flowNode: "check" },
        { type: "setIndex", index: 1, flowNode: "increment" },
        { type: "compare", index: 1, flowNode: "check" },
        { type: "setIndex", index: 2, flowNode: "increment" },
        { type: "compare", index: 2, flowNode: "check" },
        { type: "setIndex", index: 3, flowNode: "increment" },
        { type: "compare", index: 3, flowNode: "check" },
        { type: "found", index: 3, flowNode: "found" }
      ],

      flowchart: {
        nodes: [
          { id: "start", type: "start", text: "Start" },
          { id: "init", type: "process", text: "i = 0" },
          { id: "check", type: "decision", text: "arr[i] == target?" },
          { id: "found", type: "end", text: "Element Found" },
          { id: "increment", type: "process", text: "i++" },
          { id: "limit", type: "decision", text: "i < n ?" },
          { id: "notfound", type: "end", text: "Not Found" }
        ],
        edges: [
          { from: "start", to: "init" },
          { from: "init", to: "check" },
          { from: "check", to: "found", label: "Yes" },
          { from: "check", to: "increment", label: "No" },
          { from: "increment", to: "limit" },
          { from: "limit", to: "check", label: "Yes" },
          { from: "limit", to: "notfound", label: "No" }
        ]
      },

      code: {
        javascript:
          "function linearSearch(arr, target) { for (let i = 0; i < arr.length; i++) { if (arr[i] === target) return i; } return -1; }"
      },

      pseudocode: {
        lines: [
          "Procedure linear_search",
          "   A ← array",
          "   target ← value to search",
          "   n ← size of array",
          "",
          "   for i = 0 to n-1",
          "      if A[i] == target",
          "         return i (FOUND)",
          "",
          "   return NOT FOUND",
          "end procedure"
        ]
      },

      verified: true
    },

    // =========================
    // ✅ BINARY SEARCH
    // =========================
    {
      slug: "binary-search",
      title: "Binary Search",
      category: "Searching",

      theory: {
        description:
          "Binary Search is an efficient divide-and-conquer algorithm that works on sorted arrays by repeatedly dividing the search interval in half. At each step, it compares the middle element with the target and eliminates half of the remaining search space accordingly.",

        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },

      input: {
        array: [1, 3, 5, 7, 9],
        target: 7
      },

      keyPoints: [
        "Requires sorted array",
        "Works by dividing search space",
        "Eliminates half elements each step"
      ],

      pros: [
        "Very fast for large datasets",
        "Logarithmic time complexity",
        "Efficient for repeated searches"
      ],

      cons: [
        "Only works on sorted arrays",
        "Harder to implement than linear search",
        "Not suitable for dynamic unsorted data"
      ],

      animationSteps: [
        { type: "start", flowNode: "start" },
        { type: "setBounds", low: 0, high: 4, flowNode: "init" },
        { type: "calculateMid", mid: 2, flowNode: "mid" },
        { type: "compare", index: 2, flowNode: "check" },
        { type: "moveRight", low: 3, flowNode: "moveRight" },
        { type: "calculateMid", mid: 3, flowNode: "mid" },
        { type: "compare", index: 3, flowNode: "check" },
        { type: "found", index: 3, flowNode: "found" }
      ],

      flowchart: {
        nodes: [
          { id: "start", type: "start", text: "Start" },
          { id: "init", type: "process", text: "low = 0, high = n-1" },
          { id: "mid", type: "process", text: "mid = (low + high)/2" },
          { id: "check", type: "decision", text: "arr[mid] == target?" },
          { id: "found", type: "end", text: "Found" }
        ],
        edges: [
          { from: "start", to: "init" },
          { from: "init", to: "mid" },
          { from: "mid", to: "check" },
          { from: "check", to: "found", label: "Yes" }
        ]
      },

      code: {
        javascript:
          "function binarySearch(arr, target) { let low=0, high=arr.length-1; while(low<=high){ let mid=Math.floor((low+high)/2); if(arr[mid]===target) return mid; else if(arr[mid]<target) low=mid+1; else high=mid-1;} return -1;}"
      },

      pseudocode: {
        lines: [
          "Procedure binary_search",
          "   A ← sorted array",
          "   n ← size of array",
          "   x ← value to be searched",
          "",
          "   lowerBound ← 0",
          "   upperBound ← n - 1",
          "",
          "   while lowerBound ≤ upperBound",
          "      mid ← (lowerBound + upperBound) / 2",
          "",
          "      if A[mid] == x",
          "         return mid (FOUND)",
          "",
          "      else if A[mid] < x",
          "         lowerBound ← mid + 1",
          "",
          "      else",
          "         upperBound ← mid - 1",
          "",
          "   return NOT FOUND",
          "end procedure"
        ]
      },

      verified: true
    },

    // =========================
    // ✅ BUBBLE SORT
    // =========================
    {
      slug: "bubble-sort",
      title: "Bubble Sort",
      category: "Sorting",

      theory: {
        description:
          "Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process continues until the entire array becomes sorted, with larger elements gradually moving to the end in each pass.",

        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Repeatedly compares adjacent elements",
        "Largest element moves to end in each pass",
        "Simple sorting algorithm"
      ],

      pros: [
        "Easy to understand and implement",
        "No extra memory required",
        "Good for educational purposes"
      ],

      cons: [
        "Very slow for large datasets",
        "O(n^2) time complexity",
        "Rarely used in production"
      ],

      input: {
        array: [5, 3, 8, 4],
        target: null
      },

      animationSteps: [],
      flowchart: { nodes: [], edges: [] },

      code: {
        javascript:
          "function bubbleSort(arr){ for(let i=0;i<arr.length;i++){ for(let j=0;j<arr.length-i-1;j++){ if(arr[j]>arr[j+1]){ [arr[j],arr[j+1]]=[arr[j+1],arr[j]]; }}} return arr;}"
      },

      pseudocode: {
        lines: [
          "Procedure bubble_sort",
          "   A ← array",
          "   n ← size of array",
          "",
          "   for i = 0 to n-1",
          "      for j = 0 to n-i-2",
          "         if A[j] > A[j+1]",
          "            swap A[j], A[j+1]",
          "",
          "   return A",
          "end procedure"
        ]
      },

      verified: false
    }
  ]);

  console.log("✅ Multiple algorithms seeded");
  process.exit();
};

seed();
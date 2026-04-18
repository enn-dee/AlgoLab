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
        "Checks each element one by one",
      ],

      pros: [
        "No need for sorted data",
        "Very simple logic",
        "Works on all data structures (arrays, lists)",
      ],

      cons: [
        "Slow for large datasets",
        "O(n) time complexity",
        "Not efficient for repeated searches",
      ],

      input: {
        array: [3, 8, 2, 7, 5],
        target: 7,
      },
      //  animation: "/gifs/binary-search.gif"
      //then in app.js: app.use(express.static("public"));

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
        { type: "found", index: 3, flowNode: "found" },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: {
              label: "Start",
              background: "#d1fae5",
              borderColor: "#10b981",
            },
          },
          {
            id: "input",
            type: "ioNode",
            data: {
              label: "Input A, n, key",
              background: "#fef3c7",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "init",
            type: "processNode",
            data: {
              label: "i = 0",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: {
              label: "i < n ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: {
              label: "A[i] == key ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "found",
            type: "ioNode",
            data: {
              label: "Found at index i",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
          {
            id: "increment",
            type: "processNode",
            data: {
              label: "i = i + 1",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "not_found",
            type: "ioNode",
            data: {
              label: "Not Found",
              background: "#e9d5ff",
              borderColor: "#8b5cf6",
            },
          },
          {
            id: "end",
            type: "terminalNode",
            data: {
              label: "End",
              background: "#d1fae5",
              borderColor: "#10b981",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "init" },
          { id: "e3", source: "init", target: "check_i" },
          {
            id: "e4",
            source: "check_i",
            target: "compare",
            label: "Yes",
          },
          {
            id: "e5",
            source: "check_i",
            target: "not_found",
            label: "No",
          },
          {
            id: "e6",
            source: "compare",
            target: "found",
            label: "Yes",
            height: "200",
          },
          {
            id: "e7",
            source: "compare",
            target: "increment",
            label: "No",
          },
          { id: "e8", source: "increment", target: "check_i" },
          { id: "e9", source: "found", target: "end" },
          { id: "e10", source: "not_found", target: "end" },
        ],
      },

      code: {
        javascript:
          "function linearSearch(arr, target) { for (let i = 0; i < arr.length; i++) { if (arr[i] === target) return i; } return -1; }",
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
          "end procedure",
        ],
      },

      verified: true,
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
        target: 7,
      },

      keyPoints: [
        "Requires sorted array",
        "Works by dividing search space",
        "Eliminates half elements each step",
      ],

      pros: [
        "Very fast for large datasets",
        "Logarithmic time complexity",
        "Efficient for repeated searches",
      ],

      cons: [
        "Only works on sorted arrays",
        "Harder to implement than linear search",
        "Not suitable for dynamic unsorted data",
      ],

      animationSteps: [
        { type: "start", flowNode: "start" },
        { type: "setBounds", low: 0, high: 4, flowNode: "init" },
        { type: "calculateMid", mid: 2, flowNode: "mid" },
        { type: "compare", index: 2, flowNode: "check" },
        { type: "moveRight", low: 3, flowNode: "moveRight" },
        { type: "calculateMid", mid: 3, flowNode: "mid" },
        { type: "compare", index: 3, flowNode: "check" },
        { type: "found", index: 3, flowNode: "found" },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: {
              label: "Start",
              background: "#d1fae5",
              borderColor: "#10b981",
            },
          },
          {
            id: "init",
            type: "processNode",
            data: {
              label: "low = 0, high = n-1",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "check_bounds",
            type: "decisionNode",
            data: {
              label: "low ≤ high ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "calc_mid",
            type: "processNode",
            data: {
              label: "mid = (low + high) / 2",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: {
              label: "arr[mid] == target ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "found",
            type: "ioNode",
            data: {
              label: "Found at index mid",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
          {
            id: "check_side",
            type: "decisionNode",
            data: {
              label: "arr[mid] > target ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "move_left",
            type: "processNode",
            data: {
              label: "high = mid - 1",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "move_right",
            type: "processNode",
            data: {
              label: "low = mid + 1",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "not_found",
            type: "ioNode",
            data: {
              label: "Not Found",
              background: "#e9d5ff",
              borderColor: "#8b5cf6",
            },
          },
          {
            id: "end",
            type: "terminalNode",
            data: {
              label: "End",
              background: "#d1fae5",
              borderColor: "#10b981",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "init" },
          { id: "e2", source: "init", target: "check_bounds" },
          {
            id: "e3",
            source: "check_bounds",
            target: "calc_mid",
            label: "Yes",
          },
          {
            id: "e4",
            source: "check_bounds",
            target: "not_found",
            label: "No",
          },
          { id: "e5", source: "calc_mid", target: "compare" },
          { id: "e6", source: "compare", target: "found", label: "Yes" },
          { id: "e7", source: "compare", target: "check_side", label: "No" },
          { id: "e8", source: "check_side", target: "move_left", label: "Yes" },
          { id: "e9", source: "check_side", target: "move_right", label: "No" },
          { id: "e10", source: "move_left", target: "check_bounds" },
          { id: "e11", source: "move_right", target: "check_bounds" },
          { id: "e12", source: "found", target: "end" },
          { id: "e13", source: "not_found", target: "end" },
        ],
      },

      code: {
        javascript:
          "function binarySearch(arr, target) { let low=0, high=arr.length-1; while(low<=high){ let mid=Math.floor((low+high)/2); if(arr[mid]===target) return mid; else if(arr[mid]<target) low=mid+1; else high=mid-1;} return -1;}",
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
          "end procedure",
        ],
      },

      verified: true,
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
        "Simple sorting algorithm",
      ],

      pros: [
        "Easy to understand and implement",
        "No extra memory required",
        "Good for educational purposes",
      ],

      cons: [
        "Very slow for large datasets",
        "O(n^2) time complexity",
        "Rarely used in production",
      ],

      input: {
        array: [5, 3, 8, 4],
        target: null,
      },

      animationSteps: [],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: {
              label: "Start",
              background: "#d1fae5",
              borderColor: "#10b981",
            },
          },
          {
            id: "init_i",
            type: "processNode",
            data: {
              label: "i = 0",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: {
              label: "i < n ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "init_j",
            type: "processNode",
            data: {
              label: "j = 0",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "check_j",
            type: "decisionNode",
            data: {
              label: "j < n-i-1 ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: {
              label: "arr[j] > arr[j+1] ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "swap",
            type: "processNode",
            data: {
              label: "Swap arr[j], arr[j+1]",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "inc_j",
            type: "processNode",
            data: {
              label: "j++",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "inc_i",
            type: "processNode",
            data: {
              label: "i++",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "sorted",
            type: "terminalNode",
            data: {
              label: "Sorted",
              background: "#d1fae5",
              borderColor: "#10b981",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "init_i" },
          { id: "e2", source: "init_i", target: "check_i" },
          { id: "e3", source: "check_i", target: "init_j", label: "Yes" },
          { id: "e4", source: "check_i", target: "sorted", label: "No" },
          { id: "e5", source: "init_j", target: "check_j" },
          { id: "e6", source: "check_j", target: "compare", label: "Yes" },
          { id: "e7", source: "check_j", target: "inc_i", label: "No" },
          { id: "e8", source: "compare", target: "swap", label: "Yes" },
          { id: "e9", source: "compare", target: "inc_j", label: "No" },
          { id: "e10", source: "swap", target: "inc_j" },
          { id: "e11", source: "inc_j", target: "check_j" },
          { id: "e12", source: "inc_i", target: "check_i" },
        ],
      },

      code: {
        javascript:
          "function bubbleSort(arr){ for(let i=0;i<arr.length;i++){ for(let j=0;j<arr.length-i-1;j++){ if(arr[j]>arr[j+1]){ [arr[j],arr[j+1]]=[arr[j+1],arr[j]]; }}} return arr;}",
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
          "end procedure",
        ],
      },

      verified: false,
    },
  ]);

  console.log("✅ Multiple algorithms seeded");
  process.exit();
};

seed();

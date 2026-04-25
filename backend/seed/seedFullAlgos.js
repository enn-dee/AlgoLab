import connectDB from "../config/db.js";
import Algorithm from "../models/Algorithm.js";

const seed = async () => {
  await connectDB();

  // reset
  await Algorithm.deleteMany();

  const algorithms = [
    // =========================
    // ✅ PALINDROME CHECK (Level 1)
    // =========================
    {
      order: 1,
      slug: "palindrome-check",
      title: "Palindrome Check",
      category: "Fundamentals",

      description: "Write a function that returns true if a given string reads the same forwards and backwards, and false otherwise.",

      examples: [
        {
          input: { s: "racecar" },
          output: true,
          explanation: "racecar reads the same forwards and backwards"
        },
        {
          input: { s: "hello" },
          output: false,
          explanation: "hello reversed is 'olleh', which is different"
        }
      ],

      testCases: [
        { input: { s: "racecar" }, expected: true },
        { input: { s: "hello" }, expected: false },
        { input: { s: "A" }, expected: true },
        { input: { s: "ab" }, expected: false },
        { input: { s: "a man a plan a canal panama" }, expected: true }
      ],

      theory: {
        description:
          "A Palindrome Check determines whether a given string or array reads the same forwards and backwards. The classic approach uses two pointers — one starting at the beginning and one at the end — comparing characters and moving inward until they meet.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Compares characters from both ends moving inward",
        "Stops as soon as a mismatch is found",
        "Works on strings and arrays alike",
      ],

      pros: [
        "Linear time complexity",
        "Constant extra space with two-pointer approach",
        "Simple and intuitive logic",
      ],

      cons: [
        "Case-sensitive by default (needs preprocessing for real-world use)",
        "Special characters and spaces must be handled separately",
      ],

      input: { array: ["r", "a", "c", "e", "c", "a", "r"], target: null },

      animationSteps: [
        {
          array: ["r", "a", "c", "e", "c", "a", "r"],
          active: [0, 6],
          found: true,
          message: "Compare index 0 ('r') and index 6 ('r'). Match!",
        },
        {
          array: ["r", "a", "c", "e", "c", "a", "r"],
          active: [1, 5],
          found: true,
          message: "Compare index 1 ('a') and index 5 ('a'). Match!",
        },
        {
          array: ["r", "a", "c", "e", "c", "a", "r"],
          active: [2, 4],
          found: true,
          message: "Compare index 2 ('c') and index 4 ('c'). Match!",
        },
        {
          array: ["r", "a", "c", "e", "c", "a", "r"],
          active: [3],
          found: true,
          message: "Pointers met at center.",
        },
        {
          array: ["r", "a", "c", "e", "c", "a", "r"],
          active: [0, 1, 2, 3, 4, 5, 6],
          found: true,
          message: "It is a Palindrome!",
        },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "input",
            type: "ioNode",
            data: { label: "Input string s", background: "#fef3c7", borderColor: "#f59e0b" },
          },
          {
            id: "init",
            type: "processNode",
            data: { label: "left = 0\nright = n - 1", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_pointers",
            type: "decisionNode",
            data: { label: "left < right ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: { label: "s[left] == s[right] ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "not_palindrome",
            type: "ioNode",
            data: { label: "Not a Palindrome", background: "#e9d5ff", borderColor: "#8b5cf6" },
          },
          {
            id: "move_pointers",
            type: "processNode",
            data: { label: "left++\nright--", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "palindrome",
            type: "ioNode",
            data: { label: "Is a Palindrome", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "init" },
          { id: "e3", source: "init", target: "check_pointers" },
          { id: "e4", source: "check_pointers", target: "compare", label: "Yes" },
          { id: "e5", source: "check_pointers", target: "palindrome", label: "No" },
          { id: "e6", source: "compare", target: "move_pointers", label: "Yes" },
          { id: "e7", source: "compare", target: "not_palindrome", label: "No" },
          { id: "e8", source: "move_pointers", target: "check_pointers" },
          { id: "e9", source: "palindrome", target: "end" },
          { id: "e10", source: "not_palindrome", target: "end" },
        ],
      },

      code: {
        javascript: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
        python: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`
      },

      pseudocode: {
        lines: [
          "Procedure palindrome_check",
          "   s ← input string",
          "   left ← 0",
          "   right ← length(s) - 1",
          "",
          "   while left < right",
          "      if s[left] ≠ s[right]",
          "         return NOT PALINDROME",
          "      left ← left + 1",
          "      right ← right - 1",
          "",
          "   return PALINDROME",
          "end procedure",
        ],
      },

      verified: true,
    },

    // =========================
    // ✅ LINEAR SEARCH (Level 2)
    // =========================
    {
      order: 2,
      slug: "linear-search",
      title: "Linear Search",
      category: "Searching",

      description: "Write a function that finds the index of a target value in an array. Return -1 if not found.",

      examples: [
        {
          input: { arr: [3, 8, 2, 7, 5], target: 7 },
          output: 3,
          explanation: "7 is found at index 3"
        },
        {
          input: { arr: [1, 2, 3, 4], target: 10 },
          output: -1,
          explanation: "10 is not in the array"
        }
      ],

      testCases: [
        { input: { arr: [3, 8, 2, 7, 5], target: 7 }, expected: 3 },
        { input: { arr: [1, 2, 3, 4], target: 10 }, expected: -1 },
        { input: { arr: [5], target: 5 }, expected: 0 },
        { input: { arr: [], target: 1 }, expected: -1 },
        { input: { arr: [10, 20, 30, 40, 50], target: 30 }, expected: 2 }
      ],

      theory: {
        description:
          "Linear Search is a straightforward searching technique that scans each element of the array one by one from left to right until the target value is found or the list ends.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Works on both sorted and unsorted arrays",
        "Simple and easy to implement",
        "Checks each element one by one",
      ],

      pros: ["No need for sorted data", "Very simple logic", "Works on all data structures"],
      cons: ["Slow for large datasets", "O(n) time complexity", "Not efficient for repeated searches"],

      input: { array: [3, 8, 2, 7, 5], target: 7 },

      animationSteps: [
        {
          target: 7,
          array: [3, 8, 18, 7, 10],
          active: [0],
          found: false,
          message: "Is 3 === 7? No.",
        },
        {
          target: 7,
          array: [3, 8, 18, 7, 10],
          active: [1],
          found: false,
          message: "Is 8 === 7? No.",
        },
        {
          target: 7,
          array: [3, 8, 18, 7, 10],
          active: [2],
          found: false,
          message: "Is 18 === 7? No.",
        },
        {
          target: 7,
          array: [3, 8, 18, 7, 10],
          active: [3],
          found: true,
          message: "7 === 7, Found 7 at index 3!",
        },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "input",
            type: "ioNode",
            data: { label: "Input A, n, key", background: "#fef3c7", borderColor: "#f59e0b" },
          },
          {
            id: "init",
            type: "processNode",
            data: { label: "i = 0", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i < n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: { label: "A[i] == key ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "found",
            type: "ioNode",
            data: { label: "Found at index i", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "increment",
            type: "processNode",
            data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "not_found",
            type: "ioNode",
            data: { label: "Not Found", background: "#e9d5ff", borderColor: "#8b5cf6" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "init" },
          { id: "e3", source: "init", target: "check_i" },
          { id: "e4", source: "check_i", target: "compare", label: "Yes" },
          { id: "e5", source: "check_i", target: "not_found", label: "No" },
          { id: "e6", source: "compare", target: "found", label: "Yes", height: "200" },
          { id: "e7", source: "compare", target: "increment", label: "No" },
          { id: "e8", source: "increment", target: "check_i" },
          { id: "e9", source: "found", target: "end" },
          { id: "e10", source: "not_found", target: "end" },
        ],
      },

      code: {
        javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
        python: `def linear_search(arr: list, target: int) -> int:
    for i, num in enumerate(arr):
        if num == target:
            return i
    return -1`
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
    // ✅ REVERSE ARRAY (Level 3)
    // =========================
    {
      order: 3,
      slug: "reverse-string-array",
      title: "Reverse an Array",
      category: "Fundamentals",

      description: "Write a function that reverses an array in-place without using the built-in reverse method.",

      examples: [
        {
          input: { arr: [1, 2, 3, 4, 5] },
          output: [5, 4, 3, 2, 1],
          explanation: "The array is reversed"
        },
        {
          input: { arr: ["a", "b", "c"] },
          output: ["c", "b", "a"],
          explanation: "The array is reversed"
        }
      ],

      testCases: [
        { input: { arr: [1, 2, 3, 4, 5] }, expected: [5, 4, 3, 2, 1] },
        { input: { arr: ["a", "b", "c"] }, expected: ["c", "b", "a"] },
        { input: { arr: [1] }, expected: [1] },
        { input: { arr: [] }, expected: [] },
        { input: { arr: [1, 2] }, expected: [2, 1] }
      ],

      theory: {
        description:
          "Reversing a string or array means rearranging its elements so that the last element becomes first and the first becomes last. The in-place two-pointer technique swaps elements at the start and end.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Two-pointer swap from both ends toward center",
        "In-place: no extra array needed",
      ],

      pros: ["Linear time, constant space", "Simple and universally applicable"],
      cons: ["In-place mutation — need a copy if original must be preserved"],

      input: { array: [1, 2, 3, 4, 5], target: null },

      animationSteps: [
        {
          array: [1, 2, 3, 4, 5],
          active: [0, 4],
          found: false,
          message: "Swap index 0 (1) and index 4 (5). Array: [5,2,3,4,1]",
        },
        {
          array: [5, 2, 3, 4, 1],
          active: [1, 3],
          found: false,
          message: "Swap index 1 (2) and index 3 (4). Array: [5,4,3,2,1]",
        },
        {
          array: [5, 4, 3, 2, 1],
          active: [2],
          found: true,
          message: "Pointers met at center. Reversal complete!",
        },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "input",
            type: "ioNode",
            data: { label: "Input array A, size n", background: "#fef3c7", borderColor: "#f59e0b" },
          },
          {
            id: "init",
            type: "processNode",
            data: { label: "left = 0\nright = n - 1", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_pointers",
            type: "decisionNode",
            data: { label: "left < right ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "swap",
            type: "processNode",
            data: { label: "Swap A[left], A[right]", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "move_pointers",
            type: "processNode",
            data: { label: "left++\nright--", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "output",
            type: "ioNode",
            data: { label: "Output reversed A", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "init" },
          { id: "e3", source: "init", target: "check_pointers" },
          { id: "e4", source: "check_pointers", target: "swap", label: "Yes" },
          { id: "e5", source: "check_pointers", target: "output", label: "No" },
          { id: "e6", source: "swap", target: "move_pointers" },
          { id: "e7", source: "move_pointers", target: "check_pointers" },
          { id: "e8", source: "output", target: "end" },
        ],
      },

      code: {
        javascript: `function reverseArray(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr;
}`,
        python: `def reverse_array(arr: list) -> list:
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr`
      },

      pseudocode: {
        lines: [
          "Procedure reverse",
          "   A ← input array",
          "   left ← 0",
          "   right ← length(A) - 1",
          "",
          "   while left < right",
          "      swap A[left], A[right]",
          "      left ← left + 1",
          "      right ← right - 1",
          "",
          "   return A",
          "end procedure",
        ],
      },

      verified: true,
    },

    // =========================
    // ✅ FACTORIAL (Level 4)
    // =========================
    {
      order: 4,
      slug: "factorial",
      title: "Factorial",
      category: "Fundamentals",

      description: "Write a function that returns the factorial of a non-negative integer n (n!).",

      examples: [
        {
          input: { n: 5 },
          output: 120,
          explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120"
        },
        {
          input: { n: 0 },
          output: 1,
          explanation: "0! is defined as 1"
        }
      ],

      testCases: [
        { input: { n: 5 }, expected: 120 },
        { input: { n: 0 }, expected: 1 },
        { input: { n: 1 }, expected: 1 },
        { input: { n: 3 }, expected: 6 },
        { input: { n: 4 }, expected: 24 }
      ],

      theory: {
        description:
          "Factorial of a non-negative integer n (written as n!) is the product of all positive integers from 1 to n.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Defined as n × (n-1) × ... × 1",
        "Base case: 0! = 1",
        "Can be computed iteratively or recursively",
      ],

      pros: ["Simple concept and implementation", "Iterative version uses constant space"],
      cons: ["Grows extremely fast — overflows for large n"],

      input: { array: [5], target: null },

      animationSteps: [
        {
          array: [5],
          active: [0],
          found: false,
          message: "n = 5, result = 1. Start loop.",
        },
        {
          array: [5, 1],
          active: [0],
          found: false,
          message: "i = 1: result = 1 × 1 = 1",
        },
        {
          array: [5, 2],
          active: [0],
          found: false,
          message: "i = 2: result = 1 × 2 = 2",
        },
        {
          array: [5, 3],
          active: [0],
          found: false,
          message: "i = 3: result = 2 × 3 = 6",
        },
        {
          array: [5, 4],
          active: [0],
          found: false,
          message: "i = 4: result = 6 × 4 = 24",
        },
        {
          array: [5, 5],
          active: [0],
          found: true,
          message: "i = 5: result = 24 × 5 = 120. Done!",
        },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "input",
            type: "ioNode",
            data: { label: "Input n", background: "#fef3c7", borderColor: "#f59e0b" },
          },
          {
            id: "init",
            type: "processNode",
            data: { label: "result = 1\ni = 1", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i ≤ n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "multiply",
            type: "processNode",
            data: { label: "result = result × i", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "increment",
            type: "processNode",
            data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "output",
            type: "ioNode",
            data: { label: "Output result", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "init" },
          { id: "e3", source: "init", target: "check_i" },
          { id: "e4", source: "check_i", target: "multiply", label: "Yes" },
          { id: "e5", source: "check_i", target: "output", label: "No" },
          { id: "e6", source: "multiply", target: "increment" },
          { id: "e7", source: "increment", target: "check_i" },
          { id: "e8", source: "output", target: "end" },
        ],
      },

      code: {
        javascript: `function factorial(n) {
  if (n < 0) return undefined;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}`,
        python: `def factorial(n: int) -> int:
    if n < 0:
        return None
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result`
      },

      pseudocode: {
        lines: [
          "Procedure factorial",
          "   n ← input number",
          "   result ← 1",
          "   i ← 1",
          "",
          "   while i ≤ n",
          "      result ← result × i",
          "      i ← i + 1",
          "",
          "   return result",
          "end procedure",
        ],
      },

      verified: true,
    },

    // =========================
    // ✅ PRIME NUMBER CHECK (Level 5)
    // =========================
    {
      order: 5,
      slug: "prime-number-check",
      title: "Prime Number Check",
      category: "Fundamentals",

      description: "Write a function that returns true if a number is prime, false otherwise.",

      examples: [
        {
          input: { n: 17 },
          output: true,
          explanation: "17 is only divisible by 1 and itself"
        },
        {
          input: { n: 15 },
          output: false,
          explanation: "15 is divisible by 3 and 5"
        }
      ],

      testCases: [
        { input: { n: 17 }, expected: true },
        { input: { n: 15 }, expected: false },
        { input: { n: 2 }, expected: true },
        { input: { n: 1 }, expected: false },
        { input: { n: 97 }, expected: true }
      ],

      theory: {
        description:
          "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
        timeComplexity: "O(√n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Only test divisors up to √n",
        "Handle edge cases: n < 2 is not prime",
      ],

      pros: ["O(√n) is much faster than O(n) trial division", "Constant space usage"],
      cons: ["Slow for very large numbers (use Miller-Rabin for cryptography)"],

      input: { array: [17], target: null },

      animationSteps: [
        {
          array: [17],
          active: [0],
          found: false,
          message: "n = 17. Check if n < 2. No.",
        },
        {
          array: [17],
          active: [0],
          found: false,
          message: "i = 2: 17 % 2 = 1. Not divisible.",
        },
        {
          array: [17],
          active: [0],
          found: false,
          message: "i = 3: 17 % 3 = 2. Not divisible.",
        },
        {
          array: [17],
          active: [0],
          found: false,
          message: "i = 4: 4 > √17 ≈ 4.12. Stop.",
        },
        {
          array: [17],
          active: [0],
          found: true,
          message: "No divisor found. 17 is Prime!",
        },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "input",
            type: "ioNode",
            data: { label: "Input n", background: "#fef3c7", borderColor: "#f59e0b" },
          },
          {
            id: "check_lt2",
            type: "decisionNode",
            data: { label: "n < 2 ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "not_prime_early",
            type: "ioNode",
            data: { label: "Not Prime", background: "#e9d5ff", borderColor: "#8b5cf6" },
          },
          {
            id: "init_i",
            type: "processNode",
            data: { label: "i = 2", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i ≤ √n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "check_mod",
            type: "decisionNode",
            data: { label: "n % i == 0 ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "not_prime",
            type: "ioNode",
            data: { label: "Not Prime", background: "#e9d5ff", borderColor: "#8b5cf6" },
          },
          {
            id: "increment",
            type: "processNode",
            data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "prime",
            type: "ioNode",
            data: { label: "Prime", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "check_lt2" },
          { id: "e3", source: "check_lt2", target: "not_prime_early", label: "Yes" },
          { id: "e4", source: "check_lt2", target: "init_i", label: "No" },
          { id: "e5", source: "init_i", target: "check_i" },
          { id: "e6", source: "check_i", target: "check_mod", label: "Yes" },
          { id: "e7", source: "check_i", target: "prime", label: "No" },
          { id: "e8", source: "check_mod", target: "not_prime", label: "Yes" },
          { id: "e9", source: "check_mod", target: "increment", label: "No" },
          { id: "e10", source: "increment", target: "check_i" },
          { id: "e11", source: "not_prime_early", target: "end" },
          { id: "e12", source: "not_prime", target: "end" },
          { id: "e13", source: "prime", target: "end" },
        ],
      },

      code: {
        javascript: `function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}`,
        python: `def is_prime(n: int) -> bool:
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True`
      },

      pseudocode: {
        lines: [
          "Procedure prime_check",
          "   n ← input number",
          "",
          "   if n < 2",
          "      return NOT PRIME",
          "",
          "   for i = 2 to √n",
          "      if n mod i == 0",
          "         return NOT PRIME",
          "",
          "   return PRIME",
          "end procedure",
        ],
      },

      verified: true,
    },

    // =========================
    // ✅ FIBONACCI (Level 6)
    // =========================
    {
      order: 6,
      slug: "fibonacci",
      title: "Fibonacci",
      category: "Dynamic Programming",

      description: "Write a function that returns the nth Fibonacci number (0-indexed).",

      examples: [
        {
          input: { n: 7 },
          output: 13,
          explanation: "Sequence: 0, 1, 1, 2, 3, 5, 8, 13 → F(7) = 13"
        },
        {
          input: { n: 0 },
          output: 0,
          explanation: "F(0) = 0"
        }
      ],

      testCases: [
        { input: { n: 7 }, expected: 13 },
        { input: { n: 0 }, expected: 0 },
        { input: { n: 1 }, expected: 1 },
        { input: { n: 2 }, expected: 1 },
        { input: { n: 10 }, expected: 55 }
      ],

      theory: {
        description:
          "The Fibonacci sequence is a series where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, …",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Each term is the sum of the two before it",
        "Naive recursion is O(2^n) — avoid it",
        "Iterative approach achieves O(n) time",
      ],

      pros: ["Classic introduction to dynamic programming", "Iterative version is memory efficient"],
      cons: ["Integer overflow for large n without big-integer libraries"],

      input: { array: [7], target: null },

      animationSteps: [
        {
          array: [0, 1],
          active: [0, 1],
          found: false,
          message: "Base cases: F(0)=0, F(1)=1.",
        },
        {
          array: [0, 1, 1],
          active: [2],
          found: false,
          message: "F(2) = F(1) + F(0) = 1 + 0 = 1",
        },
        {
          array: [0, 1, 1, 2],
          active: [3],
          found: false,
          message: "F(3) = F(2) + F(1) = 1 + 1 = 2",
        },
        {
          array: [0, 1, 1, 2, 3],
          active: [4],
          found: false,
          message: "F(4) = F(3) + F(2) = 2 + 1 = 3",
        },
        {
          array: [0, 1, 1, 2, 3, 5],
          active: [5],
          found: false,
          message: "F(5) = F(4) + F(3) = 3 + 2 = 5",
        },
        {
          array: [0, 1, 1, 2, 3, 5, 8],
          active: [6],
          found: false,
          message: "F(6) = F(5) + F(4) = 5 + 3 = 8",
        },
        {
          array: [0, 1, 1, 2, 3, 5, 8, 13],
          active: [7],
          found: true,
          message: "F(7) = F(6) + F(5) = 8 + 5 = 13. Done!",
        },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "input",
            type: "ioNode",
            data: { label: "Input n", background: "#fef3c7", borderColor: "#f59e0b" },
          },
          {
            id: "check_base",
            type: "decisionNode",
            data: { label: "n ≤ 1 ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "return_n",
            type: "ioNode",
            data: { label: "Return n", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "init",
            type: "processNode",
            data: { label: "prev = 0\ncurr = 1\ni = 2", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i ≤ n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "compute",
            type: "processNode",
            data: { label: "next = prev + curr\nprev = curr\ncurr = next\ni++", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "output",
            type: "ioNode",
            data: { label: "Return curr", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "check_base" },
          { id: "e3", source: "check_base", target: "return_n", label: "Yes" },
          { id: "e4", source: "check_base", target: "init", label: "No" },
          { id: "e5", source: "init", target: "check_i" },
          { id: "e6", source: "check_i", target: "compute", label: "Yes" },
          { id: "e7", source: "check_i", target: "output", label: "No" },
          { id: "e8", source: "compute", target: "check_i" },
          { id: "e9", source: "return_n", target: "end" },
          { id: "e10", source: "output", target: "end" },
        ],
      },

      code: {
        javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    let next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}`,
        python: `def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr`
      },

      pseudocode: {
        lines: [
          "Procedure fibonacci",
          "   n ← input number",
          "",
          "   if n ≤ 1",
          "      return n",
          "",
          "   prev ← 0",
          "   curr ← 1",
          "",
          "   for i = 2 to n",
          "      next ← prev + curr",
          "      prev ← curr",
          "      curr ← next",
          "",
          "   return curr",
          "end procedure",
        ],
      },

      verified: true,
    },

    // =========================
    // ✅ BINARY SEARCH (Level 7)
    // =========================
    {
      order: 7,
      slug: "binary-search",
      title: "Binary Search",
      category: "Searching",

      description: "Write a function that finds the index of a target value in a SORTED array using binary search. Return -1 if not found.",

      examples: [
        {
          input: { arr: [1, 3, 5, 7, 9], target: 7 },
          output: 3,
          explanation: "7 is found at index 3"
        },
        {
          input: { arr: [1, 3, 5, 7, 9], target: 2 },
          output: -1,
          explanation: "2 is not in the array"
        }
      ],

      testCases: [
        { input: { arr: [1, 3, 5, 7, 9], target: 7 }, expected: 3 },
        { input: { arr: [1, 3, 5, 7, 9], target: 2 }, expected: -1 },
        { input: { arr: [1], target: 1 }, expected: 0 },
        { input: { arr: [1, 2, 3, 4, 5], target: 1 }, expected: 0 },
        { input: { arr: [1, 2, 3, 4, 5], target: 5 }, expected: 4 }
      ],

      theory: {
        description:
          "Binary Search is an efficient divide-and-conquer algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Requires sorted array",
        "Works by dividing search space",
        "Eliminates half elements each step",
      ],

      pros: ["Very fast for large datasets", "Logarithmic time complexity"],
      cons: ["Only works on sorted arrays", "Harder to implement than linear search"],

      input: { array: [1, 3, 5, 7, 9], target: 7 },

      animationSteps: [
        {
          array: [2, 5, 8, 12, 18, 25, 30],
          active: [0, 1, 2, 3, 4, 5, 6],
          found: false,
          message: "Initial Range",
        },
        {
          array: [2, 5, 8, 12, 18, 25, 30],
          active: [3],
          found: false,
          message: "Check middle: 12. Too low!",
        },
        {
          array: [2, 5, 8, 12, 18, 25, 30],
          active: [4, 5, 6],
          found: false,
          message: "New range: Right side",
        },
        {
          array: [2, 5, 8, 12, 18, 25, 30],
          active: [5],
          found: false,
          message: "Check middle: 25. Too high!",
        },
        {
          array: [2, 5, 8, 12, 18, 25, 30],
          active: [4],
          found: true,
          message: "Found 18!",
        },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "init",
            type: "processNode",
            data: { label: "low = 0, high = n-1", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_bounds",
            type: "decisionNode",
            data: { label: "low ≤ high ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "calc_mid",
            type: "processNode",
            data: { label: "mid = (low + high) / 2", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: { label: "arr[mid] == target ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "found",
            type: "ioNode",
            data: { label: "Found at index mid", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "check_side",
            type: "decisionNode",
            data: { label: "arr[mid] > target ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "move_left",
            type: "processNode",
            data: { label: "high = mid - 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "move_right",
            type: "processNode",
            data: { label: "low = mid + 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "not_found",
            type: "ioNode",
            data: { label: "Not Found", background: "#e9d5ff", borderColor: "#8b5cf6" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "init" },
          { id: "e2", source: "init", target: "check_bounds" },
          { id: "e3", source: "check_bounds", target: "calc_mid", label: "Yes" },
          { id: "e4", source: "check_bounds", target: "not_found", label: "No" },
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
        javascript: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        python: `def binary_search(arr: list, target: int) -> int:
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`
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
    // ✅ TWO SUM (Level 8)
    // =========================
    {
      order: 8,
      slug: "two-sum",
      title: "Two Sum",
      category: "Arrays",

      description: "Write a function that returns the indices of two numbers that add up to the target.",

      examples: [
        {
          input: { nums: [2, 7, 11, 15], target: 9 },
          output: [0, 1],
          explanation: "2 + 7 = 9, indices 0 and 1"
        },
        {
          input: { nums: [3, 2, 4], target: 6 },
          output: [1, 2],
          explanation: "2 + 4 = 6, indices 1 and 2"
        }
      ],

      testCases: [
        { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
        { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
        { input: { nums: [3, 3], target: 6 }, expected: [0, 1] },
        { input: { nums: [1, 2, 3, 4, 5], target: 9 }, expected: [3, 4] }
      ],

      theory: {
        description:
          "The Two Sum problem asks: given an array of integers and a target value, find the indices of two numbers that add up to the target.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },

      keyPoints: [
        "Use a hash map to store complement → index",
        "Single pass through the array",
      ],

      pros: ["O(n) time — far better than the O(n²) brute force", "Clean implementation"],
      cons: ["Requires O(n) extra space for the hash map"],

      input: { array: [2, 7, 11, 15], target: 9 },

      animationSteps: [
        {
          array: [2, 7, 11, 15],
          active: [0],
          found: false,
          message: "i=0, val=2. Complement = 9-2 = 7. Not in map. Store {2:0}.",
        },
        {
          array: [2, 7, 11, 15],
          active: [1],
          found: false,
          message: "i=1, val=7. Complement = 9-7 = 2. Found 2 in map at index 0!",
        },
        {
          array: [2, 7, 11, 15],
          active: [0, 1],
          found: true,
          message: "Result: indices [0, 1]. Values 2 + 7 = 9.",
        },
      ],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "input",
            type: "ioNode",
            data: { label: "Input array A, target", background: "#fef3c7", borderColor: "#f59e0b" },
          },
          {
            id: "init",
            type: "processNode",
            data: { label: "map = {}\ni = 0", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i < n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "calc_comp",
            type: "processNode",
            data: { label: "complement = target - A[i]", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "check_map",
            type: "decisionNode",
            data: { label: "complement in map ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "found",
            type: "ioNode",
            data: { label: "Return [map[complement], i]", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "store",
            type: "processNode",
            data: { label: "map[A[i]] = i\ni = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "not_found",
            type: "ioNode",
            data: { label: "No solution found", background: "#e9d5ff", borderColor: "#8b5cf6" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "init" },
          { id: "e3", source: "init", target: "check_i" },
          { id: "e4", source: "check_i", target: "calc_comp", label: "Yes" },
          { id: "e5", source: "check_i", target: "not_found", label: "No" },
          { id: "e6", source: "calc_comp", target: "check_map" },
          { id: "e7", source: "check_map", target: "found", label: "Yes" },
          { id: "e8", source: "check_map", target: "store", label: "No" },
          { id: "e9", source: "store", target: "check_i" },
          { id: "e10", source: "found", target: "end" },
          { id: "e11", source: "not_found", target: "end" },
        ],
      },

      code: {
        javascript: `function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map[complement] !== undefined) {
      return [map[complement], i];
    }
    map[nums[i]] = i;
  }
  return [];
}`,
        python: `def two_sum(nums: list, target: int) -> list:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`
      },

      pseudocode: {
        lines: [
          "Procedure two_sum",
          "   A ← input array",
          "   target ← desired sum",
          "   map ← empty hash map",
          "",
          "   for i = 0 to n-1",
          "      complement ← target - A[i]",
          "",
          "      if complement is in map",
          "         return [map[complement], i]",
          "",
          "      map[A[i]] ← i",
          "",
          "   return NOT FOUND",
          "end procedure",
        ],
      },

      verified: true,
    },

    // =========================
    // ✅ BUBBLE SORT (Level 9)
    // =========================
    {
      order: 9,
      slug: "bubble-sort",
      title: "Bubble Sort",
      category: "Sorting",

      description: "Write a function that sorts an array using the bubble sort algorithm.",

      examples: [
        {
          input: { arr: [5, 3, 8, 4, 2] },
          output: [2, 3, 4, 5, 8],
          explanation: "Array sorted in ascending order"
        },
        {
          input: { arr: [1, 2, 3] },
          output: [1, 2, 3],
          explanation: "Already sorted array"
        }
      ],

      testCases: [
        { input: { arr: [5, 3, 8, 4, 2] }, expected: [2, 3, 4, 5, 8] },
        { input: { arr: [1, 2, 3] }, expected: [1, 2, 3] },
        { input: { arr: [3, 2, 1] }, expected: [1, 2, 3] },
        { input: { arr: [1] }, expected: [1] },
        { input: { arr: [] }, expected: [] }
      ],

      theory: {
        description:
          "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Repeatedly compares adjacent elements",
        "Largest element moves to end in each pass",
      ],

      pros: ["Easy to understand and implement", "No extra memory required"],
      cons: ["Very slow for large datasets", "O(n^2) time complexity"],

      input: { array: [5, 3, 8, 4], target: null },

      animationSteps: [],

      flowChartData: {
        rawNodes: [
          {
            id: "start",
            type: "terminalNode",
            data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
          },
          {
            id: "init_i",
            type: "processNode",
            data: { label: "i = 0", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i < n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "init_j",
            type: "processNode",
            data: { label: "j = 0", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_j",
            type: "decisionNode",
            data: { label: "j < n-i-1 ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: { label: "arr[j] > arr[j+1] ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "swap",
            type: "processNode",
            data: { label: "Swap arr[j], arr[j+1]", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "inc_j",
            type: "processNode",
            data: { label: "j++", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "inc_i",
            type: "processNode",
            data: { label: "i++", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "sorted",
            type: "terminalNode",
            data: { label: "Sorted", background: "#d1fae5", borderColor: "#10b981" },
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
        javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
        python: `def bubble_sort(arr: list) -> list:
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`
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
  ];

  await Algorithm.insertMany(algorithms);

  console.log(`✅ ${algorithms.length} algorithms seeded successfully`);
  process.exit();
};

seed();
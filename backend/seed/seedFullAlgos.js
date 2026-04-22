import connectDB from "../config/db.js";
import Algorithm from "../models/Algorithm.js";

const seed = async () => {
  await connectDB();

  // reset
  await Algorithm.deleteMany();

  await Algorithm.insertMany([
    // =========================
    // ✅ PALINDROME CHECK
    // =========================
    {
      slug: "palindrome-check",
      title: "Palindrome Check",
      category: "Fundamentals",

      theory: {
        description:
          "A Palindrome Check determines whether a given string or array reads the same forwards and backwards. The classic approach uses two pointers — one starting at the beginning and one at the end — comparing characters and moving inward until they meet. If every pair matches, the input is a palindrome.",

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
        "Not applicable to non-sequential structures",
      ],

      input: {
        array: ["r", "a", "c", "e", "c", "a", "r"],
        target: null,
      },

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
        javascript:
          "function isPalindrome(s) { let left = 0, right = s.length - 1; while (left < right) { if (s[left] !== s[right]) return false; left++; right--; } return true; }",
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
    // ✅ FACTORIAL
    // =========================
    {
      slug: "factorial",
      title: "Factorial",
      category: "Fundamentals",

      theory: {
        description:
          "Factorial of a non-negative integer n (written as n!) is the product of all positive integers from 1 to n. It is defined recursively as n! = n × (n-1)! with the base case 0! = 1. Factorial appears in combinatorics, probability, and many algorithm analyses.",

        timeComplexity: "O(n)",
        spaceComplexity: "O(1) iterative / O(n) recursive",
      },

      keyPoints: [
        "Defined as n × (n-1) × ... × 1",
        "Base case: 0! = 1",
        "Can be computed iteratively or recursively",
      ],

      pros: [
        "Simple concept and implementation",
        "Iterative version uses constant space",
        "Foundational for combinatorics and DP",
      ],

      cons: [
        "Grows extremely fast — overflows for large n",
        "Recursive version has O(n) call stack depth",
        "Not directly useful without big-integer support for large n",
      ],

      input: {
        array: [5],
        target: null,
      },

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
        javascript:
          "function factorial(n) { let result = 1; for (let i = 1; i <= n; i++) { result *= i; } return result; }",
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
    // ✅ PRIME NUMBER CHECK
    // =========================
    {
      slug: "prime-number-check",
      title: "Prime Number Check",
      category: "Fundamentals",

      theory: {
        description:
          "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. The optimized check only tests divisors up to the square root of n, because if n has a factor larger than √n, the corresponding co-factor must be smaller than √n and would have been found already.",

        timeComplexity: "O(√n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Only test divisors up to √n",
        "Handle edge cases: n < 2 is not prime",
        "Even numbers (except 2) are not prime",
      ],

      pros: [
        "O(√n) is much faster than O(n) trial division",
        "Constant space usage",
        "Easy to implement",
      ],

      cons: [
        "Slow for very large numbers (use Miller-Rabin for cryptography)",
        "Not a sieve — checks one number at a time",
        "Repeated calls are not amortized",
      ],

      input: {
        array: [17],
        target: null,
      },

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
        javascript:
          "function isPrime(n) { if (n < 2) return false; for (let i = 2; i <= Math.sqrt(n); i++) { if (n % i === 0) return false; } return true; }",
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
    // ✅ REVERSE A STRING/ARRAY
    // =========================
    {
      slug: "reverse-string-array",
      title: "Reverse a String/Array",
      category: "Fundamentals",

      theory: {
        description:
          "Reversing a string or array means rearranging its elements so that the last element becomes first and the first becomes last. The in-place two-pointer technique swaps elements at the start and end, moving both pointers inward, achieving reversal without any extra memory.",

        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Two-pointer swap from both ends toward center",
        "In-place: no extra array needed",
        "Works identically for strings and arrays",
      ],

      pros: [
        "Linear time, constant space",
        "Simple and universally applicable",
        "Can be used as a building block in more complex algorithms",
      ],

      cons: [
        "In-place mutation — need a copy if original must be preserved",
        "String reversal in some languages requires conversion to array first",
        "Not applicable to non-indexed data structures like linked lists without modification",
      ],

      input: {
        array: [1, 2, 3, 4, 5],
        target: null,
      },

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
        javascript:
          "function reverse(arr) { let left = 0, right = arr.length - 1; while (left < right) { [arr[left], arr[right]] = [arr[right], arr[left]]; left++; right--; } return arr; }",
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
    // ✅ TWO SUM PROBLEM
    // =========================
    {
      slug: "two-sum",
      title: "Two Sum Problem",
      category: "Arrays",

      theory: {
        description:
          "The Two Sum problem asks: given an array of integers and a target value, find the indices of two numbers that add up to the target. The naive approach checks every pair in O(n²). The optimal approach uses a hash map to store each number's complement as we iterate, achieving O(n) time by looking up whether the required partner of the current element has already been seen.",

        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },

      keyPoints: [
        "Use a hash map to store complement → index",
        "For each element, check if its complement exists in the map",
        "Single pass through the array",
      ],

      pros: [
        "O(n) time — far better than the O(n²) brute force",
        "Clean and concise implementation",
        "Classic interview problem with real-world applications",
      ],

      cons: [
        "Requires O(n) extra space for the hash map",
        "Assumes exactly one valid answer exists",
        "Hash collisions can degrade performance in pathological cases",
      ],

      input: {
        array: [2, 7, 11, 15],
        target: 9,
      },

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
        javascript:
          "function twoSum(nums, target) { const map = {}; for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map[complement] !== undefined) return [map[complement], i]; map[nums[i]] = i; } return []; }",
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

    // =========================
    // ✅ SELECTION SORT
    // =========================
    {
      slug: "selection-sort",
      title: "Selection Sort",
      category: "Sorting",

      theory: {
        description:
          "Selection Sort divides the array into a sorted left portion and an unsorted right portion. In each pass, it finds the minimum element from the unsorted portion and swaps it into its correct position at the boundary. After n-1 passes the entire array is sorted.",

        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Finds the minimum element in each pass",
        "Places minimum at the correct sorted position",
        "Performs at most n-1 swaps",
      ],

      pros: [
        "Simple to understand and implement",
        "Minimum number of swaps compared to bubble sort",
        "In-place — no extra memory needed",
      ],

      cons: [
        "O(n^2) even if array is already sorted",
        "Not stable by default",
        "Inefficient for large datasets",
      ],

      input: {
        array: [64, 25, 12, 22, 11],
        target: null,
      },

      animationSteps: [
        {
          array: [64, 25, 12, 22, 11],
          active: [0, 1, 2, 3, 4],
          found: false,
          message: "Pass 1: Find min in [64,25,12,22,11]. Min = 11 at index 4.",
        },
        {
          array: [11, 25, 12, 22, 64],
          active: [0],
          found: false,
          message: "Swap index 0 and 4. [11,25,12,22,64]. Index 0 sorted.",
        },
        {
          array: [11, 25, 12, 22, 64],
          active: [1, 2, 3, 4],
          found: false,
          message: "Pass 2: Find min in [25,12,22,64]. Min = 12 at index 2.",
        },
        {
          array: [11, 12, 25, 22, 64],
          active: [1],
          found: false,
          message: "Swap index 1 and 2. [11,12,25,22,64]. Indices 0-1 sorted.",
        },
        {
          array: [11, 12, 22, 25, 64],
          active: [0, 1, 2, 3, 4],
          found: true,
          message: "Continuing passes... Array fully sorted!",
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
            id: "init_i",
            type: "processNode",
            data: { label: "i = 0", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i < n-1 ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "init_min",
            type: "processNode",
            data: { label: "minIdx = i\nj = i + 1", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_j",
            type: "decisionNode",
            data: { label: "j < n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: { label: "A[j] < A[minIdx] ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "update_min",
            type: "processNode",
            data: { label: "minIdx = j", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "inc_j",
            type: "processNode",
            data: { label: "j = j + 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "check_swap",
            type: "decisionNode",
            data: { label: "minIdx ≠ i ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "swap",
            type: "processNode",
            data: { label: "Swap A[i], A[minIdx]", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "inc_i",
            type: "processNode",
            data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
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
          { id: "e3", source: "check_i", target: "init_min", label: "Yes" },
          { id: "e4", source: "check_i", target: "sorted", label: "No" },
          { id: "e5", source: "init_min", target: "check_j" },
          { id: "e6", source: "check_j", target: "compare", label: "Yes" },
          { id: "e7", source: "check_j", target: "check_swap", label: "No" },
          { id: "e8", source: "compare", target: "update_min", label: "Yes" },
          { id: "e9", source: "compare", target: "inc_j", label: "No" },
          { id: "e10", source: "update_min", target: "inc_j" },
          { id: "e11", source: "inc_j", target: "check_j" },
          { id: "e12", source: "check_swap", target: "swap", label: "Yes" },
          { id: "e13", source: "check_swap", target: "inc_i", label: "No" },
          { id: "e14", source: "swap", target: "inc_i" },
          { id: "e15", source: "inc_i", target: "check_i" },
        ],
      },

      code: {
        javascript:
          "function selectionSort(arr) { const n = arr.length; for (let i = 0; i < n - 1; i++) { let minIdx = i; for (let j = i + 1; j < n; j++) { if (arr[j] < arr[minIdx]) minIdx = j; } if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; } return arr; }",
      },

      pseudocode: {
        lines: [
          "Procedure selection_sort",
          "   A ← array",
          "   n ← size of array",
          "",
          "   for i = 0 to n-2",
          "      minIdx ← i",
          "",
          "      for j = i+1 to n-1",
          "         if A[j] < A[minIdx]",
          "            minIdx ← j",
          "",
          "      if minIdx ≠ i",
          "         swap A[i], A[minIdx]",
          "",
          "   return A",
          "end procedure",
        ],
      },

      verified: true,
    },

    // =========================
    // ✅ INSERTION SORT
    // =========================
    {
      slug: "insertion-sort",
      title: "Insertion Sort",
      category: "Sorting",

      theory: {
        description:
          "Insertion Sort builds the sorted array one element at a time. It picks each new element from the unsorted portion and inserts it into its correct position within the already-sorted left portion by shifting larger elements one position to the right. It mirrors the way most people sort a hand of playing cards.",

        timeComplexity: "O(n^2)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Builds sorted portion one element at a time",
        "Shifts larger elements right to make room",
        "Highly efficient for nearly sorted arrays",
      ],

      pros: [
        "O(n) best case for already-sorted input",
        "In-place and stable",
        "Efficient for small or nearly sorted datasets",
      ],

      cons: [
        "O(n^2) worst case for reverse-sorted input",
        "Slow for large unsorted datasets",
        "More writes per element than selection sort",
      ],

      input: {
        array: [9, 5, 1, 4, 3],
        target: null,
      },

      animationSteps: [
        {
          array: [9, 5, 1, 4, 3],
          active: [1],
          found: false,
          message: "key = 5. Compare with 9: 9 > 5, shift right. Insert 5. [5,9,1,4,3]",
        },
        {
          array: [5, 9, 1, 4, 3],
          active: [2],
          found: false,
          message: "key = 1. Shift 9 and 5 right. Insert 1. [1,5,9,4,3]",
        },
        {
          array: [1, 5, 9, 4, 3],
          active: [3],
          found: false,
          message: "key = 4. Shift 9 and 5 right. Insert 4. [1,4,5,9,3]",
        },
        {
          array: [1, 4, 5, 9, 3],
          active: [4],
          found: false,
          message: "key = 3. Shift 9, 5, 4 right. Insert 3. [1,3,4,5,9]",
        },
        {
          array: [1, 3, 4, 5, 9],
          active: [0, 1, 2, 3, 4],
          found: true,
          message: "Array fully sorted!",
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
            id: "init_i",
            type: "processNode",
            data: { label: "i = 1", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i < n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "set_key",
            type: "processNode",
            data: { label: "key = A[i]\nj = i - 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "check_j",
            type: "decisionNode",
            data: { label: "j ≥ 0 AND A[j] > key ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "shift",
            type: "processNode",
            data: { label: "A[j+1] = A[j]\nj = j - 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "insert",
            type: "processNode",
            data: { label: "A[j+1] = key", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "inc_i",
            type: "processNode",
            data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
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
          { id: "e3", source: "check_i", target: "set_key", label: "Yes" },
          { id: "e4", source: "check_i", target: "sorted", label: "No" },
          { id: "e5", source: "set_key", target: "check_j" },
          { id: "e6", source: "check_j", target: "shift", label: "Yes" },
          { id: "e7", source: "check_j", target: "insert", label: "No" },
          { id: "e8", source: "shift", target: "check_j" },
          { id: "e9", source: "insert", target: "inc_i" },
          { id: "e10", source: "inc_i", target: "check_i" },
        ],
      },

      code: {
        javascript:
          "function insertionSort(arr) { for (let i = 1; i < arr.length; i++) { let key = arr[i]; let j = i - 1; while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; } arr[j + 1] = key; } return arr; }",
      },

      pseudocode: {
        lines: [
          "Procedure insertion_sort",
          "   A ← array",
          "   n ← size of array",
          "",
          "   for i = 1 to n-1",
          "      key ← A[i]",
          "      j ← i - 1",
          "",
          "      while j ≥ 0 AND A[j] > key",
          "         A[j+1] ← A[j]",
          "         j ← j - 1",
          "",
          "      A[j+1] ← key",
          "",
          "   return A",
          "end procedure",
        ],
      },

      verified: true,
    },

    // =========================
    // ✅ FIBONACCI
    // =========================
    {
      slug: "fibonacci",
      title: "Fibonacci",
      category: "Dynamic Programming",

      theory: {
        description:
          "The Fibonacci sequence is a series where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, … The naive recursive solution recomputes subproblems exponentially. The iterative (bottom-up DP) approach stores only the previous two values and computes each term in O(1), yielding O(n) overall with O(1) space.",

        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },

      keyPoints: [
        "Each term is the sum of the two before it",
        "Naive recursion is O(2^n) — avoid it",
        "Iterative approach achieves O(n) time, O(1) space",
      ],

      pros: [
        "Classic introduction to dynamic programming",
        "Iterative version is extremely memory efficient",
        "Foundation for more complex DP problems",
      ],

      cons: [
        "Naive recursive version is exponential",
        "Integer overflow for large n without big-integer libraries",
        "Memoized recursive version still uses O(n) stack space",
      ],

      input: {
        array: [7],
        target: null,
      },

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
        javascript:
          "function fibonacci(n) { if (n <= 1) return n; let prev = 0, curr = 1; for (let i = 2; i <= n; i++) { let next = prev + curr; prev = curr; curr = next; } return curr; }",
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
    // ✅ 0/1 KNAPSACK
    // =========================
    {
      slug: "01-knapsack",
      title: "0/1 Knapsack",
      category: "Dynamic Programming",

      theory: {
        description:
          "The 0/1 Knapsack problem asks: given n items each with a weight and value, and a knapsack with a weight capacity W, determine the maximum value that can be packed without exceeding W. Each item can only be taken once (0 or 1 times). The DP solution builds a 2D table dp[i][w] representing the best value using the first i items with capacity w.",

        timeComplexity: "O(n × W)",
        spaceComplexity: "O(n × W)",
      },

      keyPoints: [
        "Each item is either included (1) or excluded (0)",
        "Build a DP table of size (n+1) × (W+1)",
        "Recurrence: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]])",
      ],

      pros: [
        "Guaranteed optimal solution via DP",
        "Polynomial time — feasible for moderate n and W",
        "Foundation for many resource allocation problems",
      ],

      cons: [
        "Pseudo-polynomial: slow when W is very large",
        "O(n×W) space can be large (reducible to O(W) with 1D DP)",
        "Not applicable to fractional item problems (use Greedy instead)",
      ],

      input: {
        array: [60, 100, 120],
        target: 50,
      },

      animationSteps: [
        {
          array: [60, 100, 120],
          active: [],
          found: false,
          message: "Items: weights=[10,20,30], values=[60,100,120], capacity=50",
        },
        {
          array: [60, 100, 120],
          active: [0],
          found: false,
          message: "Fill row 1 (item weight=10): include if w≥10.",
        },
        {
          array: [60, 100, 120],
          active: [1],
          found: false,
          message: "Fill row 2 (item weight=20): max(exclude, include) at each capacity.",
        },
        {
          array: [60, 100, 120],
          active: [2],
          found: false,
          message: "Fill row 3 (item weight=30): max(exclude, include) at each capacity.",
        },
        {
          array: [60, 100, 120],
          active: [0, 1, 2],
          found: true,
          message: "dp[3][50] = 220. Maximum value = 220 (items 2 and 3).",
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
            data: { label: "Input weights[], values[]\nn items, capacity W", background: "#fef3c7", borderColor: "#f59e0b" },
          },
          {
            id: "init_table",
            type: "processNode",
            data: { label: "Create dp[n+1][W+1]\nInit all to 0", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "init_i",
            type: "processNode",
            data: { label: "i = 1", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_i",
            type: "decisionNode",
            data: { label: "i ≤ n ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "init_w",
            type: "processNode",
            data: { label: "w = 0", background: "#fecaca", borderColor: "#ef4444" },
          },
          {
            id: "check_w",
            type: "decisionNode",
            data: { label: "w ≤ W ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "check_weight",
            type: "decisionNode",
            data: { label: "wt[i] ≤ w ?", background: "#dbeafe", borderColor: "#3b82f6" },
          },
          {
            id: "include",
            type: "processNode",
            data: { label: "dp[i][w] = max(\n  dp[i-1][w],\n  val[i] + dp[i-1][w-wt[i]]\n)", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "exclude",
            type: "processNode",
            data: { label: "dp[i][w] = dp[i-1][w]", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "inc_w",
            type: "processNode",
            data: { label: "w = w + 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "inc_i",
            type: "processNode",
            data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
          },
          {
            id: "output",
            type: "ioNode",
            data: { label: "Return dp[n][W]", background: "#bbf7d0", borderColor: "#22c55e" },
          },
          {
            id: "end",
            type: "terminalNode",
            data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "input" },
          { id: "e2", source: "input", target: "init_table" },
          { id: "e3", source: "init_table", target: "init_i" },
          { id: "e4", source: "init_i", target: "check_i" },
          { id: "e5", source: "check_i", target: "init_w", label: "Yes" },
          { id: "e6", source: "check_i", target: "output", label: "No" },
          { id: "e7", source: "init_w", target: "check_w" },
          { id: "e8", source: "check_w", target: "check_weight", label: "Yes" },
          { id: "e9", source: "check_w", target: "inc_i", label: "No" },
          { id: "e10", source: "check_weight", target: "include", label: "Yes" },
          { id: "e11", source: "check_weight", target: "exclude", label: "No" },
          { id: "e12", source: "include", target: "inc_w" },
          { id: "e13", source: "exclude", target: "inc_w" },
          { id: "e14", source: "inc_w", target: "check_w" },
          { id: "e15", source: "inc_i", target: "check_i" },
          { id: "e16", source: "output", target: "end" },
        ],
      },

      code: {
        javascript:
          "function knapsack(weights, values, W) { const n = weights.length; const dp = Array.from({length: n+1}, () => new Array(W+1).fill(0)); for (let i = 1; i <= n; i++) { for (let w = 0; w <= W; w++) { dp[i][w] = dp[i-1][w]; if (weights[i-1] <= w) { dp[i][w] = Math.max(dp[i][w], values[i-1] + dp[i-1][w - weights[i-1]]); } } } return dp[n][W]; }",
      },

      pseudocode: {
        lines: [
          "Procedure knapsack_01",
          "   weights[], values[] ← item weights and values",
          "   n ← number of items",
          "   W ← knapsack capacity",
          "",
          "   dp[0..n][0..W] ← all zeros",
          "",
          "   for i = 1 to n",
          "      for w = 0 to W",
          "         dp[i][w] ← dp[i-1][w]   // exclude item i",
          "",
          "         if weights[i] ≤ w",
          "            dp[i][w] ← max(dp[i][w],",
          "                          values[i] + dp[i-1][w - weights[i]])",
          "",
          "   return dp[n][W]",
          "end procedure",
        ],
      },

      verified: true,
    },
  ]);

  console.log("✅ All 12 algorithms seeded successfully");
  process.exit();
};

seed();
import connectDB from "../config/db.js";
import Algorithm from "../models/Algorithm.js";

const seed = async () => {
  await connectDB();

  await Algorithm.deleteMany();

  const algorithms = [
    // 1. Palindrome Check
    {
      order: 1,
      slug: "palindrome-check",
      title: "Palindrome Check",
      category: "Fundamentals",
      description:
        "Write a function that returns true if a given string reads the same forwards and backwards, and false otherwise.",
      problem: {
        statement:
          "Given a string s, return true if it is a palindrome, false otherwise.",
        inputFormat:
          "A single string s (may contain letters, digits, spaces, punctuation).",
        outputFormat: "Boolean true/false.",
        constraints: "1 ≤ s.length ≤ 10^5",
        starterCode: {
          python: `def is_palindrome(s: str) -> bool:
    #edit below this line to solve the problem


def solve():
    s = input().strip()
    result = is_palindrome(s)
    print(str(result).lower())


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        {
          input: "racecar",
          output: true,
          explanation: "racecar reads the same forwards and backwards",
        },
        {
          input: "hello",
          output: false,
          explanation: "hello reversed is 'olleh', which is different",
        },
      ],
      testCases: [
        { input: "racecar", expected: true },
        { input: "hello", expected: false },
        { input: "A", expected: true },
        { input: "ab", expected: false },
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
              label: "Input string s",
              background: "#fef3c7",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "init",
            type: "processNode",
            data: {
              label: "left = 0\nright = n - 1",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "check_pointers",
            type: "decisionNode",
            data: {
              label: "left < right ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "compare",
            type: "decisionNode",
            data: {
              label: "s[left] == s[right] ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "not_palindrome",
            type: "ioNode",
            data: {
              label: "Not a Palindrome",
              background: "#e9d5ff",
              borderColor: "#8b5cf6",
            },
          },
          {
            id: "move_pointers",
            type: "processNode",
            data: {
              label: "left++\nright--",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "palindrome",
            type: "ioNode",
            data: {
              label: "Is a Palindrome",
              background: "#bbf7d0",
              borderColor: "#22c55e",
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
          { id: "e3", source: "init", target: "check_pointers" },
          {
            id: "e4",
            source: "check_pointers",
            target: "compare",
            label: "Yes",
          },
          {
            id: "e5",
            source: "check_pointers",
            target: "palindrome",
            label: "No",
            sourceHandle: "right",
          },
          {
            id: "e6",
            source: "compare",
            target: "move_pointers",
            label: "Yes",
          },
          {
            id: "e7",
            source: "compare",
            target: "not_palindrome",
            label: "No",
            sourceHandle: "left",
          },
          { id: "e8", source: "move_pointers", target: "check_pointers" },
          { id: "e9", source: "palindrome", target: "end" },
          { id: "e10", source: "not_palindrome", target: "end" },
        ],
      },
      code: {
        python: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`,
      },
      pseudocode: {
        lines: [
          "Procedure palindrome_check",
          "   s ← input string",
          "   left ← 0",
          "   right ← length(s) - 1",
          "   while left < right",
          "      if s[left] ≠ s[right]",
          "         return NOT PALINDROME",
          "      left ← left + 1",
          "      right ← right - 1",
          "   return PALINDROME",
          "end procedure",
        ],
      },
      verified: true,
    },

    // 2. Sum of Two Numbers
    {
      order: 2,
      slug: "sum-of-two-numbers",
      title: "Sum of Two Numbers",
      category: "Basic Math",
      description:
        "Write a function that takes two integers and returns their sum.",
      problem: {
        statement: "Given two integers a and b, return their sum.",
        inputFormat: "Two space‑separated integers a and b.",
        outputFormat: "A single integer representing a + b.",
        constraints: "-10^9 ≤ a, b ≤ 10^9",
        starterCode: {
          python: `def add(a: int, b: int) -> int:
    #edit below this line to solve the problem


def solve():
    a, b = map(int, input().split())
    result = add(a, b)
    print(result)


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        { input: "2 3", output: 5, explanation: "2 + 3 = 5" },
        { input: "-1 5", output: 4, explanation: "-1 + 5 = 4" },
      ],
      testCases: [
        { input: "1 1", expected: 2 },
        { input: "10 -3", expected: 7 },
        { input: "0 0", expected: 0 },
        { input: "-5 -7", expected: -12 },
      ],
      theory: {
        description:
          "Addition is the most basic arithmetic operation. In programming, the + operator performs addition.",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
      },
      keyPoints: ["Use the + operator", "Handle negative numbers correctly"],
      pros: ["Trivial to implement", "Constant time"],
      cons: ["Too simple for experienced developers"],
      input: { array: [5, 7], target: null },
      animationSteps: [
        {
          array: [5, 7],
          active: [0],
          found: false,
          message: "Read first number: 5",
        },
        {
          array: [5, 7],
          active: [1],
          found: false,
          message: "Read second number: 7",
        },
        {
          array: [5, 7],
          active: [0, 1],
          found: true,
          message: "Add them: 5 + 7 = 12. Return 12.",
        },
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
              label: "Read a and b",
              background: "#fef3c7",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "calc",
            type: "processNode",
            data: {
              label: "sum = a + b",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "output",
            type: "ioNode",
            data: {
              label: "Print sum",
              background: "#bbf7d0",
              borderColor: "#22c55e",
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
          { id: "e2", source: "input", target: "calc" },
          { id: "e3", source: "calc", target: "output" },
          { id: "e4", source: "output", target: "end" },
        ],
      },
      code: {
        python: `def add(a: int, b: int) -> int:
    return a + b`,
      },
      pseudocode: {
        lines: ["function add(a, b)", "   return a + b", "end function"],
      },
      verified: true,
    },

    // 3. Maximum of Three Numbers
    {
      order: 3,
      slug: "maximum-of-three",
      title: "Maximum of Three Numbers",
      category: "Basic Math",
      description:
        "Write a function that returns the largest of three given integers.",
      problem: {
        statement:
          "Given three integers a, b, c, return the maximum value among them.",
        inputFormat: "Three space‑separated integers a b c.",
        outputFormat: "A single integer – the maximum.",
        constraints: "-10^9 ≤ a, b, c ≤ 10^9",
        starterCode: {
          python: `def max_of_three(a: int, b: int, c: int) -> int:
    #edit below this line to solve the problem


def solve():
    a, b, c = map(int, input().split())
    result = max_of_three(a, b, c)
    print(result)


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        { input: "5 9 2", output: 9, explanation: "9 is the largest" },
        {
          input: "-1 -5 -3",
          output: -1,
          explanation: "-1 is the largest (closest to zero)",
        },
      ],
      testCases: [
        { input: "10 20 15", expected: 20 },
        { input: "7 7 7", expected: 7 },
        { input: "-10 -20 -5", expected: -5 },
      ],
      theory: {
        description:
          "Compare numbers using if‑else or the built‑in max function. Understanding conditional logic is key.",
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
      },
      keyPoints: [
        "Use nested if statements or logical operators",
        "Edge case: equal numbers",
      ],
      pros: ["Teaches conditionals", "Simple"],
      cons: ["Trivial for advanced users"],
      input: { array: [12, 45, 23], target: null },
      animationSteps: [
        {
          array: [12, 45, 23],
          active: [0, 1],
          found: false,
          message: "Compare 12 and 45 → max = 45",
        },
        {
          array: [12, 45, 23],
          active: [1, 2],
          found: false,
          message: "Compare 45 and 23 → max = 45",
        },
        {
          array: [12, 45, 23],
          active: [1],
          found: true,
          message: "Final maximum is 45",
        },
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
            id: "cmp1",
            type: "decisionNode",
            data: {
              label: "a ≥ b ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "cmp2",
            type: "decisionNode",
            data: {
              label: "a ≥ c ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "cmp3",
            type: "decisionNode",
            data: {
              label: "b ≥ c ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "out_a",
            type: "ioNode",
            data: {
              label: "return a",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
          {
            id: "out_b",
            type: "ioNode",
            data: {
              label: "return b",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
          {
            id: "out_c",
            type: "ioNode",
            data: {
              label: "return c",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "cmp1" },
          {
            id: "e2",
            source: "cmp1",
            target: "cmp2",
            label: "Yes",
            sourceHandle: "left",
          },
          {
            id: "e3",
            source: "cmp1",
            target: "cmp3",
            label: "No",
            sourceHandle: "right",
          },
          { id: "e4", source: "cmp2", target: "out_a", label: "Yes" },
          {
            id: "e5",
            source: "cmp2",
            target: "out_c",
            label: "No",
            sourceHandle: "right",
          },
          {
            id: "e6",
            source: "cmp3",
            target: "out_b",
            label: "Yes",
            sourceHandle: "right",
          },
          { id: "e7", source: "cmp3", target: "out_c", label: "No" },
        ],
      },
      code: {
        python: `def max_of_three(a: int, b: int, c: int) -> int:
    return max(a, b, c)`,
      },
      pseudocode: {
        lines: [
          "function maxOfThree(a, b, c)",
          "   if a >= b and a >= c: return a",
          "   if b >= a and b >= c: return b",
          "   return c",
          "end function",
        ],
      },
      verified: true,
    },

    // 4. Factorial (iterative)
    {
      order: 4,
      slug: "factorial",
      title: "Factorial",
      category: "Basic Math",
      description:
        "Compute the factorial of a non‑negative integer n (n! = n × (n‑1) × ... × 1, with 0! = 1).",
      problem: {
        statement: "Given a non‑negative integer n, return n! (n factorial).",
        inputFormat: "A single integer n.",
        outputFormat: "Integer representing n!.",
        constraints: "0 ≤ n ≤ 20",
        starterCode: {
          python: `def factorial(n: int) -> int:
    #edit below this line to solve the problem


def solve():
    n = int(input().strip())
    result = factorial(n)
    print(result)


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        { input: "5", output: 120, explanation: "5! = 5×4×3×2×1 = 120" },
        { input: "0", output: 1, explanation: "0! is defined as 1" },
      ],
      testCases: [
        { input: "0", expected: 1 },
        { input: "1", expected: 1 },
        { input: "4", expected: 24 },
        { input: "6", expected: 720 },
      ],
      theory: {
        description:
          "Factorial can be computed using a loop (iterative) or recursion. The iterative method avoids stack overflow.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      keyPoints: [
        "Base case: 0! = 1",
        "Use a for loop to multiply from 1 to n",
      ],
      pros: ["Simple loop", "No recursion overhead"],
      cons: ["Values grow quickly", "Only works for small n"],
      input: { array: [5], target: null },
      animationSteps: [
        {
          array: [5],
          active: [0],
          found: false,
          message: "n = 5. Start result = 1, i = 1",
        },
        {
          array: [5],
          active: [0],
          found: false,
          message: "i = 1 → result = 1 * 1 = 1",
        },
        {
          array: [5],
          active: [0],
          found: false,
          message: "i = 2 → result = 1 * 2 = 2",
        },
        {
          array: [5],
          active: [0],
          found: false,
          message: "i = 3 → result = 2 * 3 = 6",
        },
        {
          array: [5],
          active: [0],
          found: false,
          message: "i = 4 → result = 6 * 4 = 24",
        },
        {
          array: [5],
          active: [0],
          found: true,
          message: "i = 5 → result = 24 * 5 = 120. Return 120",
        },
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
              label: "result = 1",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "loop",
            type: "decisionNode",
            data: {
              label: "i = 1 to n ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "multiply",
            type: "processNode",
            data: {
              label: "result = result × i",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "output",
            type: "ioNode",
            data: {
              label: "Return result",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "init" },
          { id: "e2", source: "init", target: "loop" },
          { id: "e3", source: "loop", target: "multiply", label: "Yes" },
          { id: "e4", source: "multiply", target: "loop" },
          { id: "e5", source: "loop", target: "output", label: "No" },
        ],
      },
      code: {
        python: `def factorial(n: int) -> int:
    result = 1
    for i in range(2, n+1):
        result *= i
    return result`,
      },
      pseudocode: {
        lines: [
          "function factorial(n)",
          "   result = 1",
          "   for i = 2 to n",
          "       result = result × i",
          "   return result",
          "end function",
        ],
      },
      verified: true,
    },

    // 5. Linear Search
    {
      order: 5,
      slug: "linear-search",
      title: "Linear Search",
      category: "Searching",
      description:
        "Find the index of a target value in an array by checking each element one by one.",
      problem: {
        statement:
          "Given an array of integers arr and an integer target, return the index of target if it exists, otherwise return -1.",
        inputFormat:
          "First line: space‑separated integers (array). Second line: target integer.",
        outputFormat: "Integer index or -1.",
        constraints: "1 ≤ arr.length ≤ 10^4, -10^9 ≤ arr[i], target ≤ 10^9",
        starterCode: {
          python: `def linear_search(arr: list, target: int) -> int:
    #edit below this line to solve the problem


def solve():
    arr = list(map(int, input().split()))
    target = int(input().strip())
    result = linear_search(arr, target)
    print(result)


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        { input: "4 2 7 1 9\n7", output: 2, explanation: "7 is at index 2" },
        { input: "4 2 7 1 9\n5", output: -1, explanation: "5 not found" },
      ],
      testCases: [
        { input: "10 20 30\n20", expected: 1 },
        { input: "5\n5", expected: 0 },
        { input: "1 2 3\n4", expected: -1 },
      ],
      theory: {
        description:
          "Linear search iterates through the array from start to end, comparing each element with the target. It works on unsorted data.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      keyPoints: [
        "Works on any array (sorted or unsorted)",
        "Simple but slow for large arrays",
      ],
      pros: ["No preprocessing needed", "Works with any data type"],
      cons: ["Slow for large data sets (O(n))"],
      input: { array: [4, 2, 7, 1, 9], target: 7 },
      animationSteps: [
        {
          array: [4, 2, 7, 1, 9],
          active: [0],
          found: false,
          message: "Check index 0: 4 != 7",
        },
        {
          array: [4, 2, 7, 1, 9],
          active: [1],
          found: false,
          message: "Check index 1: 2 != 7",
        },
        {
          array: [4, 2, 7, 1, 9],
          active: [2],
          found: true,
          message: "Check index 2: 7 == 7 → found",
        },
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
              label: "i = 0",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "loop",
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
              label: "arr[i] == target ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "increment",
            type: "processNode",
            data: {
              label: "i++",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "found",
            type: "ioNode",
            data: {
              label: "Return i",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
          {
            id: "not_found",
            type: "ioNode",
            data: {
              label: "Return -1",
              background: "#e9d5ff",
              borderColor: "#8b5cf6",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "init" },
          { id: "e2", source: "init", target: "loop" },
          { id: "e3", source: "loop", target: "compare", label: "Yes" },
          { id: "e4", source: "compare", target: "found", label: "Yes" },
          { id: "e5", source: "compare", target: "increment", label: "No" },
          { id: "e6", source: "increment", target: "loop" },
          { id: "e7", source: "loop", target: "not_found", label: "No" },
        ],
      },
      code: {
        python: `def linear_search(arr: list, target: int) -> int:
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`,
      },
      pseudocode: {
        lines: [
          "function linearSearch(arr, target)",
          "   for i = 0 to length(arr)-1",
          "       if arr[i] == target then return i",
          "   return -1",
          "end function",
        ],
      },
      verified: true,
    },

    // 6. Bubble Sort
    {
      order: 6,
      slug: "bubble-sort",
      title: "Bubble Sort",
      category: "Sorting",
      description:
        "Sort an array by repeatedly swapping adjacent elements if they are in the wrong order.",
      problem: {
        statement:
          "Given an array of integers, sort it in ascending order using the bubble sort algorithm.",
        inputFormat: "Space‑separated integers.",
        outputFormat:
          "Same integers sorted in ascending order, space‑separated.",
        constraints: "1 ≤ n ≤ 10^3, -10^5 ≤ arr[i] ≤ 10^5",
        starterCode: {
          python: `def bubble_sort(arr: list) -> list:
    #edit below this line to solve the problem


def solve():
    arr = list(map(int, input().split()))
    sorted_arr = bubble_sort(arr)
    print(' '.join(map(str, sorted_arr)))


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        {
          input: "5 1 4 2 8",
          output: [1, 2, 4, 5, 8],
          explanation: "After bubble sort passes, the array becomes sorted.",
        },
      ],
      testCases: [
        {
          input: "64 34 25 12 22 11 90",
          expected: [11, 12, 22, 25, 34, 64, 90],
        },
        { input: "1 2 3 4 5", expected: [1, 2, 3, 4, 5] },
        { input: "5 4 3 2 1", expected: [1, 2, 3, 4, 5] },
      ],
      theory: {
        description:
          "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are out of order. The largest element 'bubbles up' to its correct position at the end of each pass.",
        timeComplexity: "O(n²) worst/average, O(n) best (already sorted)",
        spaceComplexity: "O(1)",
      },
      keyPoints: [
        "In‑place sorting",
        "Stable algorithm",
        "Educational but inefficient for large datasets",
      ],
      pros: ["Simple to understand and implement", "No extra memory required"],
      cons: ["Very slow for large arrays", "Many comparisons and swaps"],
      input: { array: [5, 1, 4, 2, 8], target: null },
      animationSteps: [
        {
          array: [5, 1, 4, 2, 8],
          active: [0, 1],
          found: false,
          message: "Swap 5 and 1 → [1,5,4,2,8]",
        },
        {
          array: [1, 5, 4, 2, 8],
          active: [1, 2],
          found: false,
          message: "Swap 5 and 4 → [1,4,5,2,8]",
        },
        {
          array: [1, 4, 5, 2, 8],
          active: [2, 3],
          found: false,
          message: "Swap 5 and 2 → [1,4,2,5,8]",
        },
        {
          array: [1, 4, 2, 5, 8],
          active: [1, 2],
          found: false,
          message: "Swap 4 and 2 → [1,2,4,5,8]",
        },
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
            id: "outer",
            type: "processNode",
            data: {
              label: "for i = 0 to n-1",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "inner",
            type: "processNode",
            data: {
              label: "for j = 0 to n-i-2",
              background: "#fde68a",
              borderColor: "#f59e0b",
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
              label: "swap arr[j], arr[j+1]",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "end",
            type: "terminalNode",
            data: {
              label: "Return sorted array",
              background: "#d1fae5",
              borderColor: "#10b981",
            },
          },
        ],

        rawEdges: [
          { id: "e1", source: "start", target: "outer" },
          { id: "e2", source: "outer", target: "inner" },

          // inner loop → compare
          { id: "e3", source: "inner", target: "compare" },

          // decision branches
          { id: "e4", source: "compare", target: "swap", label: "Yes" },
          { id: "e5", source: "compare", target: "inner", label: "No" },

          // after swap → continue inner loop
          { id: "e6", source: "swap", target: "inner" },

          // when inner loop finishes → go back to outer loop
          { id: "e7", source: "inner", target: "outer" },

          // when outer loop finishes → end
          { id: "e8", source: "outer", target: "end" },
        ],
      },
      code: {
        python: `def bubble_sort(arr: list) -> list:
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
      },
      pseudocode: {
        lines: [
          "procedure bubbleSort(arr)",
          "   n = length(arr)",
          "   for i = 0 to n-1",
          "       for j = 0 to n-i-2",
          "           if arr[j] > arr[j+1] then",
          "               swap arr[j] and arr[j+1]",
          "           end if",
          "       end for",
          "   end for",
          "   return arr",
          "end procedure",
        ],
      },
      verified: true,
    },

    // 7. Binary Search
    {
      order: 7,
      slug: "binary-search",
      title: "Binary Search",
      category: "Searching",
      description:
        "Find the index of a target value in a sorted array by repeatedly dividing the search interval in half.",
      problem: {
        statement:
          "Given a sorted array of integers nums and an integer target, return the index of target if it exists, otherwise return -1.",
        inputFormat:
          "First line: space‑separated integers (sorted ascending). Second line: target integer.",
        outputFormat: "Integer index or -1.",
        constraints:
          "1 ≤ nums.length ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9, array sorted ascending",
        starterCode: {
          python: `def binary_search(nums: list, target: int) -> int:
    #edit below this line to solve the problem


def solve():
    nums = list(map(int, input().split()))
    target = int(input().strip())
    result = binary_search(nums, target)
    print(result)


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        {
          input: "-1 0 3 5 9 12\n9",
          output: 4,
          explanation: "9 exists at index 4.",
        },
        {
          input: "-1 0 3 5 9 12\n2",
          output: -1,
          explanation: "2 is not present in the array.",
        },
      ],
      testCases: [
        { input: "1 2 3 4 5\n3", expected: 2 },
        { input: "1 2 3 4 5\n6", expected: -1 },
        { input: "10\n10", expected: 0 },
      ],
      theory: {
        description:
          "Binary search works on sorted arrays. It compares the target with the middle element. If they are equal, the index is returned. If the target is smaller, the search continues on the left half; otherwise on the right half.",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1) iterative",
      },
      keyPoints: [
        "Requires sorted input",
        "Very fast for large datasets",
        "Works on random‑access data structures",
      ],
      pros: ["Logarithmic time complexity", "Minimal memory usage"],
      cons: ["Only works on sorted arrays", "Inefficient for small arrays"],
      input: { array: [-1, 0, 3, 5, 9, 12], target: 9 },
      animationSteps: [
        {
          array: [-1, 0, 3, 5, 9, 12],
          active: [0, 5],
          found: false,
          message: "left=0, right=5, mid=2, arr[2]=3 < 9 → search right half",
        },
        {
          array: [-1, 0, 3, 5, 9, 12],
          active: [3, 5],
          found: false,
          message: "left=3, right=5, mid=4, arr[4]=9 == 9 → found at index 4",
        },
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
              label: "left=0, right=n-1",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "loop",
            type: "decisionNode",
            data: {
              label: "left ≤ right ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "mid",
            type: "processNode",
            data: {
              label: "mid = (left+right)//2",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "check",
            type: "decisionNode",
            data: {
              label: "nums[mid] == target ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "left_up",
            type: "processNode",
            data: {
              label: "left = mid+1",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "right_up",
            type: "processNode",
            data: {
              label: "right = mid-1",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "found",
            type: "ioNode",
            data: {
              label: "Return mid",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
          {
            id: "not_found",
            type: "ioNode",
            data: {
              label: "Return -1",
              background: "#e9d5ff",
              borderColor: "#8b5cf6",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "init" },
          { id: "e2", source: "init", target: "loop" },
          { id: "e3", source: "loop", target: "mid", label: "Yes" },
          { id: "e4", source: "mid", target: "check" },
          { id: "e5", source: "check", target: "found", label: "Yes" },
          {
            id: "e6",
            source: "check",
            target: "left_up",
            label: "nums[mid] < target",
          },
          {
            id: "e7",
            source: "check",
            target: "right_up",
            label: "nums[mid] > target",
          },
          { id: "e8", source: "left_up", target: "loop" },
          { id: "e9", source: "right_up", target: "loop" },
          { id: "e10", source: "loop", target: "not_found", label: "No" },
        ],
      },
      code: {
        python: `def binary_search(nums: list, target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      },
      pseudocode: {
        lines: [
          "function binarySearch(nums, target)",
          "   left = 0, right = length(nums)-1",
          "   while left ≤ right",
          "       mid = floor((left+right)/2)",
          "       if nums[mid] == target: return mid",
          "       else if nums[mid] < target: left = mid+1",
          "       else: right = mid-1",
          "   return -1",
          "end function",
        ],
      },
      verified: true,
    },

    // 8. Selection Sort
    {
      order: 8,
      slug: "selection-sort",
      title: "Selection Sort",
      category: "Sorting",
      description:
        "Sort an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
      problem: {
        statement:
          "Given an array of integers, sort it in ascending order using selection sort.",
        inputFormat: "Space‑separated integers.",
        outputFormat: "Sorted integers, space‑separated.",
        constraints: "1 ≤ n ≤ 10^4, -10^5 ≤ arr[i] ≤ 10^5",
        starterCode: {
          python: `def selection_sort(arr: list) -> list:
    #edit below this line to solve the problem


def solve():
    arr = list(map(int, input().split()))
    sorted_arr = selection_sort(arr)
    print(' '.join(map(str, sorted_arr)))


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        {
          input: "64 25 12 22 11",
          output: [11, 12, 22, 25, 64],
          explanation:
            "Each pass selects the smallest remaining element and swaps it into place.",
        },
      ],
      testCases: [
        { input: "5 4 3 2 1", expected: [1, 2, 3, 4, 5] },
        { input: "1 2 3 4 5", expected: [1, 2, 3, 4, 5] },
        { input: "3 1 2", expected: [1, 2, 3] },
      ],
      theory: {
        description:
          "Selection sort divides the array into sorted (left) and unsorted (right) parts. In each iteration, it finds the minimum in the unsorted part and swaps it with the first element of the unsorted part.",
        timeComplexity: "O(n²) in all cases",
        spaceComplexity: "O(1)",
      },
      keyPoints: [
        "In‑place but unstable",
        "Performs fewer swaps than bubble sort",
      ],
      pros: ["Simple", "Minimal swaps"],
      cons: ["Always O(n²) even if already sorted", "Not stable"],
      input: { array: [64, 25, 12, 22, 11], target: null },
      animationSteps: [
        {
          array: [64, 25, 12, 22, 11],
          active: [0, 4],
          found: false,
          message:
            "Pass 1: min=11 at index 4 → swap indices 0 and 4 → [11,25,12,22,64]",
        },
        {
          array: [11, 25, 12, 22, 64],
          active: [1, 2],
          found: false,
          message:
            "Pass 2: min=12 at index 2 → swap indices 1 and 2 → [11,12,25,22,64]",
        },
        {
          array: [11, 12, 25, 22, 64],
          active: [2, 3],
          found: false,
          message:
            "Pass 3: min=22 at index 3 → swap indices 2 and 3 → [11,12,22,25,64]",
        },
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
            id: "outer",
            type: "processNode",
            data: {
              label: "i = 0 to n-2",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "min",
            type: "processNode",
            data: {
              label: "minIdx = i",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "inner",
            type: "processNode",
            data: {
              label: "j = i+1 to n-1",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "cmp",
            type: "decisionNode",
            data: {
              label: "arr[j] < arr[minIdx] ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "update",
            type: "processNode",
            data: {
              label: "minIdx = j",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "swap",
            type: "processNode",
            data: {
              label: "swap arr[i] and arr[minIdx]",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "outer" },
          { id: "e2", source: "outer", target: "min" },
          { id: "e3", source: "min", target: "inner" },
          { id: "e4", source: "inner", target: "cmp" },
          { id: "e5", source: "cmp", target: "update", label: "Yes" },
          { id: "e6", source: "update", target: "inner" },
          {
            id: "e7",
            source: "cmp",
            target: "inner",
            label: "No",
            sourceHandle: "right",
          },
          { id: "e8", source: "inner", target: "swap" },
        ],
      },
      code: {
        python: `def selection_sort(arr: list) -> list:
    n = len(arr)
    for i in range(n-1):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      },
      pseudocode: {
        lines: [
          "procedure selectionSort(arr)",
          "   n = length(arr)",
          "   for i = 0 to n-2",
          "       minIdx = i",
          "       for j = i+1 to n-1",
          "           if arr[j] < arr[minIdx] then minIdx = j",
          "       end for",
          "       swap arr[i] and arr[minIdx]",
          "   end for",
          "   return arr",
          "end procedure",
        ],
      },
      verified: true,
    },

    // 9. Fibonacci (DP)
    {
      order: 9,
      slug: "fibonacci-dp",
      title: "Fibonacci Number (DP)",
      category: "Dynamic Programming",
      description:
        "Compute the nth Fibonacci number efficiently using dynamic programming (iteration).",
      problem: {
        statement:
          "Given an integer n, return the nth Fibonacci number, where F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2) for n>1.",
        inputFormat: "Single integer n.",
        outputFormat: "Integer F(n).",
        constraints: "0 ≤ n ≤ 10^5 (results modulo 10^9+7 if needed)",
        starterCode: {
          python: `def fib(n: int) -> int:
    #edit below this line to solve the problem


def solve():
    n = int(input().strip())
    result = fib(n)
    print(result)


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        { input: "2", output: 1, explanation: "F(2)=F(1)+F(0)=1+0=1" },
        { input: "3", output: 2, explanation: "F(3)=F(2)+F(1)=1+1=2" },
      ],
      testCases: [
        { input: "0", expected: 0 },
        { input: "1", expected: 1 },
        { input: "6", expected: 8 },
        { input: "10", expected: 55 },
      ],
      theory: {
        description:
          "The Fibonacci sequence is defined recursively. Using iteration (DP) avoids exponential time and stack overflow, giving O(n) time and O(1) space.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      keyPoints: [
        "Base cases: F(0)=0, F(1)=1",
        "Iterative solution is optimal",
        "Avoid naive recursion",
      ],
      pros: ["Linear time", "Constant space", "No recursion overhead"],
      cons: ["Still linear (not logarithmic like matrix exponentiation)"],
      input: { array: [10], target: null },
      animationSteps: [
        {
          array: [0],
          active: [0],
          found: true,
          message: "Initialize: F(0) = 0",
        },
        {
          array: [0, 1],
          active: [1],
          found: true,
          message: "Initialize: F(1) = 1",
        },
        {
          array: [0, 1, 1],
          active: [2],
          found: true,
          message: "i=2 → F(2) = F(1) + F(0) = 1",
        },
        {
          array: [0, 1, 1, 2],
          active: [3],
          found: true,
          message: "i=3 → F(3) = F(2) + F(1) = 2",
        },
        {
          array: [0, 1, 1, 2, 3],
          active: [4],
          found: true,
          message: "i=4 → F(4) = F(3) + F(2) = 3",
        },
        {
          array: [0, 1, 1, 2, 3, 5],
          active: [5],
          found: true,
          message: "i=5 → F(5) = F(4) + F(3) = 5",
        },
        {
          array: [0, 1, 1, 2, 3, 5],
          active: [0, 1, 2, 3, 4, 5],
          found: true,
          message: "Final Answer: F(5) = 5",
        },
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
            id: "base",
            type: "decisionNode",
            data: {
              label: "n ≤ 1 ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "returnN",
            type: "ioNode",
            data: {
              label: "return n",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
          {
            id: "init",
            type: "processNode",
            data: {
              label: "a=0, b=1",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "loop",
            type: "processNode",
            data: {
              label: "for i = 2 to n",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "update",
            type: "processNode",
            data: {
              label: "c = a+b; a=b; b=c",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "returnB",
            type: "ioNode",
            data: {
              label: "return b",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "base" },
          { id: "e2", source: "base", target: "returnN", label: "Yes" },
          { id: "e3", source: "base", target: "init", label: "No" },
          { id: "e4", source: "init", target: "loop" },
          { id: "e5", source: "loop", target: "update" },
          { id: "e6", source: "update", target: "loop" },
          { id: "e7", source: "loop", target: "returnB" },
        ],
      },
      code: {
        python: `def fib(n: int) -> int:
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b`,
      },
      pseudocode: {
        lines: [
          "function fib(n)",
          "   if n ≤ 1: return n",
          "   a = 0, b = 1",
          "   for i = 2 to n",
          "       c = a + b",
          "       a = b",
          "       b = c",
          "   return b",
          "end function",
        ],
      },
      verified: true,
    },

    // 10. Two Sum
    {
      order: 10,
      slug: "two-sum",
      title: "Two Sum",
      category: "Hash Table",
      description:
        "Find two numbers in an array that add up to a target and return their indices.",
      problem: {
        statement:
          "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. Assume exactly one solution, and you may not use the same element twice.",
        inputFormat:
          "First line: space‑separated integers (array). Second line: target integer.",
        outputFormat: "Two space‑separated indices.",
        constraints: "2 ≤ nums.length ≤ 10^4, -10^9 ≤ nums[i], target ≤ 10^9",
        starterCode: {
          python: `def two_sum(nums: list, target: int) -> list:
    #edit below this line to solve the problem


def solve():
    nums = list(map(int, input().split()))
    target = int(input().strip())
    result = two_sum(nums, target)
    print(result[0], result[1])


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        {
          input: "2 7 11 15\n9",
          output: [0, 1],
          explanation: "nums[0]+nums[1]=2+7=9",
        },
        { input: "3 2 4\n6", output: [1, 2], explanation: "2+4=6" },
      ],
      testCases: [
        { input: "2 7 11 15\n9", expected: [0, 1] },
        { input: "3 2 4\n6", expected: [1, 2] },
        { input: "3 3\n6", expected: [0, 1] },
      ],
      theory: {
        description:
          "Use a hash map to store each element's value and its index. While iterating, check if the complement (target - current) already exists in the map.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      keyPoints: [
        "Single‑pass hash map solution",
        "Only one valid answer",
        "Cannot reuse same element",
      ],
      pros: ["Optimal time complexity", "Easy to implement"],
      cons: ["Extra memory for hash map"],
      input: { array: [2, 7, 11, 15], target: 9 },
      animationSteps: [
        {
          array: [2, 7, 11, 15],
          active: [],
          found: false,
          message: "Goal: find two numbers that sum to target = 9.",
        },
        {
          array: [2, 7, 11, 15],
          active: [0],
          found: false,
          message: "i=0 → num=2. Compute complement = 9 - 2 = 7.",
        },
        {
          array: [2, 7, 11, 15],
          active: [0],
          found: false,
          message: "7 is not in map. Add 2 to map → {2: 0}.",
        },
        {
          array: [2, 7, 11, 15],
          active: [1],
          found: false,
          message: "i=1 → num=7. Compute complement = 9 - 7 = 2.",
        },
        {
          array: [2, 7, 11, 15],
          active: [0, 1],
          found: true,
          message: "2 IS in map at index 0 → pair found!",
        },
        {
          array: [2, 7, 11, 15],
          active: [0, 1],
          found: true,
          message: "Return indices [0, 1]. (2 + 7 = 9)",
        },
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
              label: "map = {}",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "loop",
            type: "processNode",
            data: {
              label: "for i, num in enumerate(nums)",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "comp",
            type: "processNode",
            data: {
              label: "complement = target - num",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "check",
            type: "decisionNode",
            data: {
              label: "complement in map ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "add",
            type: "processNode",
            data: {
              label: "map[num] = i",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "found",
            type: "ioNode",
            data: {
              label: "return [map[complement], i]",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "init" },
          { id: "e2", source: "init", target: "loop" },
          { id: "e3", source: "loop", target: "comp" },
          { id: "e4", source: "comp", target: "check" },
          { id: "e5", source: "check", target: "found", label: "Yes" },
          { id: "e6", source: "check", target: "add", label: "No" },
          { id: "e7", source: "add", target: "loop" },
        ],
      },
      code: {
        python: `def two_sum(nums: list, target: int) -> list:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      },
      pseudocode: {
        lines: [
          "function twoSum(nums, target)",
          "   seen = empty dictionary",
          "   for i from 0 to length(nums)-1",
          "       complement = target - nums[i]",
          "       if complement in seen: return [seen[complement], i]",
          "       seen[nums[i]] = i",
          "   return []",
          "end function",
        ],
      },
      verified: true,
    },

    // 11. Insertion Sort
    {
      order: 11,
      slug: "insertion-sort",
      title: "Insertion Sort",
      category: "Sorting",
      description:
        "Sort an array by building the final sorted array one element at a time, inserting each new element into its correct position.",
      problem: {
        statement:
          "Given an array of integers, sort it in ascending order using insertion sort.",
        inputFormat: "Space‑separated integers.",
        outputFormat: "Sorted integers, space‑separated.",
        constraints: "1 ≤ n ≤ 10^4, -10^5 ≤ arr[i] ≤ 10^5",
        starterCode: {
          python: `def insertion_sort(arr: list) -> list:
    #edit below this line to solve the problem


def solve():
    arr = list(map(int, input().split()))
    sorted_arr = insertion_sort(arr)
    print(' '.join(map(str, sorted_arr)))


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        {
          input: "5 2 4 6 1 3",
          output: [1, 2, 3, 4, 5, 6],
          explanation:
            "Each element is inserted into the already sorted left part.",
        },
      ],
      testCases: [
        { input: "12 11 13 5 6", expected: [5, 6, 11, 12, 13] },
        { input: "1 2 3 4 5", expected: [1, 2, 3, 4, 5] },
        { input: "5 4 3 2 1", expected: [1, 2, 3, 4, 5] },
      ],
      theory: {
        description:
          "Insertion sort iterates from left to right, taking one element and shifting larger elements to the right to make space for the new element in its correct sorted position.",
        timeComplexity: "O(n²) worst/average, O(n) best (already sorted)",
        spaceComplexity: "O(1)",
      },
      keyPoints: [
        "Efficient for small or nearly sorted arrays",
        "Stable sort",
        "Online algorithm (can sort as it receives input)",
      ],
      pros: ["Simple", "Adaptive (fast for nearly sorted)", "Stable"],
      cons: ["O(n²) for reverse‑sorted data"],
      input: { array: [5, 2, 4, 6, 1, 3], target: null },
      animationSteps: [
        {
          array: [5, 2, 4, 6, 1, 3],
          active: [1],
          found: false,
          message: "Insert key=2 → shift 5 right → [2,5,4,6,1,3]",
        },
        {
          array: [2, 5, 4, 6, 1, 3],
          active: [2],
          found: false,
          message: "Insert key=4 → shift 5 right → [2,4,5,6,1,3]",
        },
        {
          array: [2, 4, 5, 6, 1, 3],
          active: [3],
          found: false,
          message: "key=6 → already in place",
        },
        {
          array: [2, 4, 5, 6, 1, 3],
          active: [4],
          found: false,
          message: "Insert key=1 → shift all right → [1,2,4,5,6,3]",
        },
        {
          array: [1, 2, 4, 5, 6, 3],
          active: [5],
          found: true,
          message: "Insert key=3 → shift 4,5,6 right → [1,2,3,4,5,6]",
        },
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
            id: "outer",
            type: "processNode",
            data: {
              label: "i = 1 to n-1",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "key",
            type: "processNode",
            data: {
              label: "key = arr[i], j = i-1",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "inner",
            type: "decisionNode",
            data: {
              label: "j >= 0 and arr[j] > key ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "shift",
            type: "processNode",
            data: {
              label: "arr[j+1] = arr[j]; j--",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "place",
            type: "processNode",
            data: {
              label: "arr[j+1] = key",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "outer" },
          { id: "e2", source: "outer", target: "key" },
          { id: "e3", source: "key", target: "inner" },
          {
            id: "e4",
            source: "inner",
            target: "shift",
            label: "Yes",
            sourceHandle: "left",
          },
          { id: "e5", source: "shift", target: "inner" },
          {
            id: "e6",
            source: "inner",
            target: "place",
            label: "No",
            sourceHandle: "right",
          },
        ],
      },
      code: {
        python: `def insertion_sort(arr: list) -> list:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i-1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr`,
      },
      pseudocode: {
        lines: [
          "procedure insertionSort(arr)",
          "   for i = 1 to length(arr)-1",
          "       key = arr[i]",
          "       j = i-1",
          "       while j ≥ 0 and arr[j] > key",
          "           arr[j+1] = arr[j]",
          "           j = j-1",
          "       end while",
          "       arr[j+1] = key",
          "   return arr",
          "end procedure",
        ],
      },
      verified: true,
    },

    // 12. Merge Sort (divide and conquer)
    {
      order: 12,
      slug: "merge-sort",
      title: "Merge Sort",
      category: "Sorting",
      description:
        "Sort an array using the divide‑and‑conquer merge sort algorithm.",
      problem: {
        statement:
          "Given an array of integers, sort it in ascending order using merge sort.",
        inputFormat: "Space‑separated integers.",
        outputFormat: "Sorted integers, space‑separated.",
        constraints: "1 ≤ n ≤ 10^5, -10^9 ≤ arr[i] ≤ 10^9",
        starterCode: {
          python: `def merge_sort(arr: list) -> list:
    #edit below this line to solve the problem


def solve():
    arr = list(map(int, input().split()))
    sorted_arr = merge_sort(arr)
    print(' '.join(map(str, sorted_arr)))


if __name__ == "__main__":
    solve()`,
        },
      },
      examples: [
        {
          input: "38 27 43 3 9 82 10",
          output: [3, 9, 10, 27, 38, 43, 82],
          explanation:
            "Merge sort recursively divides the array into halves, sorts them, and merges.",
        },
      ],
      testCases: [
        { input: "5 4 3 2 1", expected: [1, 2, 3, 4, 5] },
        { input: "1 2 3 4 5", expected: [1, 2, 3, 4, 5] },
        { input: "3 1 2", expected: [1, 2, 3] },
      ],
      theory: {
        description:
          "Merge sort is a divide‑and‑conquer algorithm. It divides the array into two halves, recursively sorts them, and then merges the two sorted halves. It guarantees O(n log n) performance.",
        timeComplexity: "O(n log n) in all cases",
        spaceComplexity: "O(n) auxiliary",
      },
      keyPoints: ["Stable sort", "Guaranteed O(n log n)", "Divide and conquer"],
      pros: ["Predictable performance", "Works well on linked lists", "Stable"],
      cons: [
        "Requires extra memory O(n)",
        "More complex to implement iteratively",
      ],
      input: { array: [38, 27, 43, 3, 9, 82, 10], target: null },
      animationSteps: [
        {
          array: [38, 27, 43, 3, 9],
          active: [0,1,2],
          found: false,
          message: "Split into [38,27,43] and [3,9]",
        },
        {
          array: [38, 27, 43, 3, 9],
          active: [3,4],
          found: false,
          message: "Split into [38,27,43] and [3,9]",
        },

        // --- Left side ---
        {
          array: [38, 27, 43, 3, 9],
          active: [0, 1],
          found: false,
          message: "Compare 38 and 27 → place 27 first",
        },
        {
          array: [27, 38, 43, 3, 9],
          active: [0],
          found: true,
          message: "Placed 27 first",
        },
        {
          array: [27, 38, 43, 3, 9],
          active: [1, 2],
          found: false,
          message: "Compare 38 and 43 → keep 38",
        },

        // --- Right side ---
        {
          array: [27, 38, 43, 3, 9],
          active: [3, 4],
          found: false,
          message: "Compare 3 and 9 → already sorted",
        },

        // --- Final merge ---
        {
          array: [27, 38, 43, 3, 9],
          active: [0, 3],
          found: false,
          message: "Compare 27 and 3",
        },
        {
          array: [3, 27, 38, 43, 9],
          active: [0],
          found: true,
          message: "Place 3",
        },
        {
          array: [3, 27, 38, 43, 9],
          active: [1,4],
          found: false,
          message: "Compare 27 and 9",
        },
        {
          array: [3, 9, 27, 38, 43],
          active: [1],
          found: true,
          message: "Place 9",
        },
        {
          array: [3, 9, 27, 38, 43],
          active: [0,1,2,3,4],
          found: true,
          message: "Final sorted array",
        },
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
            id: "base",
            type: "decisionNode",
            data: {
              label: "length ≤ 1 ?",
              background: "#dbeafe",
              borderColor: "#3b82f6",
            },
          },
          {
            id: "return",
            type: "ioNode",
            data: {
              label: "return arr",
              background: "#bbf7d0",
              borderColor: "#22c55e",
            },
          },
          {
            id: "mid",
            type: "processNode",
            data: {
              label: "mid = n//2",
              background: "#fecaca",
              borderColor: "#ef4444",
            },
          },
          {
            id: "left",
            type: "processNode",
            data: {
              label: "left = merge_sort(arr[0:mid])",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "right",
            type: "processNode",
            data: {
              label: "right = merge_sort(arr[mid:n])",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
          {
            id: "merge",
            type: "processNode",
            data: {
              label: "return merge(left, right)",
              background: "#fde68a",
              borderColor: "#f59e0b",
            },
          },
        ],
        rawEdges: [
          { id: "e1", source: "start", target: "base" },
          { id: "e2", source: "base", target: "return", label: "Yes" },
          { id: "e3", source: "base", target: "mid", label: "No" },
          { id: "e4", source: "mid", target: "left" },
          { id: "e5", source: "left", target: "right" },
          { id: "e6", source: "right", target: "merge" },
        ],
      },
      code: {
        python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      },
      pseudocode: {
        lines: [
          "function mergeSort(arr)",
          "   if length(arr) ≤ 1: return arr",
          "   mid = floor(length(arr)/2)",
          "   left = mergeSort(arr[0..mid-1])",
          "   right = mergeSort(arr[mid..end])",
          "   return merge(left, right)",
          "end function",
          "function merge(left, right)",
          "   result = []",
          "   while left and right are not empty",
          "       if left[0] ≤ right[0]: pop left to result",
          "       else: pop right to result",
          "   append remaining elements",
          "   return result",
          "end function",
        ],
      },
      verified: true,
    },
  ];

  await Algorithm.insertMany(algorithms);

  console.log(`✅ ${algorithms.length} algorithms seeded successfully`);
  process.exit();
};

seed();

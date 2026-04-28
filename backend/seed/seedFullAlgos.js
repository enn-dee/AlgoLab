import connectDB from "../config/db.js";
import Algorithm from "../models/Algorithm.js";

const seed = async () => {
  await connectDB();

  await Algorithm.deleteMany();

  const algorithms  = [
  // 1. Palindrome Check
  {
    order: 1,
    slug: "palindrome-check",
    title: "Palindrome Check",
    category: "Fundamentals",
    description: "Write a function that returns true if a given string reads the same forwards and backwards, and false otherwise.",
    problem: {
      statement: "Given a string s, return true if it is a palindrome, false otherwise.",
      inputFormat: "A single string s (may contain letters, digits, spaces, punctuation).",
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
    solve()`
      }
    },
    examples: [
      { input: "racecar", output: true, explanation: "racecar reads the same forwards and backwards" },
      { input: "hello", output: false, explanation: "hello reversed is 'olleh', which is different" }
    ],
    testCases: [
      { input: "racecar", expected: true },
      { input: "hello", expected: false },
      { input: "A", expected: true },
      { input: "ab", expected: false }
    ],
    theory: {
      description: "A Palindrome Check determines whether a given string or array reads the same forwards and backwards. The classic approach uses two pointers — one starting at the beginning and one at the end — comparing characters and moving inward until they meet.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    keyPoints: [
      "Compares characters from both ends moving inward",
      "Stops as soon as a mismatch is found",
      "Works on strings and arrays alike"
    ],
    pros: [
      "Linear time complexity",
      "Constant extra space with two-pointer approach",
      "Simple and intuitive logic"
    ],
    cons: [
      "Case-sensitive by default (needs preprocessing for real-world use)",
      "Special characters and spaces must be handled separately"
    ],
    input: { array: ["r","a","c","e","c","a","r"], target: null },
    animationSteps: [
      { array: ["r","a","c","e","c","a","r"], active: [0,6], found: true, message: "Compare index 0 ('r') and index 6 ('r'). Match!" },
      { array: ["r","a","c","e","c","a","r"], active: [1,5], found: true, message: "Compare index 1 ('a') and index 5 ('a'). Match!" },
      { array: ["r","a","c","e","c","a","r"], active: [2,4], found: true, message: "Compare index 2 ('c') and index 4 ('c'). Match!" },
      { array: ["r","a","c","e","c","a","r"], active: [3], found: true, message: "Pointers met at center." },
      { array: ["r","a","c","e","c","a","r"], active: [0,1,2,3,4,5,6], found: true, message: "It is a Palindrome!" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" } },
        { id: "input", type: "ioNode", data: { label: "Input string s", background: "#fef3c7", borderColor: "#f59e0b" } },
        { id: "init", type: "processNode", data: { label: "left = 0\nright = n - 1", background: "#fecaca", borderColor: "#ef4444" } },
        { id: "check_pointers", type: "decisionNode", data: { label: "left < right ?", background: "#dbeafe", borderColor: "#3b82f6" } },
        { id: "compare", type: "decisionNode", data: { label: "s[left] == s[right] ?", background: "#dbeafe", borderColor: "#3b82f6" } },
        { id: "not_palindrome", type: "ioNode", data: { label: "Not a Palindrome", background: "#e9d5ff", borderColor: "#8b5cf6" } },
        { id: "move_pointers", type: "processNode", data: { label: "left++\nright--", background: "#fde68a", borderColor: "#f59e0b" } },
        { id: "palindrome", type: "ioNode", data: { label: "Is a Palindrome", background: "#bbf7d0", borderColor: "#22c55e" } },
        { id: "end", type: "terminalNode", data: { label: "End", background: "#d1fae5", borderColor: "#10b981" } }
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
        { id: "e10", source: "not_palindrome", target: "end" }
      ]
    },
    code: {
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
        "   while left < right",
        "      if s[left] ≠ s[right]",
        "         return NOT PALINDROME",
        "      left ← left + 1",
        "      right ← right - 1",
        "   return PALINDROME",
        "end procedure"
      ]
    },
    verified: true
  },

  // 2. Sum of Two Numbers
  {
    order: 2,
    slug: "sum-of-two-numbers",
    title: "Sum of Two Numbers",
    category: "Basic Math",
    description: "Write a function that takes two integers and returns their sum.",
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
    solve()`
      }
    },
    examples: [
      { input: "2 3", output: 5, explanation: "2 + 3 = 5" },
      { input: "-1 5", output: 4, explanation: "-1 + 5 = 4" }
    ],
    testCases: [
      { input: "1 1", expected: 2 },
      { input: "10 -3", expected: 7 },
      { input: "0 0", expected: 0 },
      { input: "-5 -7", expected: -12 }
    ],
    theory: {
      description: "Addition is the most basic arithmetic operation. In programming, the + operator performs addition.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)"
    },
    keyPoints: [ "Use the + operator", "Handle negative numbers correctly" ],
    pros: [ "Trivial to implement", "Constant time" ],
    cons: [ "Too simple for experienced developers" ],
    input: { array: [5,7], target: null },
    animationSteps: [
      { array: [5,7], active: [0], found: false, message: "Read first number: 5" },
      { array: [5,7], active: [1], found: false, message: "Read second number: 7" },
      { array: [5,7], active: [0,1], found: true, message: "Add them: 5 + 7 = 12. Return 12." }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" } },
        { id: "input", type: "ioNode", data: { label: "Read a and b", background: "#fef3c7", borderColor: "#f59e0b" } },
        { id: "calc", type: "processNode", data: { label: "sum = a + b", background: "#fecaca", borderColor: "#ef4444" } },
        { id: "output", type: "ioNode", data: { label: "Print sum", background: "#bbf7d0", borderColor: "#22c55e" } },
        { id: "end", type: "terminalNode", data: { label: "End", background: "#d1fae5", borderColor: "#10b981" } }
      ],
      rawEdges: [
        { id: "e1", source: "start", target: "input" },
        { id: "e2", source: "input", target: "calc" },
        { id: "e3", source: "calc", target: "output" },
        { id: "e4", source: "output", target: "end" }
      ]
    },
    code: {
      python: `def add(a: int, b: int) -> int:
    return a + b`
    },
    pseudocode: {
      lines: [
        "function add(a, b)",
        "   return a + b",
        "end function"
      ]
    },
    verified: true
  },

  // 3. Maximum of Three Numbers
  {
    order: 3,
    slug: "maximum-of-three",
    title: "Maximum of Three Numbers",
    category: "Basic Math",
    description: "Write a function that returns the largest of three given integers.",
    problem: {
      statement: "Given three integers a, b, c, return the maximum value among them.",
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
    solve()`
      }
    },
    examples: [
      { input: "5 9 2", output: 9, explanation: "9 is the largest" },
      { input: "-1 -5 -3", output: -1, explanation: "-1 is the largest (closest to zero)" }
    ],
    testCases: [
      { input: "10 20 15", expected: 20 },
      { input: "7 7 7", expected: 7 },
      { input: "-10 -20 -5", expected: -5 }
    ],
    theory: {
      description: "Compare numbers using if‑else or the built‑in max function. Understanding conditional logic is key.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)"
    },
    keyPoints: [ "Use nested if statements or logical operators", "Edge case: equal numbers" ],
    pros: [ "Teaches conditionals", "Simple" ],
    cons: [ "Trivial for advanced users" ],
    input: { array: [12,45,23], target: null },
    animationSteps: [
      { array: [12,45,23], active: [0,1], found: false, message: "Compare 12 and 45 → max = 45" },
      { array: [12,45,23], active: [1,2], found: false, message: "Compare 45 and 23 → max = 45" },
      { array: [12,45,23], active: [1], found: true, message: "Final maximum is 45" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "cmp1", type: "decisionNode", data: { label: "a ≥ b ?" } },
        { id: "cmp2", type: "decisionNode", data: { label: "a ≥ c ?" } },
        { id: "cmp3", type: "decisionNode", data: { label: "b ≥ c ?" } },
        { id: "out_a", type: "ioNode", data: { label: "return a" } },
        { id: "out_b", type: "ioNode", data: { label: "return b" } },
        { id: "out_c", type: "ioNode", data: { label: "return c" } }
      ],
      rawEdges: [
        { source: "start", target: "cmp1" },
        { source: "cmp1", target: "cmp2", label: "Yes" },
        { source: "cmp1", target: "cmp3", label: "No" },
        { source: "cmp2", target: "out_a", label: "Yes" },
        { source: "cmp2", target: "out_c", label: "No" },
        { source: "cmp3", target: "out_b", label: "Yes" },
        { source: "cmp3", target: "out_c", label: "No" }
      ]
    },
    code: {
      python: `def max_of_three(a: int, b: int, c: int) -> int:
    return max(a, b, c)`
    },
    pseudocode: {
      lines: [
        "function maxOfThree(a, b, c)",
        "   if a >= b and a >= c: return a",
        "   if b >= a and b >= c: return b",
        "   return c",
        "end function"
      ]
    },
    verified: true
  },

  // 4. Factorial (iterative)
  {
    order: 4,
    slug: "factorial",
    title: "Factorial",
    category: "Basic Math",
    description: "Compute the factorial of a non‑negative integer n (n! = n × (n‑1) × ... × 1, with 0! = 1).",
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
    solve()`
      }
    },
    examples: [
      { input: "5", output: 120, explanation: "5! = 5×4×3×2×1 = 120" },
      { input: "0", output: 1, explanation: "0! is defined as 1" }
    ],
    testCases: [
      { input: "0", expected: 1 },
      { input: "1", expected: 1 },
      { input: "4", expected: 24 },
      { input: "6", expected: 720 }
    ],
    theory: {
      description: "Factorial can be computed using a loop (iterative) or recursion. The iterative method avoids stack overflow.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    keyPoints: [ "Base case: 0! = 1", "Use a for loop to multiply from 1 to n" ],
    pros: [ "Simple loop", "No recursion overhead" ],
    cons: [ "Values grow quickly", "Only works for small n" ],
    input: { array: [5], target: null },
    animationSteps: [
      { array: [5], active: [0], found: false, message: "n = 5. Start result = 1, i = 1" },
      { array: [5], active: [0], found: false, message: "i = 1 → result = 1 * 1 = 1" },
      { array: [5], active: [0], found: false, message: "i = 2 → result = 1 * 2 = 2" },
      { array: [5], active: [0], found: false, message: "i = 3 → result = 2 * 3 = 6" },
      { array: [5], active: [0], found: false, message: "i = 4 → result = 6 * 4 = 24" },
      { array: [5], active: [0], found: true, message: "i = 5 → result = 24 * 5 = 120. Return 120" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "init", type: "processNode", data: { label: "result = 1" } },
        { id: "loop", type: "decisionNode", data: { label: "i = 1 to n ?" } },
        { id: "multiply", type: "processNode", data: { label: "result = result × i" } },
        { id: "output", type: "ioNode", data: { label: "Return result" } }
      ],
      rawEdges: [
        { source: "start", target: "init" },
        { source: "init", target: "loop" },
        { source: "loop", target: "multiply", label: "Yes" },
        { source: "multiply", target: "loop" },
        { source: "loop", target: "output", label: "No" }
      ]
    },
    code: {
      python: `def factorial(n: int) -> int:
    result = 1
    for i in range(2, n+1):
        result *= i
    return result`
    },
    pseudocode: {
      lines: [
        "function factorial(n)",
        "   result = 1",
        "   for i = 2 to n",
        "       result = result × i",
        "   return result",
        "end function"
      ]
    },
    verified: true
  },

  // 5. Linear Search
  {
    order: 5,
    slug: "linear-search",
    title: "Linear Search",
    category: "Searching",
    description: "Find the index of a target value in an array by checking each element one by one.",
    problem: {
      statement: "Given an array of integers arr and an integer target, return the index of target if it exists, otherwise return -1.",
      inputFormat: "First line: space‑separated integers (array). Second line: target integer.",
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
    solve()`
      }
    },
    examples: [
      { input: "4 2 7 1 9\n7", output: 2, explanation: "7 is at index 2" },
      { input: "4 2 7 1 9\n5", output: -1, explanation: "5 not found" }
    ],
    testCases: [
      { input: "10 20 30\n20", expected: 1 },
      { input: "5\n5", expected: 0 },
      { input: "1 2 3\n4", expected: -1 }
    ],
    theory: {
      description: "Linear search iterates through the array from start to end, comparing each element with the target. It works on unsorted data.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    keyPoints: [ "Works on any array (sorted or unsorted)", "Simple but slow for large arrays" ],
    pros: [ "No preprocessing needed", "Works with any data type" ],
    cons: [ "Slow for large data sets (O(n))" ],
    input: { array: [4,2,7,1,9], target: 7 },
    animationSteps: [
      { array: [4,2,7,1,9], active: [0], found: false, message: "Check index 0: 4 != 7" },
      { array: [4,2,7,1,9], active: [1], found: false, message: "Check index 1: 2 != 7" },
      { array: [4,2,7,1,9], active: [2], found: true, message: "Check index 2: 7 == 7 → found" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "init", type: "processNode", data: { label: "i = 0" } },
        { id: "loop", type: "decisionNode", data: { label: "i < n ?" } },
        { id: "compare", type: "decisionNode", data: { label: "arr[i] == target ?" } },
        { id: "increment", type: "processNode", data: { label: "i++" } },
        { id: "found", type: "ioNode", data: { label: "Return i" } },
        { id: "not_found", type: "ioNode", data: { label: "Return -1" } }
      ],
      rawEdges: [
        { source: "start", target: "init" },
        { source: "init", target: "loop" },
        { source: "loop", target: "compare", label: "Yes" },
        { source: "compare", target: "found", label: "Yes" },
        { source: "compare", target: "increment", label: "No" },
        { source: "increment", target: "loop" },
        { source: "loop", target: "not_found", label: "No" }
      ]
    },
    code: {
      python: `def linear_search(arr: list, target: int) -> int:
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`
    },
    pseudocode: {
      lines: [
        "function linearSearch(arr, target)",
        "   for i = 0 to length(arr)-1",
        "       if arr[i] == target then return i",
        "   return -1",
        "end function"
      ]
    },
    verified: true
  },

  // 6. Bubble Sort
  {
    order: 6,
    slug: "bubble-sort",
    title: "Bubble Sort",
    category: "Sorting",
    description: "Sort an array by repeatedly swapping adjacent elements if they are in the wrong order.",
    problem: {
      statement: "Given an array of integers, sort it in ascending order using the bubble sort algorithm.",
      inputFormat: "Space‑separated integers.",
      outputFormat: "Same integers sorted in ascending order, space‑separated.",
      constraints: "1 ≤ n ≤ 10^3, -10^5 ≤ arr[i] ≤ 10^5",
      starterCode: {
        python: `def bubble_sort(arr: list) -> list:
    #edit below this line to solve the problem


def solve():
    arr = list(map(int, input().split()))
    sorted_arr = bubble_sort(arr)
    print(' '.join(map(str, sorted_arr)))


if __name__ == "__main__":
    solve()`
      }
    },
    examples: [
      { input: "5 1 4 2 8", output: [1,2,4,5,8], explanation: "After bubble sort passes, the array becomes sorted." }
    ],
    testCases: [
      { input: "64 34 25 12 22 11 90", expected: [11,12,22,25,34,64,90] },
      { input: "1 2 3 4 5", expected: [1,2,3,4,5] },
      { input: "5 4 3 2 1", expected: [1,2,3,4,5] }
    ],
    theory: {
      description: "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are out of order. The largest element 'bubbles up' to its correct position at the end of each pass.",
      timeComplexity: "O(n²) worst/average, O(n) best (already sorted)",
      spaceComplexity: "O(1)"
    },
    keyPoints: [ "In‑place sorting", "Stable algorithm", "Educational but inefficient for large datasets" ],
    pros: [ "Simple to understand and implement", "No extra memory required" ],
    cons: [ "Very slow for large arrays", "Many comparisons and swaps" ],
    input: { array: [5,1,4,2,8], target: null },
    animationSteps: [
      { array: [5,1,4,2,8], active: [0,1], found: false, message: "Swap 5 and 1 → [1,5,4,2,8]" },
      { array: [1,5,4,2,8], active: [1,2], found: false, message: "Swap 5 and 4 → [1,4,5,2,8]" },
      { array: [1,4,5,2,8], active: [2,3], found: false, message: "Swap 5 and 2 → [1,4,2,5,8]" },
      { array: [1,4,2,5,8], active: [1,2], found: false, message: "Swap 4 and 2 → [1,2,4,5,8]" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "outer", type: "processNode", data: { label: "for i = 0 to n-1" } },
        { id: "inner", type: "processNode", data: { label: "for j = 0 to n-i-2" } },
        { id: "compare", type: "decisionNode", data: { label: "arr[j] > arr[j+1] ?" } },
        { id: "swap", type: "processNode", data: { label: "swap arr[j], arr[j+1]" } },
        { id: "end", type: "terminalNode", data: { label: "Return sorted array" } }
      ],
      rawEdges: [
        { source: "start", target: "outer" },
        { source: "outer", target: "inner" },
        { source: "inner", target: "compare" },
        { source: "compare", target: "swap", label: "Yes" },
        { source: "swap", target: "inner" },
        { source: "compare", target: "inner", label: "No" }
      ]
    },
    code: {
      python: `def bubble_sort(arr: list) -> list:
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`
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
        "end procedure"
      ]
    },
    verified: true
  },

  // 7. Binary Search
  {
    order: 7,
    slug: "binary-search",
    title: "Binary Search",
    category: "Searching",
    description: "Find the index of a target value in a sorted array by repeatedly dividing the search interval in half.",
    problem: {
      statement: "Given a sorted array of integers nums and an integer target, return the index of target if it exists, otherwise return -1.",
      inputFormat: "First line: space‑separated integers (sorted ascending). Second line: target integer.",
      outputFormat: "Integer index or -1.",
      constraints: "1 ≤ nums.length ≤ 10^5, -10^9 ≤ nums[i], target ≤ 10^9, array sorted ascending",
      starterCode: {
        python: `def binary_search(nums: list, target: int) -> int:
    #edit below this line to solve the problem


def solve():
    nums = list(map(int, input().split()))
    target = int(input().strip())
    result = binary_search(nums, target)
    print(result)


if __name__ == "__main__":
    solve()`
      }
    },
    examples: [
      { input: "-1 0 3 5 9 12\n9", output: 4, explanation: "9 exists at index 4." },
      { input: "-1 0 3 5 9 12\n2", output: -1, explanation: "2 is not present in the array." }
    ],
    testCases: [
      { input: "1 2 3 4 5\n3", expected: 2 },
      { input: "1 2 3 4 5\n6", expected: -1 },
      { input: "10\n10", expected: 0 }
    ],
    theory: {
      description: "Binary search works on sorted arrays. It compares the target with the middle element. If they are equal, the index is returned. If the target is smaller, the search continues on the left half; otherwise on the right half.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1) iterative"
    },
    keyPoints: [ "Requires sorted input", "Very fast for large datasets", "Works on random‑access data structures" ],
    pros: [ "Logarithmic time complexity", "Minimal memory usage" ],
    cons: [ "Only works on sorted arrays", "Inefficient for small arrays" ],
    input: { array: [-1,0,3,5,9,12], target: 9 },
    animationSteps: [
      { array: [-1,0,3,5,9,12], active: [0,5], found: false, message: "left=0, right=5, mid=2, arr[2]=3 < 9 → search right half" },
      { array: [-1,0,3,5,9,12], active: [3,5], found: false, message: "left=3, right=5, mid=4, arr[4]=9 == 9 → found at index 4" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "init", type: "processNode", data: { label: "left=0, right=n-1" } },
        { id: "loop", type: "decisionNode", data: { label: "left ≤ right ?" } },
        { id: "mid", type: "processNode", data: { label: "mid = (left+right)//2" } },
        { id: "check", type: "decisionNode", data: { label: "nums[mid] == target ?" } },
        { id: "left_up", type: "processNode", data: { label: "left = mid+1" } },
        { id: "right_up", type: "processNode", data: { label: "right = mid-1" } },
        { id: "found", type: "ioNode", data: { label: "Return mid" } },
        { id: "not_found", type: "ioNode", data: { label: "Return -1" } }
      ],
      rawEdges: [
        { source: "start", target: "init" },
        { source: "init", target: "loop" },
        { source: "loop", target: "mid", label: "Yes" },
        { source: "mid", target: "check" },
        { source: "check", target: "found", label: "Yes" },
        { source: "check", target: "left_up", label: "nums[mid] < target" },
        { source: "check", target: "right_up", label: "nums[mid] > target" },
        { source: "left_up", target: "loop" },
        { source: "right_up", target: "loop" },
        { source: "loop", target: "not_found", label: "No" }
      ]
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
    return -1`
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
        "end function"
      ]
    },
    verified: true
  },

  // 8. Selection Sort
  {
    order: 8,
    slug: "selection-sort",
    title: "Selection Sort",
    category: "Sorting",
    description: "Sort an array by repeatedly finding the minimum element from the unsorted part and putting it at the beginning.",
    problem: {
      statement: "Given an array of integers, sort it in ascending order using selection sort.",
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
    solve()`
      }
    },
    examples: [
      { input: "64 25 12 22 11", output: [11,12,22,25,64], explanation: "Each pass selects the smallest remaining element and swaps it into place." }
    ],
    testCases: [
      { input: "5 4 3 2 1", expected: [1,2,3,4,5] },
      { input: "1 2 3 4 5", expected: [1,2,3,4,5] },
      { input: "3 1 2", expected: [1,2,3] }
    ],
    theory: {
      description: "Selection sort divides the array into sorted (left) and unsorted (right) parts. In each iteration, it finds the minimum in the unsorted part and swaps it with the first element of the unsorted part.",
      timeComplexity: "O(n²) in all cases",
      spaceComplexity: "O(1)"
    },
    keyPoints: [ "In‑place but unstable", "Performs fewer swaps than bubble sort" ],
    pros: [ "Simple", "Minimal swaps" ],
    cons: [ "Always O(n²) even if already sorted", "Not stable" ],
    input: { array: [64,25,12,22,11], target: null },
    animationSteps: [
      { array: [64,25,12,22,11], active: [0,4], found: false, message: "Pass 1: min=11 at index 4 → swap indices 0 and 4 → [11,25,12,22,64]" },
      { array: [11,25,12,22,64], active: [1,2], found: false, message: "Pass 2: min=12 at index 2 → swap indices 1 and 2 → [11,12,25,22,64]" },
      { array: [11,12,25,22,64], active: [2,3], found: false, message: "Pass 3: min=22 at index 3 → swap indices 2 and 3 → [11,12,22,25,64]" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "outer", type: "processNode", data: { label: "i = 0 to n-2" } },
        { id: "min", type: "processNode", data: { label: "minIdx = i" } },
        { id: "inner", type: "processNode", data: { label: "j = i+1 to n-1" } },
        { id: "cmp", type: "decisionNode", data: { label: "arr[j] < arr[minIdx] ?" } },
        { id: "update", type: "processNode", data: { label: "minIdx = j" } },
        { id: "swap", type: "processNode", data: { label: "swap arr[i] and arr[minIdx]" } }
      ],
      rawEdges: [
        { source: "start", target: "outer" },
        { source: "outer", target: "min" },
        { source: "min", target: "inner" },
        { source: "inner", target: "cmp" },
        { source: "cmp", target: "update", label: "Yes" },
        { source: "update", target: "inner" },
        { source: "cmp", target: "inner", label: "No" },
        { source: "inner", target: "swap" }
      ]
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
    return arr`
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
        "end procedure"
      ]
    },
    verified: true
  },

  // 9. Fibonacci (DP)
  {
    order: 9,
    slug: "fibonacci-dp",
    title: "Fibonacci Number (DP)",
    category: "Dynamic Programming",
    description: "Compute the nth Fibonacci number efficiently using dynamic programming (iteration).",
    problem: {
      statement: "Given an integer n, return the nth Fibonacci number, where F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2) for n>1.",
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
    solve()`
      }
    },
    examples: [
      { input: "2", output: 1, explanation: "F(2)=F(1)+F(0)=1+0=1" },
      { input: "3", output: 2, explanation: "F(3)=F(2)+F(1)=1+1=2" }
    ],
    testCases: [
      { input: "0", expected: 0 },
      { input: "1", expected: 1 },
      { input: "6", expected: 8 },
      { input: "10", expected: 55 }
    ],
    theory: {
      description: "The Fibonacci sequence is defined recursively. Using iteration (DP) avoids exponential time and stack overflow, giving O(n) time and O(1) space.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    keyPoints: [ "Base cases: F(0)=0, F(1)=1", "Iterative solution is optimal", "Avoid naive recursion" ],
    pros: [ "Linear time", "Constant space", "No recursion overhead" ],
    cons: [ "Still linear (not logarithmic like matrix exponentiation)" ],
    input: { array: [10], target: null },
    animationSteps: [
      { array: [10], active: [0], found: false, message: "n=10. Start: a=0 (F0), b=1 (F1)" },
      { array: [10], active: [0], found: false, message: "i=2 → c=0+1=1, a=1, b=1 (F2=1)" },
      { array: [10], active: [0], found: false, message: "i=3 → c=1+1=2, a=1, b=2 (F3=2)" },
      { array: [10], active: [0], found: false, message: "i=4 → c=1+2=3, a=2, b=3 (F4=3)" },
      { array: [10], active: [0], found: false, message: "i=5 → c=2+3=5, a=3, b=5 (F5=5)" },
      { array: [10], active: [0], found: false, message: "i=6 → c=3+5=8, a=5, b=8 (F6=8)" },
      { array: [10], active: [0], found: false, message: "i=7 → c=5+8=13, a=8, b=13 (F7=13)" },
      { array: [10], active: [0], found: false, message: "i=8 → c=8+13=21, a=13, b=21 (F8=21)" },
      { array: [10], active: [0], found: false, message: "i=9 → c=13+21=34, a=21, b=34 (F9=34)" },
      { array: [10], active: [0], found: false, message: "i=10 → c=21+34=55, a=34, b=55 (F10=55)" },
      { array: [10], active: [0], found: true, message: "Return b = 55" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "base", type: "decisionNode", data: { label: "n ≤ 1 ?" } },
        { id: "returnN", type: "ioNode", data: { label: "return n" } },
        { id: "init", type: "processNode", data: { label: "a=0, b=1" } },
        { id: "loop", type: "processNode", data: { label: "for i = 2 to n" } },
        { id: "update", type: "processNode", data: { label: "c = a+b; a=b; b=c" } },
        { id: "returnB", type: "ioNode", data: { label: "return b" } }
      ],
      rawEdges: [
        { source: "start", target: "base" },
        { source: "base", target: "returnN", label: "Yes" },
        { source: "base", target: "init", label: "No" },
        { source: "init", target: "loop" },
        { source: "loop", target: "update" },
        { source: "update", target: "loop" },
        { source: "loop", target: "returnB" }
      ]
    },
    code: {
      python: `def fib(n: int) -> int:
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b`
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
        "end function"
      ]
    },
    verified: true
  },

  // 10. Two Sum
  {
    order: 10,
    slug: "two-sum",
    title: "Two Sum",
    category: "Hash Table",
    description: "Find two numbers in an array that add up to a target and return their indices.",
    problem: {
      statement: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. Assume exactly one solution, and you may not use the same element twice.",
      inputFormat: "First line: space‑separated integers (array). Second line: target integer.",
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
    solve()`
      }
    },
    examples: [
      { input: "2 7 11 15\n9", output: [0,1], explanation: "nums[0]+nums[1]=2+7=9" },
      { input: "3 2 4\n6", output: [1,2], explanation: "2+4=6" }
    ],
    testCases: [
      { input: "2 7 11 15\n9", expected: [0,1] },
      { input: "3 2 4\n6", expected: [1,2] },
      { input: "3 3\n6", expected: [0,1] }
    ],
    theory: {
      description: "Use a hash map to store each element's value and its index. While iterating, check if the complement (target - current) already exists in the map.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    keyPoints: [ "Single‑pass hash map solution", "Only one valid answer", "Cannot reuse same element" ],
    pros: [ "Optimal time complexity", "Easy to implement" ],
    cons: [ "Extra memory for hash map" ],
    input: { array: [2,7,11,15], target: 9 },
    animationSteps: [
      { array: [2,7,11,15], active: [0], found: false, message: "i=0, num=2, complement=7. Map empty → add {2:0}" },
      { array: [2,7,11,15], active: [1], found: true, message: "i=1, num=7, complement=2 found in map → return [0,1]" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "init", type: "processNode", data: { label: "map = {}" } },
        { id: "loop", type: "processNode", data: { label: "for i, num in enumerate(nums)" } },
        { id: "comp", type: "processNode", data: { label: "complement = target - num" } },
        { id: "check", type: "decisionNode", data: { label: "complement in map ?" } },
        { id: "add", type: "processNode", data: { label: "map[num] = i" } },
        { id: "found", type: "ioNode", data: { label: "return [map[complement], i]" } }
      ],
      rawEdges: [
        { source: "start", target: "init" },
        { source: "init", target: "loop" },
        { source: "loop", target: "comp" },
        { source: "comp", target: "check" },
        { source: "check", target: "found", label: "Yes" },
        { source: "check", target: "add", label: "No" },
        { source: "add", target: "loop" }
      ]
    },
    code: {
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
        "function twoSum(nums, target)",
        "   seen = empty dictionary",
        "   for i from 0 to length(nums)-1",
        "       complement = target - nums[i]",
        "       if complement in seen: return [seen[complement], i]",
        "       seen[nums[i]] = i",
        "   return []",
        "end function"
      ]
    },
    verified: true
  },

  // 11. Insertion Sort
  {
    order: 11,
    slug: "insertion-sort",
    title: "Insertion Sort",
    category: "Sorting",
    description: "Sort an array by building the final sorted array one element at a time, inserting each new element into its correct position.",
    problem: {
      statement: "Given an array of integers, sort it in ascending order using insertion sort.",
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
    solve()`
      }
    },
    examples: [
      { input: "5 2 4 6 1 3", output: [1,2,3,4,5,6], explanation: "Each element is inserted into the already sorted left part." }
    ],
    testCases: [
      { input: "12 11 13 5 6", expected: [5,6,11,12,13] },
      { input: "1 2 3 4 5", expected: [1,2,3,4,5] },
      { input: "5 4 3 2 1", expected: [1,2,3,4,5] }
    ],
    theory: {
      description: "Insertion sort iterates from left to right, taking one element and shifting larger elements to the right to make space for the new element in its correct sorted position.",
      timeComplexity: "O(n²) worst/average, O(n) best (already sorted)",
      spaceComplexity: "O(1)"
    },
    keyPoints: [ "Efficient for small or nearly sorted arrays", "Stable sort", "Online algorithm (can sort as it receives input)" ],
    pros: [ "Simple", "Adaptive (fast for nearly sorted)", "Stable" ],
    cons: [ "O(n²) for reverse‑sorted data" ],
    input: { array: [5,2,4,6,1,3], target: null },
    animationSteps: [
      { array: [5,2,4,6,1,3], active: [1], found: false, message: "Insert key=2 → shift 5 right → [2,5,4,6,1,3]" },
      { array: [2,5,4,6,1,3], active: [2], found: false, message: "Insert key=4 → shift 5 right → [2,4,5,6,1,3]" },
      { array: [2,4,5,6,1,3], active: [3], found: false, message: "key=6 → already in place" },
      { array: [2,4,5,6,1,3], active: [4], found: false, message: "Insert key=1 → shift all right → [1,2,4,5,6,3]" },
      { array: [1,2,4,5,6,3], active: [5], found: true, message: "Insert key=3 → shift 4,5,6 right → [1,2,3,4,5,6]" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "outer", type: "processNode", data: { label: "i = 1 to n-1" } },
        { id: "key", type: "processNode", data: { label: "key = arr[i], j = i-1" } },
        { id: "inner", type: "decisionNode", data: { label: "j >= 0 and arr[j] > key ?" } },
        { id: "shift", type: "processNode", data: { label: "arr[j+1] = arr[j]; j--" } },
        { id: "place", type: "processNode", data: { label: "arr[j+1] = key" } }
      ],
      rawEdges: [
        { source: "start", target: "outer" },
        { source: "outer", target: "key" },
        { source: "key", target: "inner" },
        { source: "inner", target: "shift", label: "Yes" },
        { source: "shift", target: "inner" },
        { source: "inner", target: "place", label: "No" }
      ]
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
    return arr`
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
        "end procedure"
      ]
    },
    verified: true
  },

  // 12. Merge Sort (divide and conquer)
  {
    order: 12,
    slug: "merge-sort",
    title: "Merge Sort",
    category: "Sorting",
    description: "Sort an array using the divide‑and‑conquer merge sort algorithm.",
    problem: {
      statement: "Given an array of integers, sort it in ascending order using merge sort.",
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
    solve()`
      }
    },
    examples: [
      { input: "38 27 43 3 9 82 10", output: [3,9,10,27,38,43,82], explanation: "Merge sort recursively divides the array into halves, sorts them, and merges." }
    ],
    testCases: [
      { input: "5 4 3 2 1", expected: [1,2,3,4,5] },
      { input: "1 2 3 4 5", expected: [1,2,3,4,5] },
      { input: "3 1 2", expected: [1,2,3] }
    ],
    theory: {
      description: "Merge sort is a divide‑and‑conquer algorithm. It divides the array into two halves, recursively sorts them, and then merges the two sorted halves. It guarantees O(n log n) performance.",
      timeComplexity: "O(n log n) in all cases",
      spaceComplexity: "O(n) auxiliary"
    },
    keyPoints: [ "Stable sort", "Guaranteed O(n log n)", "Divide and conquer" ],
    pros: [ "Predictable performance", "Works well on linked lists", "Stable" ],
    cons: [ "Requires extra memory O(n)", "More complex to implement iteratively" ],
    input: { array: [38,27,43,3,9,82,10], target: null },
    animationSteps: [
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Split: [38,27,43,3] and [9,82,10]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Split left: [38] and [27,43,3]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Split [27,43,3] → [27] and [43,3]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Split [43,3] → [43] and [3]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Merge [43] and [3] → [3,43]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Merge [27] and [3,43] → [3,27,43]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Merge [38] and [3,27,43] → [3,27,38,43]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Split right: [9] and [82,10]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Split [82,10] → [82] and [10]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Merge [82] and [10] → [10,82]" },
      { array: [38,27,43,3,9,82,10], active: [], found: false, message: "Merge [9] and [10,82] → [9,10,82]" },
      { array: [38,27,43,3,9,82,10], active: [], found: true, message: "Final merge: [3,27,38,43] and [9,10,82] → [3,9,10,27,38,43,82]" }
    ],
    flowChartData: {
      rawNodes: [
        { id: "start", type: "terminalNode", data: { label: "Start" } },
        { id: "base", type: "decisionNode", data: { label: "length ≤ 1 ?" } },
        { id: "return", type: "ioNode", data: { label: "return arr" } },
        { id: "mid", type: "processNode", data: { label: "mid = n//2" } },
        { id: "left", type: "processNode", data: { label: "left = merge_sort(arr[0:mid])" } },
        { id: "right", type: "processNode", data: { label: "right = merge_sort(arr[mid:n])" } },
        { id: "merge", type: "processNode", data: { label: "return merge(left, right)" } }
      ],
      rawEdges: [
        { source: "start", target: "base" },
        { source: "base", target: "return", label: "Yes" },
        { source: "base", target: "mid", label: "No" },
        { source: "mid", target: "left" },
        { source: "left", target: "right" },
        { source: "right", target: "merge" }
      ]
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
    return result`
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
        "end function"
      ]
    },
    verified: true
  }
];

  await Algorithm.insertMany(algorithms);

  console.log(`✅ ${algorithms.length} algorithms seeded successfully`);
  process.exit();
};

seed();
//     // =========================
//     // ✅ PALINDROME CHECK (Level 1)
//     // =========================
//     {
//       order: 1,
//       slug: "palindrome-check",
//       title: "Palindrome Check",
//       category: "Fundamentals",

//       description: "Write a function that returns true if a given string reads the same forwards and backwards, and false otherwise.",

//       examples: [
//         {
//           input: { s: "racecar" },
//           output: true,
//           explanation: "racecar reads the same forwards and backwards"
//         },
//         {
//           input: { s: "hello" },
//           output: false,
//           explanation: "hello reversed is 'olleh', which is different"
//         }
//       ],

//       testCases: [
//         { input: { s: "racecar" }, expected: true },
//         { input: { s: "hello" }, expected: false },
//         { input: { s: "A" }, expected: true },
//         { input: { s: "ab" }, expected: false },
//         { input: { s: "a man a plan a canal panama" }, expected: true }
//       ],

//       theory: {
//         description:
//           "A Palindrome Check determines whether a given string or array reads the same forwards and backwards. The classic approach uses two pointers — one starting at the beginning and one at the end — comparing characters and moving inward until they meet.",
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(1)",
//       },

//       keyPoints: [
//         "Compares characters from both ends moving inward",
//         "Stops as soon as a mismatch is found",
//         "Works on strings and arrays alike",
//       ],

//       pros: [
//         "Linear time complexity",
//         "Constant extra space with two-pointer approach",
//         "Simple and intuitive logic",
//       ],

//       cons: [
//         "Case-sensitive by default (needs preprocessing for real-world use)",
//         "Special characters and spaces must be handled separately",
//       ],

//       input: { array: ["r", "a", "c", "e", "c", "a", "r"], target: null },

//       animationSteps: [
//         {
//           array: ["r", "a", "c", "e", "c", "a", "r"],
//           active: [0, 6],
//           found: true,
//           message: "Compare index 0 ('r') and index 6 ('r'). Match!",
//         },
//         {
//           array: ["r", "a", "c", "e", "c", "a", "r"],
//           active: [1, 5],
//           found: true,
//           message: "Compare index 1 ('a') and index 5 ('a'). Match!",
//         },
//         {
//           array: ["r", "a", "c", "e", "c", "a", "r"],
//           active: [2, 4],
//           found: true,
//           message: "Compare index 2 ('c') and index 4 ('c'). Match!",
//         },
//         {
//           array: ["r", "a", "c", "e", "c", "a", "r"],
//           active: [3],
//           found: true,
//           message: "Pointers met at center.",
//         },
//         {
//           array: ["r", "a", "c", "e", "c", "a", "r"],
//           active: [0, 1, 2, 3, 4, 5, 6],
//           found: true,
//           message: "It is a Palindrome!",
//         },
//       ],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "input",
//             type: "ioNode",
//             data: { label: "Input string s", background: "#fef3c7", borderColor: "#f59e0b" },
//           },
//           {
//             id: "init",
//             type: "processNode",
//             data: { label: "left = 0\nright = n - 1", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_pointers",
//             type: "decisionNode",
//             data: { label: "left < right ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "compare",
//             type: "decisionNode",
//             data: { label: "s[left] == s[right] ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "not_palindrome",
//             type: "ioNode",
//             data: { label: "Not a Palindrome", background: "#e9d5ff", borderColor: "#8b5cf6" },
//           },
//           {
//             id: "move_pointers",
//             type: "processNode",
//             data: { label: "left++\nright--", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "palindrome",
//             type: "ioNode",
//             data: { label: "Is a Palindrome", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "end",
//             type: "terminalNode",
//             data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "input" },
//           { id: "e2", source: "input", target: "init" },
//           { id: "e3", source: "init", target: "check_pointers" },
//           { id: "e4", source: "check_pointers", target: "compare", label: "Yes" },
//           { id: "e5", source: "check_pointers", target: "palindrome", label: "No" },
//           { id: "e6", source: "compare", target: "move_pointers", label: "Yes" },
//           { id: "e7", source: "compare", target: "not_palindrome", label: "No" },
//           { id: "e8", source: "move_pointers", target: "check_pointers" },
//           { id: "e9", source: "palindrome", target: "end" },
//           { id: "e10", source: "not_palindrome", target: "end" },
//         ],
//       },

//       code: {
//         javascript: `function isPalindrome(s) {
//   let left = 0, right = s.length - 1;
//   while (left < right) {
//     if (s[left] !== s[right]) return false;
//     left++;
//     right--;
//   }
//   return true;
// }`,
//         python: `def is_palindrome(s: str) -> bool:
//     left, right = 0, len(s) - 1
//     while left < right:
//         if s[left] != s[right]:
//             return False
//         left += 1
//         right -= 1
//     return True`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure palindrome_check",
//           "   s ← input string",
//           "   left ← 0",
//           "   right ← length(s) - 1",
//           "",
//           "   while left < right",
//           "      if s[left] ≠ s[right]",
//           "         return NOT PALINDROME",
//           "      left ← left + 1",
//           "      right ← right - 1",
//           "",
//           "   return PALINDROME",
//           "end procedure",
//         ],
//       },

//       verified: true,
//     },

//     // =========================
//     // ✅ LINEAR SEARCH (Level 2)
//     // =========================
//     {
//       order: 2,
//       slug: "linear-search",
//       title: "Linear Search",
//       category: "Searching",

//       description: "Write a function that finds the index of a target value in an array. Return -1 if not found.",

//       examples: [
//         {
//           input: { arr: [3, 8, 2, 7, 5], target: 7 },
//           output: 3,
//           explanation: "7 is found at index 3"
//         },
//         {
//           input: { arr: [1, 2, 3, 4], target: 10 },
//           output: -1,
//           explanation: "10 is not in the array"
//         }
//       ],

//       testCases: [
//         { input: { arr: [3, 8, 2, 7, 5], target: 7 }, expected: 3 },
//         { input: { arr: [1, 2, 3, 4], target: 10 }, expected: -1 },
//         { input: { arr: [5], target: 5 }, expected: 0 },
//         { input: { arr: [], target: 1 }, expected: -1 },
//         { input: { arr: [10, 20, 30, 40, 50], target: 30 }, expected: 2 }
//       ],

//       theory: {
//         description:
//           "Linear Search is a straightforward searching technique that scans each element of the array one by one from left to right until the target value is found or the list ends.",
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(1)",
//       },
//       keyPoints: [
//         "Works on both sorted and unsorted arrays",
//         "Simple and easy to implement",
//         "Checks each element one by one",
//       ],

//       pros: ["No need for sorted data", "Very simple logic", "Works on all data structures"],
//       cons: ["Slow for large datasets", "O(n) time complexity", "Not efficient for repeated searches"],

//       input: { array: [3, 8, 2, 7, 5], target: 7 },

//       animationSteps: [
//         {
//           target: 7,
//           array: [3, 8, 18, 7, 10],
//           active: [0],
//           found: false,
//           message: "Is 3 === 7? No.",
//         },
//         {
//           target: 7,
//           array: [3, 8, 18, 7, 10],
//           active: [1],
//           found: false,
//           message: "Is 8 === 7? No.",
//         },
//         {
//           target: 7,
//           array: [3, 8, 18, 7, 10],
//           active: [2],
//           found: false,
//           message: "Is 18 === 7? No.",
//         },
//         {
//           target: 7,
//           array: [3, 8, 18, 7, 10],
//           active: [3],
//           found: true,
//           message: "7 === 7, Found 7 at index 3!",
//         },
//       ],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "input",
//             type: "ioNode",
//             data: { label: "Input A, n, key", background: "#fef3c7", borderColor: "#f59e0b" },
//           },
//           {
//             id: "init",
//             type: "processNode",
//             data: { label: "i = 0", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_i",
//             type: "decisionNode",
//             data: { label: "i < n ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "compare",
//             type: "decisionNode",
//             data: { label: "A[i] == key ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "found",
//             type: "ioNode",
//             data: { label: "Found at index i", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "increment",
//             type: "processNode",
//             data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "not_found",
//             type: "ioNode",
//             data: { label: "Not Found", background: "#e9d5ff", borderColor: "#8b5cf6" },
//           },
//           {
//             id: "end",
//             type: "terminalNode",
//             data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "input" },
//           { id: "e2", source: "input", target: "init" },
//           { id: "e3", source: "init", target: "check_i" },
//           { id: "e4", source: "check_i", target: "compare", label: "Yes" },
//           { id: "e5", source: "check_i", target: "not_found", label: "No" },
//           { id: "e6", source: "compare", target: "found", label: "Yes", height: "200" },
//           { id: "e7", source: "compare", target: "increment", label: "No" },
//           { id: "e8", source: "increment", target: "check_i" },
//           { id: "e9", source: "found", target: "end" },
//           { id: "e10", source: "not_found", target: "end" },
//         ],
//       },

//       code: {
//         javascript: `function linearSearch(arr, target) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === target) return i;
//   }
//   return -1;
// }`,
//         python: `def linear_search(arr: list, target: int) -> int:
//     for i, num in enumerate(arr):
//         if num == target:
//             return i
//     return -1`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure linear_search",
//           "   A ← array",
//           "   target ← value to search",
//           "   n ← size of array",
//           "",
//           "   for i = 0 to n-1",
//           "      if A[i] == target",
//           "         return i (FOUND)",
//           "",
//           "   return NOT FOUND",
//           "end procedure",
//         ],
//       },

//       verified: true,
//     },

//     // =========================
//     // ✅ REVERSE ARRAY (Level 3)
//     // =========================
//     {
//       order: 3,
//       slug: "reverse-string-array",
//       title: "Reverse an Array",
//       category: "Fundamentals",

//       description: "Write a function that reverses an array in-place without using the built-in reverse method.",

//       examples: [
//         {
//           input: { arr: [1, 2, 3, 4, 5] },
//           output: [5, 4, 3, 2, 1],
//           explanation: "The array is reversed"
//         },
//         {
//           input: { arr: ["a", "b", "c"] },
//           output: ["c", "b", "a"],
//           explanation: "The array is reversed"
//         }
//       ],

//       testCases: [
//         { input: { arr: [1, 2, 3, 4, 5] }, expected: [5, 4, 3, 2, 1] },
//         { input: { arr: ["a", "b", "c"] }, expected: ["c", "b", "a"] },
//         { input: { arr: [1] }, expected: [1] },
//         { input: { arr: [] }, expected: [] },
//         { input: { arr: [1, 2] }, expected: [2, 1] }
//       ],

//       theory: {
//         description:
//           "Reversing a string or array means rearranging its elements so that the last element becomes first and the first becomes last. The in-place two-pointer technique swaps elements at the start and end.",
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(1)",
//       },

//       keyPoints: [
//         "Two-pointer swap from both ends toward center",
//         "In-place: no extra array needed",
//       ],

//       pros: ["Linear time, constant space", "Simple and universally applicable"],
//       cons: ["In-place mutation — need a copy if original must be preserved"],

//       input: { array: [1, 2, 3, 4, 5], target: null },

//       animationSteps: [
//         {
//           array: [1, 2, 3, 4, 5],
//           active: [0, 4],
//           found: false,
//           message: "Swap index 0 (1) and index 4 (5). Array: [5,2,3,4,1]",
//         },
//         {
//           array: [5, 2, 3, 4, 1],
//           active: [1, 3],
//           found: false,
//           message: "Swap index 1 (2) and index 3 (4). Array: [5,4,3,2,1]",
//         },
//         {
//           array: [5, 4, 3, 2, 1],
//           active: [2],
//           found: true,
//           message: "Pointers met at center. Reversal complete!",
//         },
//       ],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "input",
//             type: "ioNode",
//             data: { label: "Input array A, size n", background: "#fef3c7", borderColor: "#f59e0b" },
//           },
//           {
//             id: "init",
//             type: "processNode",
//             data: { label: "left = 0\nright = n - 1", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_pointers",
//             type: "decisionNode",
//             data: { label: "left < right ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "swap",
//             type: "processNode",
//             data: { label: "Swap A[left], A[right]", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "move_pointers",
//             type: "processNode",
//             data: { label: "left++\nright--", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "output",
//             type: "ioNode",
//             data: { label: "Output reversed A", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "end",
//             type: "terminalNode",
//             data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "input" },
//           { id: "e2", source: "input", target: "init" },
//           { id: "e3", source: "init", target: "check_pointers" },
//           { id: "e4", source: "check_pointers", target: "swap", label: "Yes" },
//           { id: "e5", source: "check_pointers", target: "output", label: "No" },
//           { id: "e6", source: "swap", target: "move_pointers" },
//           { id: "e7", source: "move_pointers", target: "check_pointers" },
//           { id: "e8", source: "output", target: "end" },
//         ],
//       },

//       code: {
//         javascript: `function reverseArray(arr) {
//   let left = 0, right = arr.length - 1;
//   while (left < right) {
//     [arr[left], arr[right]] = [arr[right], arr[left]];
//     left++;
//     right--;
//   }
//   return arr;
// }`,
//         python: `def reverse_array(arr: list) -> list:
//     left, right = 0, len(arr) - 1
//     while left < right:
//         arr[left], arr[right] = arr[right], arr[left]
//         left += 1
//         right -= 1
//     return arr`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure reverse",
//           "   A ← input array",
//           "   left ← 0",
//           "   right ← length(A) - 1",
//           "",
//           "   while left < right",
//           "      swap A[left], A[right]",
//           "      left ← left + 1",
//           "      right ← right - 1",
//           "",
//           "   return A",
//           "end procedure",
//         ],
//       },

//       verified: true,
//     },

//     // =========================
//     // ✅ FACTORIAL (Level 4)
//     // =========================
//     {
//       order: 4,
//       slug: "factorial",
//       title: "Factorial",
//       category: "Fundamentals",

//       description: "Write a function that returns the factorial of a non-negative integer n (n!).",

//       examples: [
//         {
//           input: { n: 5 },
//           output: 120,
//           explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120"
//         },
//         {
//           input: { n: 0 },
//           output: 1,
//           explanation: "0! is defined as 1"
//         }
//       ],

//       testCases: [
//         { input: { n: 5 }, expected: 120 },
//         { input: { n: 0 }, expected: 1 },
//         { input: { n: 1 }, expected: 1 },
//         { input: { n: 3 }, expected: 6 },
//         { input: { n: 4 }, expected: 24 }
//       ],

//       theory: {
//         description:
//           "Factorial of a non-negative integer n (written as n!) is the product of all positive integers from 1 to n.",
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(1)",
//       },

//       keyPoints: [
//         "Defined as n × (n-1) × ... × 1",
//         "Base case: 0! = 1",
//         "Can be computed iteratively or recursively",
//       ],

//       pros: ["Simple concept and implementation", "Iterative version uses constant space"],
//       cons: ["Grows extremely fast — overflows for large n"],

//       input: { array: [5], target: null },

//       animationSteps: [
//         {
//           array: [5],
//           active: [0],
//           found: false,
//           message: "n = 5, result = 1. Start loop.",
//         },
//         {
//           array: [5, 1],
//           active: [0],
//           found: false,
//           message: "i = 1: result = 1 × 1 = 1",
//         },
//         {
//           array: [5, 2],
//           active: [0],
//           found: false,
//           message: "i = 2: result = 1 × 2 = 2",
//         },
//         {
//           array: [5, 3],
//           active: [0],
//           found: false,
//           message: "i = 3: result = 2 × 3 = 6",
//         },
//         {
//           array: [5, 4],
//           active: [0],
//           found: false,
//           message: "i = 4: result = 6 × 4 = 24",
//         },
//         {
//           array: [5, 5],
//           active: [0],
//           found: true,
//           message: "i = 5: result = 24 × 5 = 120. Done!",
//         },
//       ],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "input",
//             type: "ioNode",
//             data: { label: "Input n", background: "#fef3c7", borderColor: "#f59e0b" },
//           },
//           {
//             id: "init",
//             type: "processNode",
//             data: { label: "result = 1\ni = 1", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_i",
//             type: "decisionNode",
//             data: { label: "i ≤ n ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "multiply",
//             type: "processNode",
//             data: { label: "result = result × i", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "increment",
//             type: "processNode",
//             data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "output",
//             type: "ioNode",
//             data: { label: "Output result", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "end",
//             type: "terminalNode",
//             data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "input" },
//           { id: "e2", source: "input", target: "init" },
//           { id: "e3", source: "init", target: "check_i" },
//           { id: "e4", source: "check_i", target: "multiply", label: "Yes" },
//           { id: "e5", source: "check_i", target: "output", label: "No" },
//           { id: "e6", source: "multiply", target: "increment" },
//           { id: "e7", source: "increment", target: "check_i" },
//           { id: "e8", source: "output", target: "end" },
//         ],
//       },

//       code: {
//         javascript: `function factorial(n) {
//   if (n < 0) return undefined;
//   let result = 1;
//   for (let i = 2; i <= n; i++) {
//     result *= i;
//   }
//   return result;
// }`,
//         python: `def factorial(n: int) -> int:
//     if n < 0:
//         return None
//     result = 1
//     for i in range(2, n + 1):
//         result *= i
//     return result`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure factorial",
//           "   n ← input number",
//           "   result ← 1",
//           "   i ← 1",
//           "",
//           "   while i ≤ n",
//           "      result ← result × i",
//           "      i ← i + 1",
//           "",
//           "   return result",
//           "end procedure",
//         ],
//       },

//       verified: true,
//     },

//     // =========================
//     // ✅ PRIME NUMBER CHECK (Level 5)
//     // =========================
//     {
//       order: 5,
//       slug: "prime-number-check",
//       title: "Prime Number Check",
//       category: "Fundamentals",

//       description: "Write a function that returns true if a number is prime, false otherwise.",

//       examples: [
//         {
//           input: { n: 17 },
//           output: true,
//           explanation: "17 is only divisible by 1 and itself"
//         },
//         {
//           input: { n: 15 },
//           output: false,
//           explanation: "15 is divisible by 3 and 5"
//         }
//       ],

//       testCases: [
//         { input: { n: 17 }, expected: true },
//         { input: { n: 15 }, expected: false },
//         { input: { n: 2 }, expected: true },
//         { input: { n: 1 }, expected: false },
//         { input: { n: 97 }, expected: true }
//       ],

//       theory: {
//         description:
//           "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
//         timeComplexity: "O(√n)",
//         spaceComplexity: "O(1)",
//       },

//       keyPoints: [
//         "Only test divisors up to √n",
//         "Handle edge cases: n < 2 is not prime",
//       ],

//       pros: ["O(√n) is much faster than O(n) trial division", "Constant space usage"],
//       cons: ["Slow for very large numbers (use Miller-Rabin for cryptography)"],

//       input: { array: [17], target: null },

//       animationSteps: [
//         {
//           array: [17],
//           active: [0],
//           found: false,
//           message: "n = 17. Check if n < 2. No.",
//         },
//         {
//           array: [17],
//           active: [0],
//           found: false,
//           message: "i = 2: 17 % 2 = 1. Not divisible.",
//         },
//         {
//           array: [17],
//           active: [0],
//           found: false,
//           message: "i = 3: 17 % 3 = 2. Not divisible.",
//         },
//         {
//           array: [17],
//           active: [0],
//           found: false,
//           message: "i = 4: 4 > √17 ≈ 4.12. Stop.",
//         },
//         {
//           array: [17],
//           active: [0],
//           found: true,
//           message: "No divisor found. 17 is Prime!",
//         },
//       ],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "input",
//             type: "ioNode",
//             data: { label: "Input n", background: "#fef3c7", borderColor: "#f59e0b" },
//           },
//           {
//             id: "check_lt2",
//             type: "decisionNode",
//             data: { label: "n < 2 ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "not_prime_early",
//             type: "ioNode",
//             data: { label: "Not Prime", background: "#e9d5ff", borderColor: "#8b5cf6" },
//           },
//           {
//             id: "init_i",
//             type: "processNode",
//             data: { label: "i = 2", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_i",
//             type: "decisionNode",
//             data: { label: "i ≤ √n ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "check_mod",
//             type: "decisionNode",
//             data: { label: "n % i == 0 ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "not_prime",
//             type: "ioNode",
//             data: { label: "Not Prime", background: "#e9d5ff", borderColor: "#8b5cf6" },
//           },
//           {
//             id: "increment",
//             type: "processNode",
//             data: { label: "i = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "prime",
//             type: "ioNode",
//             data: { label: "Prime", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "end",
//             type: "terminalNode",
//             data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "input" },
//           { id: "e2", source: "input", target: "check_lt2" },
//           { id: "e3", source: "check_lt2", target: "not_prime_early", label: "Yes" },
//           { id: "e4", source: "check_lt2", target: "init_i", label: "No" },
//           { id: "e5", source: "init_i", target: "check_i" },
//           { id: "e6", source: "check_i", target: "check_mod", label: "Yes" },
//           { id: "e7", source: "check_i", target: "prime", label: "No" },
//           { id: "e8", source: "check_mod", target: "not_prime", label: "Yes" },
//           { id: "e9", source: "check_mod", target: "increment", label: "No" },
//           { id: "e10", source: "increment", target: "check_i" },
//           { id: "e11", source: "not_prime_early", target: "end" },
//           { id: "e12", source: "not_prime", target: "end" },
//           { id: "e13", source: "prime", target: "end" },
//         ],
//       },

//       code: {
//         javascript: `function isPrime(n) {
//   if (n < 2) return false;
//   for (let i = 2; i <= Math.sqrt(n); i++) {
//     if (n % i === 0) return false;
//   }
//   return true;
// }`,
//         python: `def is_prime(n: int) -> bool:
//     if n < 2:
//         return False
//     for i in range(2, int(n ** 0.5) + 1):
//         if n % i == 0:
//             return False
//     return True`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure prime_check",
//           "   n ← input number",
//           "",
//           "   if n < 2",
//           "      return NOT PRIME",
//           "",
//           "   for i = 2 to √n",
//           "      if n mod i == 0",
//           "         return NOT PRIME",
//           "",
//           "   return PRIME",
//           "end procedure",
//         ],
//       },

//       verified: true,
//     },

//     // =========================
//     // ✅ FIBONACCI (Level 6)
//     // =========================
//     {
//       order: 6,
//       slug: "fibonacci",
//       title: "Fibonacci",
//       category: "Dynamic Programming",

//       description: "Write a function that returns the nth Fibonacci number (0-indexed).",

//       examples: [
//         {
//           input: { n: 7 },
//           output: 13,
//           explanation: "Sequence: 0, 1, 1, 2, 3, 5, 8, 13 → F(7) = 13"
//         },
//         {
//           input: { n: 0 },
//           output: 0,
//           explanation: "F(0) = 0"
//         }
//       ],

//       testCases: [
//         { input: { n: 7 }, expected: 13 },
//         { input: { n: 0 }, expected: 0 },
//         { input: { n: 1 }, expected: 1 },
//         { input: { n: 2 }, expected: 1 },
//         { input: { n: 10 }, expected: 55 }
//       ],

//       theory: {
//         description:
//           "The Fibonacci sequence is a series where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, …",
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(1)",
//       },

//       keyPoints: [
//         "Each term is the sum of the two before it",
//         "Naive recursion is O(2^n) — avoid it",
//         "Iterative approach achieves O(n) time",
//       ],

//       pros: ["Classic introduction to dynamic programming", "Iterative version is memory efficient"],
//       cons: ["Integer overflow for large n without big-integer libraries"],

//       input: { array: [7], target: null },

//       animationSteps: [
//         {
//           array: [0, 1],
//           active: [0, 1],
//           found: false,
//           message: "Base cases: F(0)=0, F(1)=1.",
//         },
//         {
//           array: [0, 1, 1],
//           active: [2],
//           found: false,
//           message: "F(2) = F(1) + F(0) = 1 + 0 = 1",
//         },
//         {
//           array: [0, 1, 1, 2],
//           active: [3],
//           found: false,
//           message: "F(3) = F(2) + F(1) = 1 + 1 = 2",
//         },
//         {
//           array: [0, 1, 1, 2, 3],
//           active: [4],
//           found: false,
//           message: "F(4) = F(3) + F(2) = 2 + 1 = 3",
//         },
//         {
//           array: [0, 1, 1, 2, 3, 5],
//           active: [5],
//           found: false,
//           message: "F(5) = F(4) + F(3) = 3 + 2 = 5",
//         },
//         {
//           array: [0, 1, 1, 2, 3, 5, 8],
//           active: [6],
//           found: false,
//           message: "F(6) = F(5) + F(4) = 5 + 3 = 8",
//         },
//         {
//           array: [0, 1, 1, 2, 3, 5, 8, 13],
//           active: [7],
//           found: true,
//           message: "F(7) = F(6) + F(5) = 8 + 5 = 13. Done!",
//         },
//       ],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "input",
//             type: "ioNode",
//             data: { label: "Input n", background: "#fef3c7", borderColor: "#f59e0b" },
//           },
//           {
//             id: "check_base",
//             type: "decisionNode",
//             data: { label: "n ≤ 1 ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "return_n",
//             type: "ioNode",
//             data: { label: "Return n", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "init",
//             type: "processNode",
//             data: { label: "prev = 0\ncurr = 1\ni = 2", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_i",
//             type: "decisionNode",
//             data: { label: "i ≤ n ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "compute",
//             type: "processNode",
//             data: { label: "next = prev + curr\nprev = curr\ncurr = next\ni++", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "output",
//             type: "ioNode",
//             data: { label: "Return curr", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "end",
//             type: "terminalNode",
//             data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "input" },
//           { id: "e2", source: "input", target: "check_base" },
//           { id: "e3", source: "check_base", target: "return_n", label: "Yes" },
//           { id: "e4", source: "check_base", target: "init", label: "No" },
//           { id: "e5", source: "init", target: "check_i" },
//           { id: "e6", source: "check_i", target: "compute", label: "Yes" },
//           { id: "e7", source: "check_i", target: "output", label: "No" },
//           { id: "e8", source: "compute", target: "check_i" },
//           { id: "e9", source: "return_n", target: "end" },
//           { id: "e10", source: "output", target: "end" },
//         ],
//       },

//       code: {
//         javascript: `function fibonacci(n) {
//   if (n <= 1) return n;
//   let prev = 0, curr = 1;
//   for (let i = 2; i <= n; i++) {
//     let next = prev + curr;
//     prev = curr;
//     curr = next;
//   }
//   return curr;
// }`,
//         python: `def fibonacci(n: int) -> int:
//     if n <= 1:
//         return n
//     prev, curr = 0, 1
//     for _ in range(2, n + 1):
//         prev, curr = curr, prev + curr
//     return curr`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure fibonacci",
//           "   n ← input number",
//           "",
//           "   if n ≤ 1",
//           "      return n",
//           "",
//           "   prev ← 0",
//           "   curr ← 1",
//           "",
//           "   for i = 2 to n",
//           "      next ← prev + curr",
//           "      prev ← curr",
//           "      curr ← next",
//           "",
//           "   return curr",
//           "end procedure",
//         ],
//       },

//       verified: true,
//     },

//     // =========================
//     // ✅ BINARY SEARCH (Level 7)
//     // =========================
//     {
//       order: 7,
//       slug: "binary-search",
//       title: "Binary Search",
//       category: "Searching",

//       description: "Write a function that finds the index of a target value in a SORTED array using binary search. Return -1 if not found.",

//       examples: [
//         {
//           input: { arr: [1, 3, 5, 7, 9], target: 7 },
//           output: 3,
//           explanation: "7 is found at index 3"
//         },
//         {
//           input: { arr: [1, 3, 5, 7, 9], target: 2 },
//           output: -1,
//           explanation: "2 is not in the array"
//         }
//       ],

//       testCases: [
//         { input: { arr: [1, 3, 5, 7, 9], target: 7 }, expected: 3 },
//         { input: { arr: [1, 3, 5, 7, 9], target: 2 }, expected: -1 },
//         { input: { arr: [1], target: 1 }, expected: 0 },
//         { input: { arr: [1, 2, 3, 4, 5], target: 1 }, expected: 0 },
//         { input: { arr: [1, 2, 3, 4, 5], target: 5 }, expected: 4 }
//       ],

//       theory: {
//         description:
//           "Binary Search is an efficient divide-and-conquer algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
//         timeComplexity: "O(log n)",
//         spaceComplexity: "O(1)",
//       },

//       keyPoints: [
//         "Requires sorted array",
//         "Works by dividing search space",
//         "Eliminates half elements each step",
//       ],

//       pros: ["Very fast for large datasets", "Logarithmic time complexity"],
//       cons: ["Only works on sorted arrays", "Harder to implement than linear search"],

//       input: { array: [1, 3, 5, 7, 9], target: 7 },

//       animationSteps: [
//         {
//           array: [2, 5, 8, 12, 18, 25, 30],
//           active: [0, 1, 2, 3, 4, 5, 6],
//           found: false,
//           message: "Initial Range",
//         },
//         {
//           array: [2, 5, 8, 12, 18, 25, 30],
//           active: [3],
//           found: false,
//           message: "Check middle: 12. Too low!",
//         },
//         {
//           array: [2, 5, 8, 12, 18, 25, 30],
//           active: [4, 5, 6],
//           found: false,
//           message: "New range: Right side",
//         },
//         {
//           array: [2, 5, 8, 12, 18, 25, 30],
//           active: [5],
//           found: false,
//           message: "Check middle: 25. Too high!",
//         },
//         {
//           array: [2, 5, 8, 12, 18, 25, 30],
//           active: [4],
//           found: true,
//           message: "Found 18!",
//         },
//       ],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "init",
//             type: "processNode",
//             data: { label: "low = 0, high = n-1", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_bounds",
//             type: "decisionNode",
//             data: { label: "low ≤ high ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "calc_mid",
//             type: "processNode",
//             data: { label: "mid = (low + high) / 2", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "compare",
//             type: "decisionNode",
//             data: { label: "arr[mid] == target ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "found",
//             type: "ioNode",
//             data: { label: "Found at index mid", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "check_side",
//             type: "decisionNode",
//             data: { label: "arr[mid] > target ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "move_left",
//             type: "processNode",
//             data: { label: "high = mid - 1", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "move_right",
//             type: "processNode",
//             data: { label: "low = mid + 1", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "not_found",
//             type: "ioNode",
//             data: { label: "Not Found", background: "#e9d5ff", borderColor: "#8b5cf6" },
//           },
//           {
//             id: "end",
//             type: "terminalNode",
//             data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "init" },
//           { id: "e2", source: "init", target: "check_bounds" },
//           { id: "e3", source: "check_bounds", target: "calc_mid", label: "Yes" },
//           { id: "e4", source: "check_bounds", target: "not_found", label: "No" },
//           { id: "e5", source: "calc_mid", target: "compare" },
//           { id: "e6", source: "compare", target: "found", label: "Yes" },
//           { id: "e7", source: "compare", target: "check_side", label: "No" },
//           { id: "e8", source: "check_side", target: "move_left", label: "Yes" },
//           { id: "e9", source: "check_side", target: "move_right", label: "No" },
//           { id: "e10", source: "move_left", target: "check_bounds" },
//           { id: "e11", source: "move_right", target: "check_bounds" },
//           { id: "e12", source: "found", target: "end" },
//           { id: "e13", source: "not_found", target: "end" },
//         ],
//       },

//       code: {
//         javascript: `function binarySearch(arr, target) {
//   let left = 0, right = arr.length - 1;
//   while (left <= right) {
//     let mid = Math.floor((left + right) / 2);
//     if (arr[mid] === target) return mid;
//     if (arr[mid] < target) left = mid + 1;
//     else right = mid - 1;
//   }
//   return -1;
// }`,
//         python: `def binary_search(arr: list, target: int) -> int:
//     left, right = 0, len(arr) - 1
//     while left <= right:
//         mid = (left + right) // 2
//         if arr[mid] == target:
//             return mid
//         elif arr[mid] < target:
//             left = mid + 1
//         else:
//             right = mid - 1
//     return -1`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure binary_search",
//           "   A ← sorted array",
//           "   n ← size of array",
//           "   x ← value to be searched",
//           "",
//           "   lowerBound ← 0",
//           "   upperBound ← n - 1",
//           "",
//           "   while lowerBound ≤ upperBound",
//           "      mid ← (lowerBound + upperBound) / 2",
//           "",
//           "      if A[mid] == x",
//           "         return mid (FOUND)",
//           "",
//           "      else if A[mid] < x",
//           "         lowerBound ← mid + 1",
//           "",
//           "      else",
//           "         upperBound ← mid - 1",
//           "",
//           "   return NOT FOUND",
//           "end procedure",
//         ],
//       },

//       verified: true,
//     },

//     // =========================
//     // ✅ TWO SUM (Level 8)
//     // =========================
//     {
//       order: 8,
//       slug: "two-sum",
//       title: "Two Sum",
//       category: "Arrays",

//       description: "Write a function that returns the indices of two numbers that add up to the target.",

//       examples: [
//         {
//           input: { nums: [2, 7, 11, 15], target: 9 },
//           output: [0, 1],
//           explanation: "2 + 7 = 9, indices 0 and 1"
//         },
//         {
//           input: { nums: [3, 2, 4], target: 6 },
//           output: [1, 2],
//           explanation: "2 + 4 = 6, indices 1 and 2"
//         }
//       ],

//       testCases: [
//         { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
//         { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
//         { input: { nums: [3, 3], target: 6 }, expected: [0, 1] },
//         { input: { nums: [1, 2, 3, 4, 5], target: 9 }, expected: [3, 4] }
//       ],

//       theory: {
//         description:
//           "The Two Sum problem asks: given an array of integers and a target value, find the indices of two numbers that add up to the target.",
//         timeComplexity: "O(n)",
//         spaceComplexity: "O(n)",
//       },

//       keyPoints: [
//         "Use a hash map to store complement → index",
//         "Single pass through the array",
//       ],

//       pros: ["O(n) time — far better than the O(n²) brute force", "Clean implementation"],
//       cons: ["Requires O(n) extra space for the hash map"],

//       input: { array: [2, 7, 11, 15], target: 9 },

//       animationSteps: [
//         {
//           array: [2, 7, 11, 15],
//           active: [0],
//           found: false,
//           message: "i=0, val=2. Complement = 9-2 = 7. Not in map. Store {2:0}.",
//         },
//         {
//           array: [2, 7, 11, 15],
//           active: [1],
//           found: false,
//           message: "i=1, val=7. Complement = 9-7 = 2. Found 2 in map at index 0!",
//         },
//         {
//           array: [2, 7, 11, 15],
//           active: [0, 1],
//           found: true,
//           message: "Result: indices [0, 1]. Values 2 + 7 = 9.",
//         },
//       ],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "input",
//             type: "ioNode",
//             data: { label: "Input array A, target", background: "#fef3c7", borderColor: "#f59e0b" },
//           },
//           {
//             id: "init",
//             type: "processNode",
//             data: { label: "map = {}\ni = 0", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_i",
//             type: "decisionNode",
//             data: { label: "i < n ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "calc_comp",
//             type: "processNode",
//             data: { label: "complement = target - A[i]", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "check_map",
//             type: "decisionNode",
//             data: { label: "complement in map ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "found",
//             type: "ioNode",
//             data: { label: "Return [map[complement], i]", background: "#bbf7d0", borderColor: "#22c55e" },
//           },
//           {
//             id: "store",
//             type: "processNode",
//             data: { label: "map[A[i]] = i\ni = i + 1", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "not_found",
//             type: "ioNode",
//             data: { label: "No solution found", background: "#e9d5ff", borderColor: "#8b5cf6" },
//           },
//           {
//             id: "end",
//             type: "terminalNode",
//             data: { label: "End", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "input" },
//           { id: "e2", source: "input", target: "init" },
//           { id: "e3", source: "init", target: "check_i" },
//           { id: "e4", source: "check_i", target: "calc_comp", label: "Yes" },
//           { id: "e5", source: "check_i", target: "not_found", label: "No" },
//           { id: "e6", source: "calc_comp", target: "check_map" },
//           { id: "e7", source: "check_map", target: "found", label: "Yes" },
//           { id: "e8", source: "check_map", target: "store", label: "No" },
//           { id: "e9", source: "store", target: "check_i" },
//           { id: "e10", source: "found", target: "end" },
//           { id: "e11", source: "not_found", target: "end" },
//         ],
//       },

//       code: {
//         javascript: `function twoSum(nums, target) {
//   const map = {};
//   for (let i = 0; i < nums.length; i++) {
//     const complement = target - nums[i];
//     if (map[complement] !== undefined) {
//       return [map[complement], i];
//     }
//     map[nums[i]] = i;
//   }
//   return [];
// }`,
//         python: `def two_sum(nums: list, target: int) -> list:
//     seen = {}
//     for i, num in enumerate(nums):
//         complement = target - num
//         if complement in seen:
//             return [seen[complement], i]
//         seen[num] = i
//     return []`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure two_sum",
//           "   A ← input array",
//           "   target ← desired sum",
//           "   map ← empty hash map",
//           "",
//           "   for i = 0 to n-1",
//           "      complement ← target - A[i]",
//           "",
//           "      if complement is in map",
//           "         return [map[complement], i]",
//           "",
//           "      map[A[i]] ← i",
//           "",
//           "   return NOT FOUND",
//           "end procedure",
//         ],
//       },

//       verified: true,
//     },

//     // =========================
//     // ✅ BUBBLE SORT (Level 9)
//     // =========================
//     {
//       order: 9,
//       slug: "bubble-sort",
//       title: "Bubble Sort",
//       category: "Sorting",

//       description: "Write a function that sorts an array using the bubble sort algorithm.",

//       examples: [
//         {
//           input: { arr: [5, 3, 8, 4, 2] },
//           output: [2, 3, 4, 5, 8],
//           explanation: "Array sorted in ascending order"
//         },
//         {
//           input: { arr: [1, 2, 3] },
//           output: [1, 2, 3],
//           explanation: "Already sorted array"
//         }
//       ],

//       testCases: [
//         { input: { arr: [5, 3, 8, 4, 2] }, expected: [2, 3, 4, 5, 8] },
//         { input: { arr: [1, 2, 3] }, expected: [1, 2, 3] },
//         { input: { arr: [3, 2, 1] }, expected: [1, 2, 3] },
//         { input: { arr: [1] }, expected: [1] },
//         { input: { arr: [] }, expected: [] }
//       ],

//       theory: {
//         description:
//           "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
//         timeComplexity: "O(n^2)",
//         spaceComplexity: "O(1)",
//       },

//       keyPoints: [
//         "Repeatedly compares adjacent elements",
//         "Largest element moves to end in each pass",
//       ],

//       pros: ["Easy to understand and implement", "No extra memory required"],
//       cons: ["Very slow for large datasets", "O(n^2) time complexity"],

//       input: { array: [5, 3, 8, 4], target: null },

//       animationSteps: [],

//       flowChartData: {
//         rawNodes: [
//           {
//             id: "start",
//             type: "terminalNode",
//             data: { label: "Start", background: "#d1fae5", borderColor: "#10b981" },
//           },
//           {
//             id: "init_i",
//             type: "processNode",
//             data: { label: "i = 0", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_i",
//             type: "decisionNode",
//             data: { label: "i < n ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "init_j",
//             type: "processNode",
//             data: { label: "j = 0", background: "#fecaca", borderColor: "#ef4444" },
//           },
//           {
//             id: "check_j",
//             type: "decisionNode",
//             data: { label: "j < n-i-1 ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "compare",
//             type: "decisionNode",
//             data: { label: "arr[j] > arr[j+1] ?", background: "#dbeafe", borderColor: "#3b82f6" },
//           },
//           {
//             id: "swap",
//             type: "processNode",
//             data: { label: "Swap arr[j], arr[j+1]", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "inc_j",
//             type: "processNode",
//             data: { label: "j++", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "inc_i",
//             type: "processNode",
//             data: { label: "i++", background: "#fde68a", borderColor: "#f59e0b" },
//           },
//           {
//             id: "sorted",
//             type: "terminalNode",
//             data: { label: "Sorted", background: "#d1fae5", borderColor: "#10b981" },
//           },
//         ],
//         rawEdges: [
//           { id: "e1", source: "start", target: "init_i" },
//           { id: "e2", source: "init_i", target: "check_i" },
//           { id: "e3", source: "check_i", target: "init_j", label: "Yes" },
//           { id: "e4", source: "check_i", target: "sorted", label: "No" },
//           { id: "e5", source: "init_j", target: "check_j" },
//           { id: "e6", source: "check_j", target: "compare", label: "Yes" },
//           { id: "e7", source: "check_j", target: "inc_i", label: "No" },
//           { id: "e8", source: "compare", target: "swap", label: "Yes" },
//           { id: "e9", source: "compare", target: "inc_j", label: "No" },
//           { id: "e10", source: "swap", target: "inc_j" },
//           { id: "e11", source: "inc_j", target: "check_j" },
//           { id: "e12", source: "inc_i", target: "check_i" },
//         ],
//       },

//       code: {
//         javascript: `function bubbleSort(arr) {
//   const n = arr.length;
//   for (let i = 0; i < n - 1; i++) {
//     for (let j = 0; j < n - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//       }
//     }
//   }
//   return arr;
// }`,
//         python: `def bubble_sort(arr: list) -> list:
//     n = len(arr)
//     for i in range(n - 1):
//         for j in range(n - i - 1):
//             if arr[j] > arr[j + 1]:
//                 arr[j], arr[j + 1] = arr[j + 1], arr[j]
//     return arr`
//       },

//       pseudocode: {
//         lines: [
//           "Procedure bubble_sort",
//           "   A ← array",
//           "   n ← size of array",
//           "",
//           "   for i = 0 to n-1",
//           "      for j = 0 to n-i-2",
//           "         if A[j] > A[j+1]",
//           "            swap A[j], A[j+1]",
//           "",
//           "   return A",
//           "end procedure",
//         ],
//       },

//       verified: false,
//     },
//   ];
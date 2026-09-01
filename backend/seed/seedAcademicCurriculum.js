import connectDB from "../config/db.js";
import Lab from "../models/Lab.js";
import Practical from "../models/Practical.js";

const curriculum = [
  {
    name: "C Programming Lab",
    subjectCode: "CS-C",
    language: "c",
    topics: [
      "Program structure and output",
      "Variables and data types",
      "Operators and expressions",
      "Conditional statements",
      "Loops",
      "Functions",
      "Arrays",
      "Pointers",
      "Structures",
      "File handling",
      "Dijkstra's Algorithm",
    ],
  },
  {
    name: "C++ Programming Lab",
    subjectCode: "CS-CPP",
    language: "cpp",
    topics: [
      "Program structure and I/O",
      "Data types and control flow",
      "Functions and recursion",
      "Arrays and strings",
      "Pointers and references",
      "Classes and objects",
      "Inheritance",
      "Polymorphism",
      "STL containers",
      "File handling",
    ],
  },
  {
    name: "Java Programming Lab",
    subjectCode: "CS-JAVA",
    language: "java",
    topics: [
      "Program structure and output",
      "Data types and operators",
      "Control flow",
      "Methods and arrays",
      "Classes and objects",
      "Inheritance",
      "Interfaces and packages",
      "Exception handling",
      "Collections",
      "File I/O",
    ],
  },
];

const templateFor = (language, title) => {
  if (language === "c")
    return {
      prefix: "#include <stdio.h>\n\nint main(void) {\n",
      starterSolution: `  // ${title}\n`,
      suffix: "  return 0;\n}\n",
    };
  if (language === "cpp")
    return {
      prefix: "#include <iostream>\nusing namespace std;\n\nint main() {\n",
      starterSolution: `  // ${title}\n`,
      suffix: "  return 0;\n}\n",
    };
  return {
    prefix:
      "import java.util.*;\n\npublic class Main {\n  public static void main(String[] args) {\n",
    starterSolution: `    // ${title}\n`,
    suffix: "  }\n}\n",
  };
};

const dijkstraPracticalConfig = () => ({
  description:
    "Use Dijkstra's algorithm to find the shortest path distances from a source vertex in a weighted graph.",
  instructions:
    "Write a complete C program using the starter code below. The first line contains n and source. The next n lines contain the adjacency matrix representing the graph. Implement Dijkstra's algorithm and print the distance from the source to each vertex in the order A, B, C, ... . Use the starter only as a guide; write the actual solution in the marked section.",
  starterTemplate: {
    c: {
      prefix: "",
      starterSolution: `#include<stdio.h>
#include<limits.h>
#include<stdbool.h>

void greedy_dijsktra(int graph[6][6], int src ){
 // write your solution here
}

int main(){
  int graph[6][6] = {
     {0, 1, 2, 0, 0, 0},
     {1, 0, 0, 5, 1, 0},
     {2, 0, 0, 2, 3, 0},
     {0, 5, 2, 0, 2, 2},
     {0, 1, 3, 2, 0, 1},
     {0, 0, 0, 2, 1, 0}
  };
  greedy_dijsktra(graph,0);
  return 0;
}`,
      suffix: "",
    },
  },
  testCases: [
    {
      input: "",
      expected:
        "Vertex\t\tdist from source vertex\nA\t\t\t0\nB\t\t\t1\nC\t\t\t2\nD\t\t\t4\nE\t\t\t2\nF\t\t\t3\n",
      visibility: "public",
      weight: 1,
    },
    {
      input: "",
      expected:
        "Vertex\t\tdist from source vertex\nA\t\t\t0\nB\t\t\t1\nC\t\t\t2\nD\t\t\t4\nE\t\t\t2\nF\t\t\t3\n",
      visibility: "public",
      weight: 1,
    },
    {
      input: "",
      expected:
        "Vertex\t\tdist from source vertex\nA\t\t\t0\nB\t\t\t1\nC\t\t\t2\nD\t\t\t4\nE\t\t\t2\nF\t\t\t3\n",
      visibility: "public",
      weight: 1,
    },
  ],
});

const seed = async () => {
  await connectDB();
  await Lab.deleteMany({
    session: "Shared Curriculum",
  });
  for (const item of curriculum) {
    let lab = await Lab.findOne({
      subjectCode: item.subjectCode,
      kind: "academic",
    });
    if (!lab) {
      lab = await Lab.create({
        name: item.name,
        subjectCode: item.subjectCode,
        session: "Shared Curriculum",
        kind: "academic",
        status: "current",
      });
    }
    for (const [index, title] of item.topics.entries()) {
      const existing = await Practical.findOne({
        labId: lab._id,
        order: index + 1,
      });
      if (!existing) {
        const customPractical =
          item.language === "c" && title === "Dijkstra's Algorithm"
            ? dijkstraPracticalConfig()
            : null;

        await Practical.create({
          labId: lab._id,
          title: `${index + 1}. ${title}`,
          description:
            customPractical?.description ??
            `Core ${item.name} exercise: ${title}.`,
          instructions:
            customPractical?.instructions ??
            "Complete the solution area. Your teacher may add test cases and instructions.",
          order: index + 1,
          starterTemplate: {
            [item.language]:
              customPractical?.starterTemplate?.[item.language] ??
              templateFor(item.language, title),
          },
          testCases: customPractical?.testCases ?? [
            { input: "", expected: "", visibility: "public", weight: 1 },
          ],
          execution: {
            enabled: true,
            allowedLanguages: [item.language],
            timeLimitSeconds: 2,
            memoryLimitKb: 128000,
          },
        });
      }
    }
  }
  console.log("Academic C, C++, and Java curricula seeded.");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

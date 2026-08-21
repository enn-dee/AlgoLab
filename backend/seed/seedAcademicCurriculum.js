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
        await Practical.create({
          labId: lab._id,
          title: `${index + 1}. ${title}`,
          description: `Core ${item.name} exercise: ${title}.`,
          instructions:
            "Complete the solution area. Your teacher may add test cases and instructions.",
          order: index + 1,
          starterTemplate: {
            [item.language]: templateFor(item.language, title),
          },
          testCases: [
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

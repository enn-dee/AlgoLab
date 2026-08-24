const languageIds = { python: 71, javascript: 63, c: 50, cpp: 54, java: 62 };

const normalise = (value) => String(value ?? "").replace(/\r\n/g, "\n").trim();
const inputFor = (input) => {
  if (typeof input === "string") return input;
  if (Array.isArray(input)) return input.join(" ");
  if (input && typeof input === "object") return Object.values(input).join(" ");
  return String(input ?? "");
};

const defaultExecution = { timeLimitSeconds: 5, memoryLimitKb: 128000 };

export async function runJudge0Simple({ sourceCode, language, stdin = "", execution = defaultExecution }) {
  const languageId = languageIds[language];
  if (!languageId) throw new Error("Unsupported execution language");
  const endpoint = process.env.JUDGE0_URL || "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    (execution.timeLimitSeconds + 5) * 1000,
  );
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        source_code: sourceCode,
        language_id: languageId,
        stdin,
        cpu_time_limit: execution.timeLimitSeconds,
        memory_limit: execution.memoryLimitKb,
      }),
    });
    if (!response.ok) throw new Error(`Code runner returned ${response.status}`);
    const data = await response.json();
    return {
      stdout: data.stdout ?? "",
      stderr: data.stderr ?? data.compile_output ?? "",
      runtimeMs: data.time ? Math.round(Number(data.time) * 1000) : undefined,
      memoryKb: data.memory,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function runJudge0Cases({ sourceCode, language, testCases, execution }) {
  const languageId = languageIds[language];
  if (!languageId) throw new Error("Unsupported execution language");
  const endpoint = process.env.JUDGE0_URL || "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";
  const results = [];
  for (const testCase of testCases) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), (execution.timeLimitSeconds + 5) * 1000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          source_code: sourceCode,
          language_id: languageId,
          stdin: inputFor(testCase.input),
          cpu_time_limit: execution.timeLimitSeconds,
          memory_limit: execution.memoryLimitKb,
        }),
      });
      if (!response.ok) throw new Error(`Code runner returned ${response.status}`);
      const data = await response.json();
      const actualOutput = normalise(data.stdout);
      results.push({
        caseId: testCase._id,
        passed: !data.stderr && !data.compile_output && actualOutput === normalise(testCase.expected),
        weight: testCase.weight || 1,
        runtimeMs: data.time ? Math.round(Number(data.time) * 1000) : undefined,
        memoryKb: data.memory,
        actualOutput,
      });
    } finally {
      clearTimeout(timeout);
    }
  }
  return results;
}

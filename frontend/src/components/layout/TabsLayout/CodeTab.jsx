import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play, Send, CheckCircle, VerifiedIcon, X } from "lucide-react";
import { apiFetch } from "@/utils/api";
import { useNavigate } from "react-router-dom";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../../ui/resizable";

function CodeTab({ algo }) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [testResults, setTestResults] = useState([]);

  // 📦 Fetch Python template
  //   useEffect(() => {
  //     const fetchTemplate = async () => {
  //       try {
  //         const res = await apiFetch(`algorithms/${algo.slug}/template`);
  //         const data = await res.json();

  //         setCode(data.template || "# Write your Python solution here\n");
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };

  //     fetchTemplate();
  //   }, [algo.slug]);



  useEffect(() => {
    // console.log("curr algoL:", algo)
    const saved = localStorage.getItem(`${algo.slug}`);
    if (saved) setCode(saved);
  }, [algo.slug]);


  const handleCodeChange = (value) => {
    console.log("typing code: ", value)
    setCode(value);
    localStorage.setItem(`${algo.slug}`, value);
  };

  const handleRun = async () => {
    setLoading(true);
    setResults(null);
    try {
      const res = await apiFetch("execute/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language: "python",
          algoId: algo.slug,

        }),
      });

      const data = await res.json();
      console.log("Run results:", data);

      if (data.results) {
        setTestResults(data.results);
        setResults(data.results);
      }

    } catch (err) {
      console.error(err);
      setResults([{ passed: false, error: err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // const runRes = await apiFetch("progress/execute/run", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     code,
      //     language: "python",
      //     algoId: algo.slug,
      //     testCases: algo.testCases,
      //   }),
      // });

      // const runData = await runRes.json();
      // setResults(runData.results);

      // const allPassed = runData.results?.every(r => r.passed);

      // if (!allPassed) {
      //   alert("Fix failing tests before submitting.");
      //   setLoading(false);
      //   return;
      // }

      const res = await apiFetch("progress/complete", {
        method: "POST",
        body: JSON.stringify({
          algorithmSlug: algo.slug
        })
      });

      const data = await res.json();

      if (!data.success) {
        alert("Failed to save progress");
        return;
      }

      setSubmitted(true);
      setResults([
        { passed: true, message: " All tests passed! Algorithm completed." }
      ]);

      // const unlockRes = await apiFetch("progress/unlock-next")
      // const unlockData = await unlockRes.json();
      // console.log("unlock next response: ", unlockData)

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      console.error(err);
      alert("Error submitting code");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" h-[80vh] border border-white/10 rounded-xl overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        {/* LEFT PANEL */}
        <ResizablePanel defaultSize={30} minSize={20}>
          <div className="h-full p-4 bg-white/5 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">{algo.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{algo.theory?.description}</p>

            {/* Examples */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase text-gray-500">Examples</h3>
              {(algo.examples || []).map((ex, i) => (
                <div key={i} className="bg-black/50 p-3 rounded-lg text-xs font-mono">
                  <div>Input: {JSON.stringify(ex.input)}</div>
                  <div>Output: {JSON.stringify(ex.output)}</div>
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* RIGHT PANEL */}
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            {/* EDITOR */}
            <ResizablePanel defaultSize={70}>
              <Editor
                height="100%"
                theme="vs-dark"
                language="python"
                value={code}
                onChange={handleCodeChange}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  padding: { top: 10 },
                }}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* OUTPUT */}
            <ResizablePanel defaultSize={30}>
              <div className="h-full flex flex-col bg-black/70 border-t border-white/10">
                <div className="flex gap-2 p-3 border-b border-white/10">
                  <Button
                    onClick={handleRun}
                    disabled={loading}
                    className="bg-white/10 hover:bg-white/20"
                  >
                    <Play size={16} /> Run
                  </Button>

                  <Button
                    onClick={handleSubmit}
                    disabled={loading || submitted}
                    className={`${submitted
                      ? "bg-green-500/20 text-green-300 border-green-400/30"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500/30"
                      }`}
                  >
                    {submitted ? (
                      <>
                        <CheckCircle size={16} /> Completed!
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Submit
                      </>
                    )}
                  </Button>
                </div>

                {/* RESULTS */}
                <div className="flex-1 overflow-y-auto p-3 text-sm font-mono">
                  {!results && (
                    <p className="text-gray-500">
                      Run your code to see results...
                    </p>
                  )}

                  {results && (
                    <div className="space-y-2">
                      {results.map((r, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded ${r.passed ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            {r.passed ? <VerifiedIcon /> : <X />}
                            <span className="font-semibold">
                              Test {i + 1}: {r.passed ? "Passed" : "Failed"}
                            </span>
                          </div>

                          {!r.passed && r.expected && (
                            <div className="text-xs mt-1 space-y-1 pl-5">
                              <div>Expected: {JSON.stringify(r.expected)}</div>
                              <div>Got: {JSON.stringify(r.output)}</div>
                            </div>
                          )}

                          {r.error && (
                            <div className="text-xs mt-1 text-red-300 pl-5">
                              Error: {r.error}
                            </div>
                          )}

                          {r.message && (
                            <div className="text-xs mt-1 text-emerald-300 pl-5">
                              {r.message}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Summary */}
                      {results.length > 0 && (
                        <div className="mt-3 p-2 bg-white/5 rounded">
                          <div className="text-xs text-gray-400">
                            Summary: {results.filter(r => r.passed).length}/{results.length} tests passed
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default CodeTab;
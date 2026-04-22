import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronLeft, ArrowRight, Sparkles } from "lucide-react";
import InfoTab from "./TabsLayout/InfoTab";
import VisualTab from "./TabsLayout/VisualTab";
import VisualiztionTab from "./TabsLayout/VisualizationTab";
import CodeTab from "./TabsLayout/CodeTab";
import Tabs from "./TabsLayout/Tabs";
import { motion } from "motion/react";
import { apiFetch } from "@/utils/api";

function AlgoWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [algo, setAlgo] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  const tabOrder = ["info", "flow", "visual", "code"];
  const index = tabOrder.indexOf(activeTab);
  const isLastTab = index === tabOrder.length - 1;

  const handleBack = () => {
    if (index > 0) {
      setActiveTab(tabOrder[index - 1]);
    } else {
      navigate("/");
    }
  };

  const handleNext = () => {
    if (index < tabOrder.length - 1) {
      setActiveTab(tabOrder[index + 1]);
    }
  };

  useEffect(() => {
    const fetchAlgo = async () => {
      try {
        const res = await apiFetch(`algorithms/${id}`);
        const data = await res.json();
        setAlgo(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlgo();
  }, [id]);

  if (!algo) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400 animate-pulse">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 md:px-8 py-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <Button
            onClick={handleBack}
            className="rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            <ChevronLeft />
          </Button>

          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold">
              {algo.title}
            </h1>
            <p className="text-sm text-gray-400">
              Learn step by step
            </p>
          </div>
        </div>

        {/* <Sparkles className="text-emerald-400 hidden md:block" /> */}

      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl">

        <div className="mb-4 border-b border-white/10 pb-2">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="min-h-100">

          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <InfoTab algo={algo} />
            </motion.div>
          )}

          {activeTab === "flow" && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <VisualTab algo={algo} />
            </motion.div>
          )}

          {activeTab === "visual" && (
            <motion.div
              key="visual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <VisualiztionTab algo={algo} />
            </motion.div>
          )}

          {activeTab === "code" && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CodeTab algo={algo} />
            </motion.div>
          )}

        </div>

      </div>

      <div className="flex justify-between items-center">

        <Button
          onClick={handleBack}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
        >
          <ChevronLeft size={16} />
          Back
        </Button>

        <div className="text-sm text-gray-400">
          Step {index + 1} of {tabOrder.length}
        </div>

        <Button
          onClick={handleNext}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl font-medium
            ${isLastTab
              ? "bg-green-500/20 text-green-300 border border-green-400/30"
              : "bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90"}
          `}
        >
          {isLastTab ? "Finish" : "Next"}
          {!isLastTab && <ArrowRight size={16} />}
        </Button>

      </div>

    </div>
  );
}

export default AlgoWorkspace;
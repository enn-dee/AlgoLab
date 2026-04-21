import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronLeft, Lock, Check } from "lucide-react";
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
  // const [markAsRead, setMarkAsRead] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);

  const [progress, setProgress] = useState(null);

  // useEffect(() => {
  //     const fetchProgress = async () => {
  //         const res = await apiFetch(
  //             `progress/${id}`,
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${localStorage.getItem("token")}`
  //                 }
  //             }
  //         );

  //         const data = await res.json();
  //         setProgress(data.progress);
  //     };

  //     if (id) fetchProgress();
  // }, [id]);

  const isUnlocked = (sectionId) => {
    const index = algo.sections.findIndex((s) => s.id === sectionId);

    if (index === 0) return true;

    return completedSections.includes(algo.sections[index - 1].id);
  };

  // useEffect(() => {
  //     const saved = localStorage.getItem(`algo-${id}-read`);
  //     if (saved === "true") setMarkAsRead(true);
  // }, [id]);

  useEffect(() => {
    if (algo?.sections?.length) {
      setCurrentSection(algo.currentSection || algo.sections[0].id);
    }
  }, [algo]);

  useEffect(() => {
    const fetchAlgo = async () => {
      try {
        const res = await apiFetch(`algorithms/${id}`);
        const data = await res.json();
        // console.log("ress-----", data)
        setAlgo(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlgo();
  }, [id]);

  if (!algo) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={() => navigate("/")} className="w-max">
        <ChevronLeft />
      </Button>

      {/* <SectionsBar
                sections={algo.sections}
                progress={progress}
                onSelect={setCurrentSection}
            /> */}
      {/* ============ */}

      {/* 
            <div className="flex gap-3 flex-wrap mb-4">
                {algo.sections.map((sec) => {
                    const unlocked = isUnlocked(sec.id);
                    const active = currentSection === sec.id;

                    return (
                        <button
                            key={sec.id}
                            disabled={!unlocked}
                            onClick={() => setCurrentSection(sec.id)}
                            className={`px-4 py-2 rounded-lg border
          ${active ? "bg-blue-500 text-white" : ""}
          ${!unlocked ? "opacity-40 cursor-not-allowed" : ""}
        `}
                        >
                            {sec.title} {!unlocked && "🔒"}
                        </button>
                    );
                })}
            </div> */}

      {/* =========== */}

      <div className="bg-[var(--bg-primary)] p-4 rounded-md">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          // markAsRead={markAsRead}
        />

        <div className="mt-4">
          {activeTab === "info" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <InfoTab
                algo={algo}
                // setMarkAsRead={setMarkAsRead}
                // markAsRead={markAsRead}
              />
            </motion.div>
          )}

          {activeTab === "flow" && <VisualTab algo={algo} />}

          {activeTab === "visual" && <VisualiztionTab algo={algo} />}

          {activeTab === "code" && <CodeTab algo={algo} />}
        </div>
      </div>
    </div>
  );
}

// function SectionsBar({ sections, progress, onSelect }) {
//     if (!sections) return null;

//     const completed = progress?.completedSections || [];

//     return (
//         <div className="flex gap-4 flex-wrap">
//             {sections.map((sec, index) => {
//                 const isCompleted = completed.includes(sec.id);

//                 const isUnlocked =
//                     index === 0 ||
//                     completed.includes(sections[index - 1]?.id);

//                 return (
//                     <div
//                         key={sec.id}
//                         onClick={() => {
//                             if (!isUnlocked) return;
//                             onSelect(sec.id);
//                         }}
//                         className={`px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2
//                             ${isUnlocked
//                                 ? "bg-blue-500/20 hover:bg-blue-500/30"
//                                 : "bg-gray-700 opacity-50 cursor-not-allowed"}
//                         `}
//                     >
//                         {isCompleted && <Check color="green" />}
//                         {!isUnlocked && !isCompleted && <Lock />}

//                         <span>{sec.title}</span>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

export default AlgoWorkspace;

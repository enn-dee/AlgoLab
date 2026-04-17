// import ReactFlow, { ReactFlowProvider } from "reactflow";
// import { useMemo } from "react";
// import "reactflow/dist/style.css";

// export default function Flowchart({ flowchart, activeNode }) {
//   return (
//     <div style={{ width: 500, height: 600 }}>
//       <ReactFlowProvider>
//         <FlowInner flowchart={flowchart} activeNode={activeNode} />
//       </ReactFlowProvider>
//     </div>
//   );
// }

// function FlowInner({ flowchart, activeNode }) {

//   const getPosition = (id) => {
//     const map = {
//       start: { x: 150, y: 0 },
//       init: { x: 150, y: 100 },
//       check: { x: 150, y: 200 },

//       increment: { x: 0, y: 320 },
//       found: { x: 300, y: 320 },

//       limit: { x: 150, y: 420 },
//       notfound: { x: 300, y: 540 },
//     };

//     return map[id] || { x: 0, y: 0 };
//   };

//   const nodes = useMemo(() => {
//     return flowchart.nodes.map((node) => ({
//       id: node.id,
//       data: { label: node.text },
//       position: getPosition(node.id),
//       style: {
//         background:
//           node.id === activeNode
//             ? "orange"
//             : node.type === "start"
//               ? "#22c55e"
//               : node.type === "end"
//                 ? "#ef4444"
//                 : node.type === "decision"
//                   ? "#f59e0b"
//                   : "#1f2937",
//         color: "white",
//         padding: 10,
//         borderRadius: 8,
//       },
//     }));
//   }, [flowchart, activeNode]);

//   const edges = useMemo(() => {
//     return flowchart.edges.map((edge, i) => ({
//       id: "e" + i,
//       source: edge.from,
//       target: edge.to,
//       label: edge.label || "",
//       animated: true,
//     }));
//   }, [flowchart]);

//   return <ReactFlow nodes={nodes} edges={edges} zoomOnScroll={false}
//     zoomOnPinch={false}
//     zoomOnDoubleClick={false}
//     panOnDrag={false}
//     panOnScroll={false}
//     nodesDraggable={false}
//     elementsSelectable={false}
//     fitView />;
// }

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

export default function Flowchart({ flowchart, activeNode }) {
  const ref = useRef(null);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      securityLevel: "loose",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
      },
    });

    const renderChart = async () => {
      if (!ref.current) return;

      setIsLoading(true);
      setHasError(false);

      try {
        ref.current.innerHTML = "";
        
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        let modifiedFlowchart = flowchart;
        if (activeNode) {
          modifiedFlowchart = flowchart.replace(
            new RegExp(`${activeNode}(\\[|\\{|\\()`, 'g'),
            `${activeNode}:::active $1`
          );
          
          modifiedFlowchart = modifiedFlowchart + `\nclassDef active fill:#f59e0b,stroke:#fff,stroke-width:3px,color:#fff;`;
        }

        const { svg } = await mermaid.render(id, modifiedFlowchart);
        ref.current.innerHTML = svg;
        
        const svgElement = ref.current.querySelector('svg');
        if (svgElement) {
          svgElement.style.maxWidth = '100%';
          svgElement.style.height = '540px';
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Mermaid render error:", err);
        setHasError(true);
        setIsLoading(false);
      }
    };

    renderChart();
  }, [flowchart, activeNode, key]);

  const handleRetry = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="relative" style={{ minHeight: '540px', minWidth: '500px' }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading diagram...</div>
        </div>
      )}
      
      <div ref={ref} className="mermaid-container" />
      
      {hasError && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <p className="text-red-400">Error rendering diagram</p>
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
import ReactFlow, { ReactFlowProvider } from "reactflow";
import { useMemo } from "react";
import "reactflow/dist/style.css";

export default function Flowchart({ flowchart, activeNode }) {
  return (
    <div style={{ width: 500, height: 600 }}>
      <ReactFlowProvider>
        <FlowInner flowchart={flowchart} activeNode={activeNode} />
      </ReactFlowProvider>
    </div>
  );
}

function FlowInner({ flowchart, activeNode }) {

  const getPosition = (id) => {
    const map = {
      start: { x: 150, y: 0 },
      init: { x: 150, y: 100 },
      check: { x: 150, y: 200 },

      increment: { x: 0, y: 320 },
      found: { x: 300, y: 320 },

      limit: { x: 150, y: 420 },
      notfound: { x: 300, y: 540 },
    };

    return map[id] || { x: 0, y: 0 };
  };

  const nodes = useMemo(() => {
    return flowchart.nodes.map((node) => ({
      id: node.id,
      data: { label: node.text },
      position: getPosition(node.id),
      style: {
        background:
          node.id === activeNode
            ? "orange"
            : node.type === "start"
            ? "#22c55e"
            : node.type === "end"
            ? "#ef4444"
            : node.type === "decision"
            ? "#f59e0b"
            : "#1f2937",
        color: "white",
        padding: 10,
        borderRadius: 8,
      },
    }));
  }, [flowchart, activeNode]);

  const edges = useMemo(() => {
    return flowchart.edges.map((edge, i) => ({
      id: "e" + i,
      source: edge.from,
      target: edge.to,
      label: edge.label || "",
      animated: true,
    }));
  }, [flowchart]);

  return <ReactFlow nodes={nodes} edges={edges} fitView />;
}
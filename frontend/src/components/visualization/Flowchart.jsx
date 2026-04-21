import React, { useMemo } from "react";
import "@xyflow/react/dist/style.css";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import { nodeTypes } from "@/components/ui/NodeTypes";

// ---------------- DAGRE SETUP ----------------
const nodeWidth = 180;
const nodeHeight = 70;

function getLayoutedElements(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const pos = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: pos.x - nodeWidth / 2,
          y: pos.y - nodeHeight / 2,
        },
        sourcePosition: "bottom",
        targetPosition: "top",
      };
    }),
    edges,
  };
}

// ---------------- COMPONENT ----------------
function VisualTab({ algo }) {
  // ✅ Extract from JSON
  const rawNodes = algo?.flowChartData?.rawNodes || [];
  const rawEdges = algo?.flowChartData?.rawEdges || [];
  
  // ✅ Style edges properly
  const styledEdges = useMemo(() => {
    return rawEdges.map((edge) => ({
      ...edge,
      type: "smoothstep",
      animated: true,
      labelStyle: { fontWeight: "bold", fill: "#000" },
      style: { strokeWidth: 2 },
      markerEnd: {
        type: "arrowclosed",
        color: "#fff",
      },
    }));
  }, [rawEdges]);

  // ✅ Apply dagre layout
  const { nodes, edges } = useMemo(() => {
    return getLayoutedElements(rawNodes, styledEdges);
  }, [rawNodes, styledEdges]);

  return (
    <div>
      <h2 className="font-bold mb-2">{algo.title} Flow Chart</h2>

      <div className="w-full h-[85vh] text-black">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          zoomOnScroll={false}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          panOnDrag={true}
          nodesDraggable={false}
          elementsSelectable={false}
        >
          <Background gap={30}/>
          <Controls
            className="p-4"
            fitViewOptions={true}
            showZoom={false}
            showInteractive={false}
          />
        </ReactFlow>
      </div>
    </div>
  );
}

export default VisualTab;

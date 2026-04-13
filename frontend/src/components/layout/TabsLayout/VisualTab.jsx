import React, { useCallback, useState } from "react";
import "@xyflow/react/dist/style.css";
import { ReactFlow, Background, Controls } from "@xyflow/react";

const initialNodes = [
  {
    id: "start",
    position: { x: 300, y: 0 },
    data: { label: "Start" },
    type: "input",
  },

  {
    id: "input",
    position: { x: 300, y: 80 },
    data: { label: "Input A, n, key" },
  },

  { id: "init", position: { x: 300, y: 160 }, data: { label: "i = 0" } },

  {
    id: "check_i",
    position: { x: 300, y: 240 },
    data: { label: "i < n ?" },
    type: "decision",
  },

  {
    id: "compare",
    position: { x: 300, y: 340 },
    data: { label: "A[i] == key ?" },
    type: "decision",
  },

  {
    id: "found",
    position: { x: 540, y: 340 },
    data: { label: "Found at index i" },
  },

  {
    id: "increment",
    position: { x: 100, y: 340 },
    data: { label: "i = i + 1" },
  },

  {
    id: "not_found",
    position: { x: 300, y: 460 },
    data: { label: "Not Found" },
  },

  {
    id: "end",
    position: { x: 300, y: 540 },
    data: { label: "End" },
    type: "output",
  },
];

const initialEdges = [
  { id: "e1", source: "start", target: "input", type: "straight" },
  { id: "e2", source: "input", target: "init", type: "straight" },
  { id: "e3", source: "init", target: "check_i", type: "straight" },

  // Decision: i < n
  {
    id: "e4",
    source: "check_i",
    target: "compare",
    label: "Yes",
    type: "straight",
  },
  {
    id: "e5",
    source: "check_i",
    target: "not_found",
    label: "No",
    type: "straight",
  },

  // Decision: A[i] == key
  {
    id: "e6",
    source: "compare",
    target: "found",
    label: "Yes",
    type: "straight",
  },
  {
    id: "e7",
    source: "compare",
    target: "increment",
    label: "No",
    type: "straight",
  },

  // Loop back
  { id: "e8", source: "increment", target: "check_i", type: "straight" },

  // End paths
  { id: "e9", source: "found", target: "end", type: "straight" },
  { id: "e10", source: "not_found", target: "end", type: "straight" },
];

function VisualTab({ algo }) {
  return (
    <div className="">
      <h2 className="font-bold">Flow Visualization</h2>
      <div className="w-full h-[85vh] overflow-hidden">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          nodesDraggable={false}
          elementsSelectable={false}
          fitView
          className="text-black font-bold -z-10"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default VisualTab;

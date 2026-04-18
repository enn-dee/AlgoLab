import { Handle, Position } from "@xyflow/react";
import { Bold } from "lucide-react";

// OvalShape (Start and End)
const TerminalNode = ({ data }) => (
  <div
    style={{
      padding: "10px 24px",
      borderRadius: 999,
      textAlign: "center",
      fontSize: 13,
      fontWeight: 600,
      background: data.background,
      border: `2px solid ${data.borderColor}`,
    }}
  >
    <Handle type="target" position={Position.Top} />
    {data.label}
    <Handle type="source" position={Position.Bottom} />
  </div>
);

// Rectangle (Process, assignments, calculations)
const ProcessNode = ({ data }) => (
  <div
    style={{
      padding: "10px 16px",
      textAlign: "center",
      fontSize: 13,
      background: data.background,
      border: `2px solid ${data.borderColor}`,
    }}
  >
    <Handle type="target" position={Position.Top} />
    {data.label}
    <Handle type="source" position={Position.Bottom} />
  </div>
);

// Diamond (Decision)
const DecisionNode = ({ data }) => (
  <div
    style={{
      position: "relative",
      width: 200,
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: data.background,
        border: `2px solid ${data.borderColor}`,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      }}
    />
    <span
      style={{
        position: "relative",
        zIndex: 1,
        fontSize: 12,
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      {data.label}
    </span>
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} id="bottom" />
    <Handle type="source" position={Position.Left} id="left" />
    <Handle type="source" position={Position.Right} id="right" />
  </div>
);

// Parallelogram → Input / Output / Found / Not Found
const IoNode = ({ data }) => (
  <div
    style={{
      padding: "10px 28px",
      textAlign: "center",
      fontSize: 13,
      background: data.background,
      border: `2px solid ${data.borderColor}`,
      clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
    }}
  >
    <Handle type="target" position={Position.Top} />
    {data.label}
    <Handle type="source" position={Position.Bottom} />
  </div>
);

// Rectangle with double vertical lines → Predefined process (recursive calls)
const CallNode = ({ data }) => (
  <div
    style={{
      position: "relative",
      padding: "10px 24px",
      textAlign: "center",
      fontSize: 13,
      background: data.background,
      border: `2px solid ${data.borderColor}`,
    }}
  >
    <Handle type="target" position={Position.Top} />
    {data.label}
    <Handle type="source" position={Position.Bottom} />
  </div>
);

export const nodeTypes = {
  terminalNode: TerminalNode,
  processNode: ProcessNode,
  decisionNode: DecisionNode,
  ioNode: IoNode,
  callNode: CallNode,
};

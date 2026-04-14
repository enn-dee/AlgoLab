import React, { useState } from "react";
import ArrayRenderer from "./ArrayRenderer";
import Flowchart from "./Flowchart";
import { Button } from "../ui/button";

export default function AlgorithmVisualizer({ algo }) {
  const { animationSteps, input, flowchart } = algo;

  const [activeIndices, setActiveIndices] = useState([]);
  const [activeNode, setActiveNode] = useState(null);
  const [found, setFound] = useState(false);
  const [running, setRunning] = useState(false);

  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);

  const reset = () => {
    setActiveIndices([]);
    setActiveNode(null);
    setFound(false);
    setLow(null);
    setHigh(null);
  };

  const run = async () => {
    if (running) return;

    reset();
    setRunning(true);

    for (let step of animationSteps) {

      if (step.flowNode) {
        setActiveNode(step.flowNode);
      }

      //generic handling
      switch (step.type) {

        case "setIndex":
        case "compare":
          setActiveIndices(
            step.indices || (step.index !== undefined ? [step.index] : [])
          );
          break;

        case "calculateMid":
          setActiveIndices([step.mid]);
          break;

        case "setBounds":
          setLow(step.low);
          setHigh(step.high);
          break;

        case "moveRight":
          setLow(step.low);
          break;

        case "moveLeft":
          setHigh(step.high);
          break;

        case "swap":
          setActiveIndices(step.indices || []);
          break;

        case "found":
          setActiveIndices([step.index]);
          setFound(true);
          break;

        default:
          break;
      }

      await new Promise(res => setTimeout(res, 800));
    }

    setRunning(false);
  };

  return (
    <div className=" flex flex-col justify-center items-center ">

      <div className="flex flex-col md:flex-row justify-center items-center gap-10">

        <ArrayRenderer
          array={input.array}
          activeIndices={activeIndices}
          found={found}
          low={low}
          high={high}
        />

        <Flowchart
          flowchart={flowchart}
          activeNode={activeNode}
        />

      </div>
      <Button onClick={run} className={"p-6 bg-(--bg-secondary) hover:bg-(--bg-hover)"}>Start</Button>
    </div>
  );
}
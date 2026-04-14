import React, { useEffect, useState } from "react";
import AlgorithmVisualizer from "@/components/visualization/AlgorithmVisualizer";

export default function VisualTab({algo}) {


  if (!algo) return <div>Loading...</div>;

  return <AlgorithmVisualizer algo={algo} />;
}
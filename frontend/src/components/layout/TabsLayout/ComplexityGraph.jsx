import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// 🔥 Generate merged dataset (important fix)
const generateMultiData = (complexity) => {
  const nValues = [1, 5, 10, 20, 50, 100];

  const calc = (type, n) => {
    switch (type) {
      case "O(1)": return 1;
      case "O(log n)": return Math.log2(n);
      case "O(n)": return n;
      case "O(n log n)": return n * Math.log2(n);
      case "O(n^2)": return n * n;
      case "O(2^n)": return Math.pow(2, n / 10); // scaled
      default: return n;
    }
  };

  return nValues.map((n) => ({
    n,
    best: calc(complexity.best, n),
    average: calc(complexity.average, n),
    worst: calc(complexity.worst, n)
  }));
};

const ComplexityGraph = ({ complexity }) => {
  const data = generateMultiData(complexity);

  return (
    <div className="w-full h-72 bg-black/30 rounded-xl p-4 border border-white/10">
      
      {/* TITLE */}
      <h3 className="text-sm mb-3 text-gray-300">
        Time Complexity Comparison
      </h3>

      {/* GRAPH */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          
          <XAxis 
            dataKey="n" 
            stroke="#94a3b8"
          />

          <YAxis 
            stroke="#94a3b8"
          />

          <Tooltip 
            contentStyle={{ backgroundColor: "#020617", border: "1px solid #1e293b" }}
          />

          <Legend />

          {/* BEST CASE */}
          <Line
            type="monotone"
            dataKey="best"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />

          {/* AVERAGE CASE */}
          <Line
            type="monotone"
            dataKey="average"
            stroke="#eab308"
            strokeWidth={3}
            dot={false}
          />

          {/* WORST CASE */}
          <Line
            type="monotone"
            dataKey="worst"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComplexityGraph;
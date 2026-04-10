import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import { Button } from "./components/ui/button";
import { AppWindow, File } from "lucide-react";
import AlgoDashboard from "./components/layout/AlgoDashboard";
import AlgoWorkspace from "./components/layout/AlgoWorkspace";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

export default function App() {
  const [showMenu, setShowMenu] = useState(true)
  const [selectedAlgo, setSelectedAlgo] = useState(null);


//   return(
//     <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
//   <Navbar />

//   <div className="w-full bg-[var(--bg-secondary)] flex gap-2 px-3 py-2">
//     <Button
//       onClick={() => {
//         setShowMenu(true)
//         setSelectedAlgo(null)
//       }}
//       className={showMenu ? "border-b-4 border-amber-50/80" : ""}
//     >
//       Algorithms
//     </Button>

//     <Button
//       onClick={() => {
//         setShowMenu(false)
//         setSelectedAlgo(null)
//       }}
//       className={!showMenu ? "border-b-4 border-amber-50/80" : ""}
//     >
//       My Submissions
//     </Button>
//   </div>

//   <div className="flex-1 p-6 bg-[var(--bg-tertiary)]">
//     {
//       showMenu ? (
//         selectedAlgo ? (
//           <AlgoWorkspace
//             algo={selectedAlgo}
//             setSelectedAlgo={setSelectedAlgo}
//           />
//         ) : (
//           <AlgoDashboard setSelectedAlgo={setSelectedAlgo} />
//         )
//       ) : (
//         <div>My Submissions</div>
//       )
//     }
//   </div>
// </div>
//   )


  const navigate = useNavigate();
  const location = useLocation();

  const isAlgoPage = location.pathname.startsWith("/algo");
  const isHome = location.pathname === "/";
  const isSubmissions = location.pathname === "/submissions";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      
      <Navbar />

      {/* Top Tabs */}
      <div className="w-full bg-[var(--bg-secondary)] flex gap-2 px-3 py-2">

        <Button
          onClick={() => navigate("/")}
          className={isHome ? "border-b-4 border-amber-50/80" : ""}
        >
          <AppWindow /> Algorithms
        </Button>

        <Button
          onClick={() => navigate("/submissions")}
          className={isSubmissions ? "border-b-4 border-amber-50/80" : ""}
        >
          <File /> My Submissions
        </Button>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[var(--bg-tertiary)]">
        <Routes>
          <Route path="/" element={<AlgoDashboard />} />
          <Route path="/algo/:id" element={<AlgoWorkspace />} />
          <Route path="/submissions" element={<div>My Submissions</div>} />
        </Routes>
      </div>

    </div>
  );
}


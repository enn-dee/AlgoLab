import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Button } from "./components/ui/button";
import { AppWindow, File } from "lucide-react";
import AlgoDashboard from "./components/layout/AlgoDashboard";
import AlgoWorkspace from "./components/layout/AlgoWorkspace";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import { useEffect } from "react";
import Register from "./pages/Register";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isSubmissions = location.pathname === "/submissions";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/register");
  }, [])
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AlgoDashboard />} />
            <Route path="/algo/:id" element={<AlgoWorkspace />} />
            <Route path="/submissions" element={<div>My Submissions</div>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
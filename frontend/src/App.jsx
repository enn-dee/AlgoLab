import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AlgoDashboard from "./components/layout/AlgoDashboard";
import AlgoWorkspace from "./components/layout/AlgoWorkspace";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { AppWindow, File, Shield, Sparkles } from "lucide-react";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    if (!role) return;
    if (role === "admin" && location.pathname === "/") {
      navigate("/admin");
    }
  }, [role, location.pathname]);

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen flex flex-col bg-linear-to-br from-black via-zinc-900 to-zinc-950 text-white">

        {/* NAVBAR */}
        <Navbar />

        {/* TABS */}
        <div className="sticky top-0 z-40 backdrop-blur-md bg-white/5 border-b border-white/10">
          {role === "student" && <StudentTabs />}
          {role === "admin" && <AdminTabs />}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-4 md:px-8 py-6">

          <div className="max-w-full  mx-auto bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl backdrop-blur-md">

            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student */}
              <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
                <Route path="/" element={<AlgoDashboard />} />
                <Route path="/algo/:id" element={<AlgoWorkspace />} />
                <Route path="/submissions" element={<div className="p-4 text-gray-300">My Submissions</div>} />
              </Route>

              {/* Admin */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/teacher" element={<div>Teacher Route</div>} />
              </Route>
            </Routes>

          </div>
        </div>
      </div>
    </>
  );
}






/* =========================
   STUDENT TABS 
========================= */
function StudentTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: "Algorithms", icon: AppWindow, path: "/" },
    { label: "Submissions", icon: File, path: "/submissions" },
  ];

  return (
    <div className="flex gap-2 px-4 py-3">

      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        const Icon = tab.icon;

        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${active
                ? "bg-linear-to-r from-emerald-500 to-green-600 text-white shadow-md"
                : "text-gray-400 hover:text-white hover:bg-white/10"}
            `}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}

    </div>
  );
}





/* =========================
   ADMIN TABS : ---- todo : (separate workflow)
========================= */
function AdminTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname === "/admin";

  return (
    <div className="flex gap-2 px-4 py-3">

      <button
        onClick={() => navigate("/admin")}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
          ${active
            ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md"
            : "text-gray-400 hover:text-white hover:bg-white/10"}
        `}
      >
        <Shield size={16} />
        Admin Dashboard
      </button>

    </div>
  );
}





/* =========================
  ADMIN PAGE UI
========================= */
function AdminDashboard() {
  return (
    <div className="flex flex-col gap-4">

      <div className="flex items-center gap-2 text-xl font-semibold">
        <Sparkles className="text-purple-400" size={18} />
        Admin Panel
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          Manage Algorithms
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          Manage Users
        </div>

      </div>
    </div>
  );
}
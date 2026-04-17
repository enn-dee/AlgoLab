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
import { AppWindow, File } from "lucide-react";
// import StudentTabs from "./components/layout/StudentTabs";
// import AdminTabs from "./components/layout/AdminTabs";

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

      <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Navbar />

        {/* Tabs */}
        {role === "student" && <StudentTabs />}
        {role === "admin" && <AdminTabs />}
        <div>


          
        </div>
        {/* Routes */}
        <div className="flex-1 p-6 bg-[var(--bg-tertiary)]">
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route path="/" element={<AlgoDashboard />} />
              <Route path="/algo/:id" element={<AlgoWorkspace />} />
              <Route path="/submissions" element={<div>My Submissions</div>} />
            </Route>

            {/* Admin */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<div>Admin Dashboard</div>} />
              <Route path="/teacher" element={<div>Teacher Route</div>} />
            </Route>
          </Routes>
        </div>
      </div >
    </>
  );
}


function StudentTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const isSubmissions = location.pathname === "/submissions";

  return (
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
  );
}



function AdminTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname === "/admin";

  return (
    <div className="w-full bg-[var(--bg-secondary)] flex gap-2 px-3 py-2">
      <Button
        onClick={() => navigate("/admin")}
        className={isAdmin ? "border-b-4 border-amber-50/80" : ""}
      >
        Admin Dashboard
      </Button>
    </div>
  );
}
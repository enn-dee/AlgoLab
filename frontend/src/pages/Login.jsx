import { apiFetch } from "@/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { Eye, EyeOff, User, Lock, Sparkles } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await apiFetch("auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      toast.success("Welcome back 👋");
      window.location.href = "/";

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
    from-black via-zinc-900 to-zinc-950 text-white">

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

          <div className="flex flex-col items-center gap-2 mb-6">
            <Sparkles className="text-emerald-400" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-400">
              Login to continue your journey 
            </p>
          </div>

          {/* FORM */}
          <div className="flex flex-col gap-4">

            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                className="w-full pl-10 pr-3 py-2 rounded-xl
                  bg-black/30 border border-white/10
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                  placeholder:text-gray-500"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 rounded-xl
                  bg-black/30 border border-white/10
                  focus:outline-none focus:ring-2 focus:ring-emerald-500
                  placeholder:text-gray-500"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className={`
                mt-2 py-2 rounded-xl font-medium transition-all
                ${loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 shadow-md"}
              `}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <p className="text-sm text-center text-gray-400 mt-2">
              Don’t have an account?{" "}
              <span
                className="text-emerald-400 cursor-pointer hover:underline"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </span>
            </p>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
import { apiFetch } from "@/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        setError("");

        if (!username || !password) {
            return setError("All fields are required");
        }

        if (password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);

        try {

            const res = await apiFetch("auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, role, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Registration failed");
            }

            toast.success("Registered.")
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            // redirect
            window.location.href = "/";
        } catch (err) {
            toast.error(err.message)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-(--bg-primary) shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h2>


                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium">Username</label>
                        <input
                            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="absolute right-3 top-2 cursor-pointer text-sm text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div >
                        <select
                            className="bg-(--bg-primary)"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select role</option>
                            <option value="student">Student</option>
                            <option value="admin">Teacher</option>
                        </select>
                    </div>
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className={`p-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>

                    <p className="text-sm text-center">
                        Already have an account?{" "}
                        <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
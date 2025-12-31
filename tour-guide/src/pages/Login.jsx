import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData);
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      setError(
        error.response?.data?.detail || 
        "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#052E16] via-[#064E3B] to-[#022C22] flex items-center justify-center px-4 text-white">

      <div className="w-full max-w-md bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center">Welcome Back</h2>
        <p className="text-center text-white/70 mt-2">Sign in to continue</p>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* google */}
        <button className="mt-6 w-full flex justify-center items-center gap-3 bg-white text-black py-3 rounded-lg hover:bg-gray-100 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
          Sign in with Google
        </button>

        <div className="my-6 text-center text-white/50 text-sm">or</div>

        <form onSubmit={handleSubmit}>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full mb-4 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-green-500 transition"
            placeholder="Email"
            required
          />
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full mb-6 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-green-500 transition"
            placeholder="Password"
            required
          />

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-black py-3 rounded-lg transition"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-white/70 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:text-green-300 transition">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
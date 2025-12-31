import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear errors when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword: _confirmPassword, ...signupData } = formData;
      await signup(signupData);
      setSuccess("Account created successfully! Redirecting to home...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.detail || 
        "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#052E16] via-[#064E3B] to-[#022C22] flex items-center justify-center px-4 text-white">

      <div className="w-full max-w-md bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center">Create Account</h2>
        <p className="text-center text-white/70 mt-2">Start your Kerala journey</p>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200 text-sm">
            {success}
          </div>
        )}

        {/* google */}
        <button className="mt-6 w-full flex justify-center items-center gap-3 bg-white text-black py-3 rounded-lg hover:bg-gray-100 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" />
          Sign up with Google
        </button>

        <div className="my-6 text-center text-white/50 text-sm">or</div>

        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full mb-4 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-green-500 transition"
            placeholder="Full Name"
            required
          />
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
            className="w-full mb-2 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-green-500 transition"
            placeholder="Password"
            required
          />
          
          {formData.password && (
            <div className={`mb-4 text-sm ${
              formData.password.length >= 6 ? 'text-green-400' : 'text-red-400'
            }`}>
              {formData.password.length >= 6 
                ? '✓ Password length is good' 
                : '✗ Password must be at least 6 characters'}
            </div>
          )}
          <input 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full mb-2 bg-white/5 border rounded-lg px-4 py-3 text-white placeholder:text-white/40 outline-none transition ${
              formData.confirmPassword && formData.password
                ? formData.password === formData.confirmPassword
                  ? 'border-green-500/50 focus:border-green-500'
                  : 'border-red-500/50 focus:border-red-500'
                : 'border-white/20 focus:border-green-500'
            }`}
            placeholder="Confirm Password"
            required
          />
          
          {formData.confirmPassword && formData.password && (
            <div className={`mb-4 text-sm ${
              formData.password === formData.confirmPassword 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}>
              {formData.password === formData.confirmPassword 
                ? '✓ Passwords match' 
                : '✗ Passwords do not match'}
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-black py-3 rounded-lg transition"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-white/70 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:text-green-300 transition">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
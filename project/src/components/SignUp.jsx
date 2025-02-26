import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-hot-toast";


const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", formData);
      toast.success("Signup successful! Redirecting to sign in...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Signup Container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8 rounded-3xl text-white">
        
        {/* Header with Logo */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold tracking-wide">TaskFlow</h2>
          <p className="text-gray-300 mt-2">Create your account and manage tasks effortlessly</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full p-3 bg-white/20 text-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-3 bg-white/20 text-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full p-3 bg-white/20 text-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Already Have an Account? */}
        <div className="text-center mt-6">
          <p className="text-gray-300">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-400 font-medium hover:underline transition-all"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

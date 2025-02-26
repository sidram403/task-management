import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";


const Signin = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      
      navigate("/");
      toast.success("Successfully signed in!");
    } catch (error) {
      toast.error(error.message || "Failed to sign in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Sign-in Container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 p-8 rounded-3xl text-white">
        
        {/* Header with Logo */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold tracking-wide">TaskFlow</h2>
          <p className="text-gray-300 mt-2">Manage your tasks like a pro</p>
        </div>


        {/* Sign-in Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full p-3 bg-white/20 text-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full p-3 bg-white/20 text-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Signup */}
        <div className="text-center mt-6">
          <p className="text-gray-300">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-400 font-medium hover:underline transition-all"
            >
              Sign up
            </button>
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default Signin;

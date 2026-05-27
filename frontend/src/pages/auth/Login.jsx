import { useState } from "react";
import api from "../../api/axios";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await api.post(
  "/auth/login",
  formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      
      const userData =
        response.data.data;

      
      setUser(userData);

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      if (response.data.token) {

        localStorage.setItem(
          "token",
          response.data.token
        );
      }

      // =========================
      // REDIRECT
      // =========================
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
  <div className="relative min-h-screen overflow-hidden bg-[#0f172a] flex items-center justify-center px-4">

    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />

    {/* Glow Effects */}
    <div className="absolute top-[-120px] left-[-80px] w-[350px] h-[350px] bg-indigo-500 opacity-20 blur-[120px] rounded-full"></div>

    <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

    {/* Grid Overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

    {/* Card */}
    <div className="relative z-10 w-full max-w-md">

      {/* Brand */}
      <div className="text-center mb-8">

        <h1 className="text-5xl font-extrabold tracking-tight text-white">

          Task
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Manager
          </span>

        </h1>

        <p className="mt-3 text-slate-400 text-lg">
          Manage your tasks smarter and faster
        </p>

      </div>

      {/* Login Container */}
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl rounded-3xl p-8 md:p-10"
      >

        <div className="mb-8 text-center">

          <h2 className="text-3xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-slate-400 mt-2">
            Login to continue
          </p>

        </div>

        {/* Email */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="
              w-full
              px-4
              py-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              transition-all
              duration-300
            "
          />

        </div>

        {/* Password */}
        <div className="mb-6">

          <div className="flex items-center justify-between mb-2">

            <label className="text-sm font-medium text-slate-300">
              Password
            </label>

          </div>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
              w-full
              px-4
              py-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
              focus:border-purple-500
              transition-all
              duration-300
            "
          />

        </div>

        {/* Remember */}
        <div className="flex items-center justify-between mb-6">

          <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">

            <input
              type="checkbox"
              className="accent-indigo-500"
            />

            Remember me

          </label>

        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            py-4
            rounded-2xl
            font-semibold
            text-lg
            text-white
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            hover:scale-[1.02]
            hover:shadow-[0_0_30px_rgba(99,102,241,0.45)]
            active:scale-[0.99]
            transition-all
            duration-300
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >

          {loading ? "Logging in..." : "Login"}

        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">

          <div className="flex-1 h-px bg-white/10"></div>

          <span className="text-slate-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-white/10"></div>

        </div>

       

        {/* Register */}
        <p className="text-center text-slate-400 mt-8">

          Don&apos;t have an account?

          <Link
            to="/register"
            className="ml-2 text-indigo-400 hover:text-indigo-300 font-semibold transition"
          >
            Create Account
          </Link>

        </p>

      </form>

    </div>

  </div>
);
};

export default Login;
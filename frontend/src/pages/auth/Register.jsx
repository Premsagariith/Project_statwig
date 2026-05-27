import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


const Register = () => {

  const navigate = useNavigate();

  const { setUser } = useAuth();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );

      setUser(response.data.data);

      navigate("/dashboard");

    } catch (error) {

  console.log(
    error.response?.data
  );

  alert(
    error.response?.data?.errors?.[0] ||
    error.response?.data?.message ||
    "Registration failed"
  );

} finally {

      setLoading(false);
    }
  };


  return (
  <div className="relative min-h-screen overflow-hidden bg-[#0f172a] flex items-center justify-center px-4">

    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"></div>

    {/* Glow Effects */}
    <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

    <div className="absolute bottom-[-120px] right-[-80px] w-[320px] h-[320px] bg-purple-500/20 blur-[120px] rounded-full"></div>

    {/* Grid Overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

    {/* Main Container */}
    <div className="relative z-10 w-full max-w-md">

      {/* Logo Section */}
      <div className="text-center mb-8">

        <h1 className="text-5xl font-extrabold tracking-tight text-white">

          Task
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Manager
          </span>

        </h1>

        <p className="mt-3 text-slate-400 text-lg">
          Create your account
        </p>

      </div>

      {/* Register Card */}
      <form
        onSubmit={handleSubmit}
        className="
          backdrop-blur-xl
          bg-white/10
          border
          border-white/10
          shadow-2xl
          rounded-3xl
          p-8
          md:p-10
        "
      >

        {/* Heading */}
        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-white">
            Register
          </h2>

          <p className="text-slate-400 mt-2">
            Start managing your tasks today
          </p>

        </div>

        {/* Name */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
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

        {/* Email */}
        <div className="mb-5">

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
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
        <div className="mb-5">

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
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

        {/* Role */}
        <div className="mb-6">

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Role
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="
              w-full
              px-4
              py-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              transition-all
              duration-300
            "
          >

            <option className="bg-slate-900" value="user">
              User
            </option>

            <option className="bg-slate-900" value="admin">
              Admin
            </option>

          </select>

        </div>

        {/* Register Button */}
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

          {
            loading
              ? "Creating Account..."
              : "Register"
          }

        </button>

        {/* Login Redirect */}
        <p className="text-center text-slate-400 mt-7">

          Already have an account?

          <Link
            to="/login"
            className="
              ml-2
              text-indigo-400
              hover:text-indigo-300
              font-semibold
              transition
            "
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  </div>
);
};

export default Register;
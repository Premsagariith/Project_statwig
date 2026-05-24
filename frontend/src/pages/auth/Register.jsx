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

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">

      {/* Background Blur Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>


      {/* Main Container */}
      <div className="w-full max-w-md z-10">

        {/* App Title */}
        <div className="text-center mb-8">

          <h1 className="text-5xl font-extrabold text-gray-800">
            Task
            <span className="text-indigo-600">
              Manager
            </span>
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Create your account
          </p>

        </div>


        {/* Register Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-gray-200"
        >

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Register
          </h2>


          {/* Name */}
          <div className="mb-5">

            <label className="block text-gray-700 mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

          </div>


          {/* Email */}
          <div className="mb-5">

            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

          </div>


          {/* Password */}
          <div className="mb-5">

            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />

          </div>


          {/* Role */}
          <div className="mb-6">

            <label className="block text-gray-700 mb-2 font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >

              <option value="user">
                User
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>


          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] hover:shadow-2xl transition duration-300"
          >

            {
              loading
                ? "Creating Account..."
                : "Register"
            }

          </button>


          {/* Login Redirect */}
          <p className="text-center mt-6 text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline ml-1"
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.BASE_URL;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    navigate("/");
  }

  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(
          `${BASE_URL}/api/v1/sign-in`,
          Data
        );
        setData({ username: "", email: "", password: "" });
        console.log(response);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-[96vh]">
      <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono">
        <h1 className="font-bold text-3xl mb-2">Sign Up</h1>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          User Name
        </label>
        <input
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          placeholder="Username..."
          type="text"
          name="username"
          value={Data.username}
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          placeholder="Email..."
          type="email"
          name="email"
          value={Data.email}
          required
          onChange={handleChange}
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          placeholder="Password"
          type="password"
          name="password"
          value={Data.password}
          required
          onChange={handleChange}
        />
        <div className="w-full flex items-center justify-between">
          <button
            onClick={handleSubmit}
            className="relative cursor-pointer px-3 py-2 mt-2 border-0 rounded-md shadow-custom-inset bg-custom-radial text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:text-opacity-100 text-opacity-66 custom-button"
          >
            Signup
          </button>
          <Link
            to="/login"
            className="text-black text-sm flex items-center hover:scale-105 transition-all duration-300"
          >
            Already have an account??
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

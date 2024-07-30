import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState({ username: "", password: "" });

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  // Redirect if the user is already logged in
  if (isLoggedIn) {
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("Please fill all the fields");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/login",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(login());
        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-[96vh]">
      <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono">
        <h1 className="font-bold text-3xl mb-2">Log In</h1>
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
          Password
        </label>
        <input
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          placeholder="Password"
          type="password"
          name="password"
          value={Data.password}
          onChange={handleChange}
          required
        />

        <div className='w-full flex items-center justify-between'>
          <button
            onClick={handleSubmit}
            className='relative cursor-pointer px-3 py-2 mt-2 border-0 rounded-md shadow-custom-inset bg-custom-radial text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:text-opacity-100 text-opacity-66 custom-button'
          >
            Login
          </button>
          <Link to="/signup" className='text-black text-sm flex items-center hover:scale-105 transition-all duration-300'>
            Not have an account??
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

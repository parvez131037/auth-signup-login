import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = input;

    try {
      const response = await axios.post("http://localhost:8000/api/login", input);

      if (email && password) {
        if (response.status === 200) {
          alert(response.data.message);
          console.log(response.data);
          cookies.set("TOKEN", response.data.token, {
            path: "/",
          });
          cookies.set("NAME", response.data.name, {
            path: "/",
          });

          navigate("/");
        }
      } else {
        alert("all fields are required");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="max-w-[800px] mx-auto mt-10 mb-6">
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              name="password"
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="•••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-white ml-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;

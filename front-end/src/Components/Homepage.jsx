import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Homepage = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const token = cookies.get("TOKEN");

  // console.log(token);
  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "http://localhost:8000/api/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
        setName(cookies.get("NAME"));
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure want to logout")) {
     
      cookies.remove("TOKEN", {
        path: "/",
      });
      cookies.remove("NAME", {
        path: "/",
      });
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center my-10">
        <h1 className="text-5xl mb-10">Hello - {name} </h1>
        <h1 className="text-5xl mb-10">{message} </h1>
        <h1 className="text-5xl mb-10">THIS IS A AUTHORIZED COMPONENT </h1>
        <button
          onClick={handleLogout}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Homepage;

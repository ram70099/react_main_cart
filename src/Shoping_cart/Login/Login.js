import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login"; // Import FacebookLogin

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [load, setLoading] = useState(false);

  const submit = async (evt) => {
    evt.preventDefault();
    const loginData = { email, password };

    try {
      setLoading(true);
      const response = await fetch("https://ram.freelogomaker.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const resData = await response.json();
      if (resData.success) {
        setLogin(true);
        localStorage.setItem("token", resData.token);
      } else {
        Swal.fire({
          title: "Login Failed",
          text: resData.message || "Invalid credentials.",
          icon: "error",
        }).then(() => {
          window.location.href = "/login";
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (response) => {
    const token = response.credential;

    try {
      const res = await axios.post(
        "https://ram.freelogomaker.in/api/google/callback",
        { token },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setLogin(true);
        localStorage.setItem("token", res.data.token);
      } else {
        Swal.fire({
          title: "Login Failed",
          text: res.data.message || "Google login failed.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  const handleFacebookResponse = async (response) => {
    const { accessToken } = response; // Get the access token from Facebook's response

    try {
        const res = await axios.post(
            "https://ram.freelogomaker.in/api/facebook/callback",
            { token: accessToken },
            {
                withCredentials: true,  // Ensure cookies are sent with the request
            }
        );

        if (res.data.success) {
            setLogin(true);
            localStorage.setItem("token", res.data.token);
        } else {
            Swal.fire({
                title: "Login Failed",
                text: res.data.message || "Facebook login failed.",
                icon: "error",
            });
        }
    } catch (error) {
        console.error("Facebook Login Error:", error);
        Swal.fire({
            title: "Login Failed",
            text: "Something went wrong. Please try again.",
            icon: "error",
        });
    }
};


  return (
    <>
      {login ? (
        <Navigate to="/" />
      ) : (
        <div className="container">
          <div className="main_div">
            <div className="title">Login Form</div>
            <form onSubmit={submit}>
              <div className="input_box">
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Enter your email"
                  required
                />
                <div className="icon">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="input_box">
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Enter your password"
                  required
                />
                <div className="icon">
                  <i className="fas fa-lock"></i>
                </div>
              </div>
              <div className="option_div">
                <div className="check_box">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </div>
                <div className="forget_div">
                  <a href="#">Forgot password?</a>
                </div>
              </div>
              <div className="input_box button">
                <input type="submit" value={load ? "Loading..." : "Login"} />
              </div>
              <div className="sign_up">
                Not a member? <a href="/register">Signup now</a>
              </div>
            </form>

          
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

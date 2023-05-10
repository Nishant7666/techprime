
// Login Page for techprime_web application

import {  useState } from "react";
import React from "react";
import "./login.css";
import loginbg from "./images/loginbg1.svg";


export default function Login()
{
  const [message, setMessage] = useState("");
  const [user, setUser] = useState
  (
    {
    email: "",
    password: "",
    }
  );
  
  const handleSubmit = (e) => 
  {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({...user,[name]: value, });
    const { email, password } = user;
    if (email && password) 
    {
      fetch("http://localhost:9002/login-user", 
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      .then((res) => res.json())
      .then((data) => 
      {
        console.log(data, "userRegister");
        if (data.status == "ok") 
        {
          setMessage("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "/Contents";
        }
        else
        {
          setMessage("User not Found try Again");
        }
      } 
      )
      .catch
      ((error) =>
      {
        console.error(error);
        alert("Failed to retrieve data. Please try again later.");
      }
      );
    }
  };
  

  return (
    <form className="container" onSubmit={handleSubmit} action="POST">
      <div style={{ backgroundImage: `url(${loginbg})`}} className="img">
        <div className="logo-bg text-center">
          <img className="logo py-5" alt="" />
          <p className=" text-light ">Online Project Management</p>
        </div>
        <div className="form-group col-4 card-body container">
          <div className="card-body ">
            <p className=" mb-5 text-center">Login to get Started</p>
            <div className="form-dark mb-4">
              <label className="form-label" htmlFor="typeEmailX">
                Email
              </label>
              <input
                required
                name="email"
                value={user.email}
                type="email"
                onChange={handleSubmit}
                className="form-control form-control-lg"
              />
            </div>
            <div className="form-outline form-white mb-4">
              <label className="form-label" htmlFor="typePasswordX">
                Password
              </label>
              <input
                required
                name="password"
                value={user.password}
                type="text"
                onChange={handleSubmit}
                className="form-control form-control-lg"
              />
            </div>
            <div>
              <h6>
                <a className="text-dark-50" href="#!">
                  Forgot password?
                </a>
              </h6>
            </div>
            <div className="submit">
              <button className="btn btn-primary" type="submit">
                {" "}
                Login{" "}
              </button>
            </div>
          </div>
        </div>
          <div className="login-message">
            <h3>{message}</h3>
          </div>
      </div>
    </form>
  );
}

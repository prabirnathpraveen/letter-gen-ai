import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import carVector from "../assets/images/ev-car.png";
import loginVectorAi from "../assets/images/login-vector-ai.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Loginn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if ((username != "", password != "")) {
        if (username === "admin" && password === "admin@123") {
          navigate("/dashboard");
        } else {
          swal("Error!", "Incorrect Password.", "error");
        }
    } else {
      swal("Error!", "Enter Username and Password", "error");
    }
  };

  return (
    <div className="row" style={{ width: "100%" }}>
      <div className="col-md-6" style={{ border: "0px solid" }}>
        <div
          className="login-box d-flex justify-content-center align-items-center "
          style={{ border: "0px solid", height: "100%" }}
        >
          <div style={{ border: "0px solid" }}>
            <img src={loginVectorAi} className="carVector"></img>
          </div>
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center align-items-center">
        <div
          className="login-box"
          style={{ border: "0px solid",width:"90%" }}
        >
          <h4 className="text-center">Login</h4>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="button-div d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-color"
              style={{ width: "100px" }}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginn;

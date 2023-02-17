//Import modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { login } from "../requests";
import "../Styles/Login.css";
import { HOME_ROUTE, SIGN_UP_ROUTE } from "../Constants/routes";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  
  const loginUser = async () => {
    try {
      await login(username, password);
      alert('Found the user');
      //go to home page
      navigate(HOME_ROUTE);
    } catch (error) {
      console.log("error", error)
      alert("Cannot login, please try again.");
    }
  };

  return (
    <form class="login">
      <h1 class="display-3">Welcome!</h1>
      <label for="username" class="form-label">
          Username
        </label>
        <input
          type="username"
          class="form-control mb-3"
          id="username"
          onChange={e => setUsername(e.target.value)}
          required
        />
      <label for="password" class="form-label">
        Password
      </label>
      <input
        type="password"
        class="form-control mb-3"
        id="password"
        onChange={e => setPassword(e.target.value)}
        required
      />
      <div class="btn-toolbar d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-dark m-2 col-1"
          onClick={loginUser}
        >
          Login
        </button>

        <button
          type="button"
          class="btn btn-outline-dark m-2 col-2"
          onClick={() => navigate(SIGN_UP_ROUTE)}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default Login;

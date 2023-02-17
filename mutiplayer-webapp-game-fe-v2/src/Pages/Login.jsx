//Import modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { login } from "../requests";
import "../Styles/Login.css";
import { HOME_ROUTE, REGISTER_ROUTE } from "../Constants/routes";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  
  const loginUser = async () => {
    try {
      await login(email, password);
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
      <label for="email" class="form-label">
          Email
        </label>
        <input
          type="email"
          class="form-control mb-3"
          id="email"
          onChange={e => setEmail(e.target.value)}
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
          onClick={() => navigate(REGISTER_ROUTE)}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default Login;

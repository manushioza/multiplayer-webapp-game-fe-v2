//Import modules
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { register } from "../requests";
import "../Styles/Login.css";
import { HOME_ROUTE, SIGN_UP_ROUTE } from "../Constants/routes";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  
  const registerUser = async () => {
    try {
      await register(email, username, password);
      alert('Registered User');
      //go to home page
      navigate(HOME_ROUTE);
    } catch (error) {
      console.log("error", error)
      alert("Cannot register, please try again.");
    }
  };

  return (
    <form class="login">
      <h1 class="display-3">Sign up!</h1>
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
        <button
          type="button"
          class="btn btn-outline-dark justify-content-center"
          onClick={registerUser}
        >
          Sign Up
        </button>
    </form>
  );
}

export default Register;

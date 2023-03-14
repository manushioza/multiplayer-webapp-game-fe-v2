//Import modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { login } from "../requests";
import "../Styles/Login.css";
import {
  HOME_ROUTE,
  REGISTER_ROUTE,
  MAINSTORY1_ROUTE,
  CREATEGAME_ROUTE,
} from "../Constants/routes";
const io = require("socket.io-client");

// const socket = io("https://multiplayer-game-backend.herokuapp.com", {
//   withCredentials: true,
//   extraHeaders: {
//     "Access-Control-Allow-Origin": "true"
//   }
// });
const socket = io("http://localhost:8000", {
  withCredentials: true,
});

function Login() {
  // client-side
  socket.on("connect", () => {
    console.log(socket.id);
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      if (socket.connected) {
        socket.emit(email, password);
        console.log("Emitting email, password");
      } else {
        console.log("Unable to emit to socket");
      }
      var res = await login(email, password);
      if (!res) {
        console.log("Unable to log user in.");
      } else {
        navigate(CREATEGAME_ROUTE, { username });
      }
    } catch (error) {
      console.log("error", error);
      alert("Cannot login, please try again.");
    }
  };

  useEffect(() => {
    if (email) {
      setUsername(email.substring(0, email.indexOf("@")));
      console.log("----username", username);
    }
  }, [email]);

  return (
    <form class="login">
      <div class="login--gutters">
        <h1 class="title-text mb-5">ASTROVERSE</h1>
        <label for="email" class="form-label login--labels">
          Email
        </label>
        <input
          type="email"
          class="form-control mb-3"
          id="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label for="password" class="form-label login--labels">
          Password
        </label>
        <input
          type="password"
          class="form-control mb-3"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div class="btn-toolbar d-flex justify-content-center">
          <button type="button" class="btn login--buttons" onClick={loginUser}>
            Login
          </button>

          <button
            type="button"
            class="btn login--buttons"
            onClick={() => navigate(REGISTER_ROUTE)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;

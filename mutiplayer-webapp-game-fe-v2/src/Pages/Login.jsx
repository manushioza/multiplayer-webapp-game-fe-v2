//Import modules
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../requests";
import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Login.css";

function Login() {
  const username_ref = useRef(null);
  const password_ref = useRef(null);

  let navigate = useNavigate();
  //for login -> redirect to home
  const login_route = async () => {
    await login({ username_ref }, { password_ref }).then((response) => {
      let path = ``;
      console.log(response);
      if (response.data.length == 0) {
        alert("Invaild credentials, please try again.");
      } else {
        //TODO - FILL IN NEXT STEPS
      }
    });
  };
  //for signup -> redire to signup
  const signup_route = () => {
    let path = `/signup`;
    navigate(path);
  };
  return (
    <div>
      <div>
        <form class="login">
          <h1 class="display-3">Welcome!</h1>
          <div class="mb-3">
            <label for="username" class="form-label">
              Username
            </label>
            <input
              type="username"
              class="form-control"
              id="username"
              ref={username_ref}
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              ref={password_ref}
              required
            />
          </div>
          <div class="btn-toolbar d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-dark m-2 col-1"
              onClick={login_route}
            >
              Login
            </button>

            <button
              type="button"
              class="btn btn-outline-dark m-2 col-2"
              onClick={signup_route}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

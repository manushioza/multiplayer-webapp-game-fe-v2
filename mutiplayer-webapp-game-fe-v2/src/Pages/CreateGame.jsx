//Import modules
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Login.css";
import { HOME_ROUTE, REGISTER_ROUTE } from "../Constants/routes";

function CreateGame() {
  const navigate = useNavigate();
  
//   const loginUser = async () => {
//     try {
//       await login(email, password);
//       alert('Found the user');
//       //go to home page
//       navigate(HOME_ROUTE);
//       // navigate(MAINSTORY1_ROUTE)
//     } catch (error) {
//       console.log("error", error)
//       alert("Cannot login, please try again.");
//     }
//   };
  
//   const username = email.substring(0, email.)

  return (
    <div class="login">
      <div class="login--gutters">
      <h2 class="title-text mb-5">HELLO SPACE CADET, </h2>
      {/* <h2 4 */}
      
      <div class="btn-toolbar d-flex justify-content-center">
        <button
          type="button"
          class="btn login--buttons"
        //   onClick={loginUser}
        >
          Create Game
        </button>

        <button
          type="button"
          class="btn login--buttons"
        //   onClick={() => navigate(REGISTER_ROUTE)}
        >
          Join Game
        </button>
      </div>
      </div>
    </div>
  );
}

export default CreateGame;

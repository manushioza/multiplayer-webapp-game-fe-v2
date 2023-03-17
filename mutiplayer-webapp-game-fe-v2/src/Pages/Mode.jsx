//Import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import "../Styles/Login.css";
import { GAME1_ROUTE, MULTIPLAYER_ROUTE } from "../Constants/routes";

import { inititaize, join } from "../Socket/ClientManager";

function CreateGame() {
  const navigate = useNavigate();

  return (
    <div class="login">
      <div class="login--gutters">
        <h2 class="title-text mb-3">HELLO SPACE CADET, </h2>

        <h4 class="sub-text mb-5">Please select a game mode </h4>
        {/* <h2 4 */}

        <div class="btn-toolbar d-flex justify-content-center">
          <button
            type="button"
            class="btn login--buttons"
            onClick={() => navigate(GAME1_ROUTE)}
          >
            Singleplayer
          </button>

          <button
            type="button"
            class="btn login--buttons"
            onClick={() => navigate(MULTIPLAYER_ROUTE)}
          >
            Multiplayer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGame;

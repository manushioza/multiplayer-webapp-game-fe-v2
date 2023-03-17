//Import modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import "../Styles/Login.css";
import { HOME_ROUTE, REGISTER_ROUTE, GAME1_ROUTE } from "../Constants/routes";
import { addSession } from "../requests";
import { inititaize, join } from "../Socket/ClientManager";

var loading = true;
var session_id = "";

function Multiplayer() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [id, setID] = useState();

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseJoin = () => {
    setShowJoin(false);
  };
  const handleShow = async () => {
    setShow(true);
    console.log("Attempting to create a lobby");
    if (!inititaize()) {
      console.log("Unable to bind to socket, please try again");
    } else {
      try {
        const res = await addSession(sessionStorage.getItem("username"));
        if (res.data.docID != "" && res.status == 200) {
          console.log("Session added");
          session_id = res.data.docID;
          handleClose();
          alert(
            "Lobby has been created. Please shared this ID with player: " +
              session_id
          );
          sessionStorage.setItem("sessionID", session_id);
          sessionStorage.setItem("playerID", 1);   
          join(sessionStorage.getItem("sessionID"), sessionStorage.getItem("playerID"));
          navigate(GAME1_ROUTE);
        } else {
          console.log("Unable to add session");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleShowJoin = () => {
    setShowJoin(true);
  };

  const joinGame = async () => {
    console.log("Attempting to join a lobby");
    if (!inititaize()) {
      console.log("Unable to bind to socket, please try again");
    } else {
      try {
        sessionStorage.setItem("playerID", 2);
        const res = await join(id, sessionStorage.getItem("playerID"));
        navigate(GAME1_ROUTE);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
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
        <h2 class="title-text mb-5">Select from one of the options below: </h2>
        {/* <h2 4 */}

        <div class="btn-toolbar d-flex justify-content-center">
          <button type="button" class="btn login--buttons" onClick={handleShow}>
            Create Game
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div class="d-flex align-items-center">
                <h3 class="m-4 px-5">Creating a lobby... </h3>

                <div class="spinner-border text-warning" role="status">
                  <span class="sr-only"></span>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <button
            type="button"
            class="btn login--buttons"
            onClick={handleShowJoin}
          >
            Join Game
          </button>

          <Modal show={showJoin} onHide={handleCloseJoin}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div class="d-flex align-items-center">
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Please enter session ID: "
                  onChange={(e) => setID(e.target.value)}
                  required
                />
                <button
                  type="button"
                  class="btn login--buttons"
                  onClick={joinGame}
                >
                  Join
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Multiplayer;

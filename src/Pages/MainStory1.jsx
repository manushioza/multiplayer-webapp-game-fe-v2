//Import modules
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Login.css";
import { HOME_ROUTE, REGISTER_ROUTE, MAINSTORY1_ROUTE, MAINSTORY2_ROUTE } from "../Constants/routes";

function MainStory1() {
   const navigate = useNavigate();

   return (
      
     <div className="mainstory1 mainstory1--background-img">
       <h2>YOU FIND YOURSELF STRANDED IN THE VAST EXPANSE OF SPACE WITH NO HOPE OF IMMEDIATE RESCUE...</h2>
       <button
          type="button"
          class="btn mainstory1-btn--continue"
          onClick={() => navigate(MAINSTORY2_ROUTE)}
        >
          Click to continue...
        </button>
     </div>
   );
  }
  
  export default MainStory1;
  
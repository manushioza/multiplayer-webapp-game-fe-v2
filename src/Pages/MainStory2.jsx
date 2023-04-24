//Import modules
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Login.css";
import { SHAPESORT_ROUTE, GAME1_ROUTE } from "../Constants/routes";

function MainStory2() {
   const navigate = useNavigate();
 
   return (
      
     <div className="mainstory1 mainstory2--background-img">
       <h2>BUT FEAR NOT, AS YOU EMBARK ON A DAILY ROUTINE THAT WILL CHALLENGE YOU TO STAY SANE AND SURVIVE THE HARSH CONDITIONS OF YOUR INTERSTELLAR EXILE.</h2>
       <h1>IT'S TIME TO WAKE UP!</h1>
       <button
          type="button"
          class="btn mainstory1-btn--continue"
          //THIS WILL BE CHANGED TO DIFFERENT GAME
          onClick={() => navigate(GAME1_ROUTE)}
         //  onClick={loginUser}
        >
          Click to wake up...
        </button>
     </div>
   );

  }
  
  export default MainStory2;
  
//Import modules
import React from "react";
import "../Styles/Scores.css";

function Scores() {
  return (
    <div class="scores">
      <div class="text justify-content-center">
        <h1>
          Congratuations! You have stopped yourself from loosing your mind and
          have lived another day....</h1>
          <br></br>
        <h2> Final Score: {parseInt(sessionStorage.getItem("scores"))}</h2>
      </div>
    </div>
  );
}

export default Scores;

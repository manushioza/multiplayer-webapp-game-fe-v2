//Import modules
import React, { useState, useEffect } from "react";
import state0_img from "../DesignAssets/card.webp";
import state1_img from "../DesignAssets/rocket.png";
import ReactCardFlip from "react-card-flip";

function Card() {
  const [flip, setFlip] = useState(false);

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <div>
        <button onClick={() => setFlip(!flip)}>
          <img width="150px" src={state0_img}></img>
        </button>
      </div>
      <div>
        <button onClick={() => setFlip(!flip)}>
          <img width="250px" src={state1_img}></img>
        </button>
      </div>
    </ReactCardFlip>
  );
}

export default Card;

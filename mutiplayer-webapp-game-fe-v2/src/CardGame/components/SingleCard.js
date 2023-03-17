import React from "react";
import "./SingleCard.css";
import cardback from "../img/cover.png"

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card" />
        <img
          className="back"
          src={cardback}
          onClick={handleClick}
          alt="cover"
        />
      </div>
    </div>
  );
}

export default SingleCard;

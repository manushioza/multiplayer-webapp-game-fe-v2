import React, { useState, useEffect } from "react";
import "./FlipCard.css";
import SingleCard from "./components/SingleCard";
import helmet from "./img/helmet.png"
import potion from "./img/potion.png"
import ring from "./img/ring.png"
import scroll from "./img/scroll.png"
import shield from "./img/shield.png"
import sword from "./img/sword.png"


const cardImg = [
  { src: {helmet}, matched: false },
  { src: {potion}, matched: false },
  { src: {ring}, matched: false },
  { src: {scroll}, matched: false },
  { src: {shield}, matched: false },
  { src: {sword}, matched: false },
];

function FlipCard() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle
  const shuffleCards = () => {
    const shuffledCards = [...cardImg, ...cardImg]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset choice
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //start new game
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div classname="background"> 
      
      <div className="FlipCard">
        <h1>Magic Memory Game</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>

        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default FlipCard;

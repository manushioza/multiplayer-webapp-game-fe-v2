import React, { useState, useEffect } from "react";
import "./FlipCard.css";
import SingleCard from "./components/SingleCard";
import helmet from "./img/helmet.png";
import potion from "./img/potion.png";
import ring from "./img/ring.png";
import scroll from "./img/scroll.png";
import shield from "./img/shield.png";
import sword from "./img/sword.png";
import { emit_score_game3, get_score_game3 } from "../Socket/ClientManager";

// const cardImg

const cardImg = [
  { src: helmet, matched: false },
  { src: potion, matched: false },
  { src: ring, matched: false },
  { src: scroll, matched: false },
  { src: shield, matched: false },
  { src: sword, matched: false },
];

function FlipCard() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [partnerTurns, setPartnerTurns] = useState(0);
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

    //Once partner score obtained, set the state of the partner score
  }, [choiceOne, choiceTwo]);

  //reset choice
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
    try {
      emit_score_game3(sessionStorage.getItem("playerID"), turns+1);
      get_score()
    } catch (err) {
      console.log(err);
    }
  };

  //start new game
  useEffect(() => {
    shuffleCards();
  }, []);

  const get_score = async () => {
    var s = 0;
    //If player 1, get partner score == score of player 2
    if (sessionStorage.getItem("playerID") == 1) {
      s = await get_score_game3(2);
      //If player 2, get partner score == score of player 1
    } else {
      s = await get_score_game3(1);
    }
    setPartnerTurns((s) => s + 1);
  
  };

   

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
        <p>Partner's Turns: {partnerTurns}</p>
      </div>
    </div>
  );
}

export default FlipCard;

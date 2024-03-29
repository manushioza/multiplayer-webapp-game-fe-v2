import React, { useState, useEffect } from "react";
import "./FlipCard.css";
import SingleCard from "./components/SingleCard";
import helmet from "./img/helmet.svg"
import spaceship from "./img/spaceship.svg"
import ring from "./img/planet.svg"
import rover from "./img/rover.svg"
import alien from "./img/alien.svg"
import sword from "./img/sword.svg"
import { emit_score_game3, get_score_game3 } from "../Socket/ClientManager";
import { SHAPESORT_ROUTE } from "../Constants/routes";

// const cardImg

const cardImg = [
  { src: helmet, matched: false },
  { src: spaceship, matched: false },
  { src: ring, matched: false },
  { src: rover, matched: false },
  { src: alien, matched: false },
  { src: sword, matched: false },
];
var matched_pairs = 0;
var max_pairs = 6;

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
        matched_pairs = matched_pairs + 1;
        console.log(matched_pairs)
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
    var prev_score = sessionStorage.getItem("scores")
    var new_score = parseInt(prev_score) - parseInt((s+1)*5)
    sessionStorage.setItem("scores", parseInt(new_score))
    setPartnerTurns((s) => s + 1);
  
  };


   

  return (
    <div classname="background">
      <div className="FlipCard">
      <h2 class="title-text mb-5">Train your mind to stay sane. Match the cards.</h2>

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
        {max_pairs == matched_pairs && (
                    <div className="button-container">
                        <button
                            type="button"
                            className="btn jigsaw-btn--continue"
                            onClick={() => (window.location.href = SHAPESORT_ROUTE)}
                        >
                            Continue
                        </button>
                    </div>
                )}
      </div>
    </div>
  );
}

export default FlipCard;

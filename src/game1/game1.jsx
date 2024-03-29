import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Ship from "./ship";
import Star from "./star";
import "../Styles/game1.css";
import { emit_score_game1, get_score_game1 } from "../Socket/ClientManager";
import { GAME2_ROUTE } from "../Constants/routes";

var partner_score = 0;

const getRandomStar = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const initialState = {
  star: getRandomStar(),
  direction: "RIGHT",
  speed: 150,
  route: "game",
  shipDots: [
    [0, 0],
    [0, 2],
  ],
  score: 0, // add score property
  timer: 60,
  partnerScore: 0,
};

class game1 extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    setInterval(this.moveShip, this.state.speed);
    setInterval(this.getScores, 5000);
    document.onkeydown = this.onKeyDown;

    // start the timer countdown
    this.timerInterval = setInterval(() => {
      this.setState(
        (prevState) => ({
          timer: prevState.timer - 1,
        }),
        () => {
          if (this.state.timer === 0) {
            clearInterval(this.timerInterval);
            this.gameOver();
          }
        }
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  componentDidUpdate() {
    this.onShipOutOfBounds();
    this.onShipCollapsed();
    this.onShipEats();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      default:
        break;
    }
  };
  getScores = async () => {
    var s = 0;
    //If player 1, get partner score == score of player 2
    if (sessionStorage.getItem("playerID") == 1) {
      s = await get_score_game1(2);
      //If player 2, get partner score == score of player 1
    } else {
      s = await get_score_game1(1)
    }
  
    try{
      console.log(s)
      this.setState({
        partnerScore:  s,
      });
    }
    catch(err){
      console.log(err);
    }
    console.log("partner score: " +  s);
    //Once partner score obtained, set the state of the partner score
  };

  moveShip = () => {
    let dots = [...this.state.shipDots];
    let head = dots[dots.length - 1];
    if (this.state.route === "game") {
      switch (this.state.direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
        default:
          break;
      }
      dots.push(head);
      dots.shift();
      this.setState({
        shipDots: dots,
      });
      // check if the time has run out
      if (this.state.timer === 0) {
        this.gameOver();
      }
    }
  };

  onShipOutOfBounds() {
    let head = this.state.shipDots[this.state.shipDots.length - 1];
    if (this.state.route === "game") {
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        this.gameOver();
      }
    }
  }

  onShipCollapsed() {
    let ship = [...this.state.shipDots];
    let head = ship[ship.length - 1];
    ship.pop();
    ship.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    });
  }

  onShipEats() {
    let head = this.state.shipDots[this.state.shipDots.length - 1];
    let star = this.state.star;
    if (head[0] === star[0] && head[1] === star[1]) {
      this.setState({
        star: getRandomStar(),
        score: this.state.score + 10, // increment score
      });
      this.increaseSpeed();
      var prev_score = sessionStorage.getItem("scores")
      var new_score = parseInt(prev_score) + parseInt(this.state.score + 10)
      sessionStorage.setItem("scores", parseInt(new_score))
      emit_score_game1(sessionStorage.getItem("playerID"), this.state.score + 10);
    }
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 20,
      });
    }
  }

  onRouteChange = () => {
    this.setState({
      route: "game",
    });
  };

  gameOver() {
    clearInterval(this.timerInterval);
    this.setState({
      route: "game-over",
    });
  }

  onDown = () => {
    let dots = [...this.state.shipDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] + 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "DOWN",
      shipDots: dots,
    });
  };

  onUp = () => {
    let dots = [...this.state.shipDots];
    let head = dots[dots.length - 1];

    head = [head[0], head[1] - 2];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "UP",
      shipDots: dots,
    });
  };

  onRight = () => {
    let dots = [...this.state.shipDots];
    let head = dots[dots.length - 1];

    head = [head[0] + 2, head[1]];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "RIGHT",
      shipDots: dots,
    });
  };

  onLeft = () => {
    let dots = [...this.state.shipDots];
    let head = dots[dots.length - 1];

    head = [head[0] - 2, head[1]];
    dots.push(head);
    dots.shift();
    this.setState({
      direction: "LEFT",
      shipDots: dots,
    });
  };

  render() {
    const { shipDots, star, score, route } = this.state;

    return (
      <div>
        <h2 class="title-text mb-5">You need provisions to survive. Collect as many supply crates as you can.</h2>
        <div className="game-area">
          <Ship shipDots={shipDots} />
          <Star dot={star} />
          <div className="score">
            <p>Score: {this.state.score}</p>
            <p>Partner's score: {this.state.partnerScore}</p>
          </div>
          <div className="timer">
            <p>Time: {this.state.timer}</p>
          </div>
        </div>
        {route === "game-over" && (
          <div className="game1-over">
            <h2>Game Over</h2>
            <p>Your score was {score}!</p>
            <button onClick={(event) => (window.location.href = GAME2_ROUTE)}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default game1;

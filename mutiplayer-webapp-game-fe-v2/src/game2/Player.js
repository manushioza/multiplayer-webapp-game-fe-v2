import img from './photos/player.png'
import "../Styles/game2.css"

export class Player {
  dead = false;
  health = 100;
  ammo = 100;
  score = 0;
  speed = 25;
  firebullets = [];
  lastFireAt = Date.now();
  timeLeft = 30000;
  intervalId = null;

  constructor(posX, posY) {
    this.posX = posX;
    this.posY = posY;
  }

  deductHealth = () => {
    this.health -= 10;
  };

  increaseScore = () => {
    this.score += 10;
  };

  startTimer = () => {
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft -= 10;
      }
      if (this.timeLeft === 0) {
        clearInterval(this.intervalId);
        this.dead = true;
        gameOver(this.score);
      }
    }, 1000); // change the interval from 1000ms to 1s
  };
  


  update = (firecb) => {
    this.startTimer();

    document.onkeydown = (e) => {
      if (e.keyCode === 39) {
        this.posX += this.speed;
      }
      if (e.keyCode === 37) {
        this.posX -= this.speed;
      }
      document.addEventListener('keypress', (e) => {
        if (e.keyCode === 32) {
          if (Date.now() - this.lastFireAt > 250) {
            firecb(this.posX + 32, this.posY);
            this.lastFireAt = Date.now();
          }
        }
      });
    };

    if (this.posX < -10 || this.posX > 890) {
      clearInterval(this.intervalId);
      this.dead = true;
      gameOver(this.score);
    }
    if (this.health <= 0) {
      clearInterval(this.intervalId);
      this.dead = true;
      gameOver(this.score);
    }

    if (this.dead)
    {
      this.timeLeft = 0;
      gameOver(this.score);
    }
    
  };

  draw = (ctx) => {
    const image = new Image();
    image.src = img;
    ctx.drawImage(image, this.posX, this.posY, 65, 90);

    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Health: ${this.health}`, 950 - 95, 550 - 15);

    ctx.font = '16px Arial';
    ctx.fillStyle = 'lightgreen';
    ctx.fillText(`Score: ${this.score}`, 15, 25);

    ctx.font = '16px Arial';
    ctx.fillStyle = 'lightgreen';
    const remainingTime = (this.timeLeft / 1000).toFixed(0);
    ctx.fillText(`Time Left: ${remainingTime}s`, 950 - 120, 25);

  };

  
}

function gameOver(score) {
  clearInterval(Player.intervalId);
  const overlay = document.createElement('div');
  overlay.innerHTML = `
  <div class="game2-over">
    <div>
      <h2>Game Over!</h2>
      <p>Your Score: ${score}</p>
      <button class="btn btn-danger mt-2" onClick="location.reload()">Play Again</button>
    </div>
  </div>  
  `;
  document.body.appendChild(overlay);
}


export default Player;

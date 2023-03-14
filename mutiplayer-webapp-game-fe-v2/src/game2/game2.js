import React, { useEffect, useRef } from 'react';
import { Player } from './Player';
import bg from './photos/space.jpg';
import { Meteor } from './Meteor';
import { Bullet } from './Bullet';

function Game2() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const maxMeteorCount = 10;
  let lastMeteorSpawnAt = Date.now();

  const player = new Player(950 / 2,550 / 1.5);

  const randomNumber = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    let meteors = [];
    let bullets = [];
    const fireBulletcb = (xpos, ypos) => bullets.push(new Bullet(xpos, ypos));

    const intervalId = setInterval(() => {
      if (canvasRef.current && ctxRef.current) {
        ctx.clearRect(0, 0, 950, 550);

        player.update(fireBulletcb);
        player.draw(ctx);

        const random = randomNumber(0, 700);
        if (meteors.length < maxMeteorCount && (Date.now() - lastMeteorSpawnAt) > 1500) {
          meteors.push(new Meteor(random, -200));
          lastMeteorSpawnAt = Date.now();
        }

        meteors = meteors.filter((enemy) => !enemy.dead);
        meteors.forEach(meteor => {
          meteor.update(player, bullets);
          meteor.draw(ctx);
        });

        bullets = bullets.filter((bullet) => !bullet.dead);
        bullets.forEach(bullet => {
          bullet.update();
          bullet.draw(ctx);
        });
      }
    }, 1000 / 30);

    return () => clearInterval(intervalId);
  }, []);

  
  return (
    <div style={{
    display:'flex',justifyContent:'center',alignItems:'center',height:'100%',flexDirection:'row'
    }}>
        <canvas ref={canvasRef} width="950" height="550" style={{backgroundImage: `url(${bg})`,backgroundSize:"cover" ,border:'2px solid #000000',marginTop:'48px'}}/>
    </div>
  );
}

export default Game2;

import Matter from 'Matter-js';
// import { launch } from './game';

const Bodies = Matter.Bodies;

export const launch = function launch() {
  let launched = false;

  document.addEventListener("keydown", function keyDown(e) {
    let keyCode = e.keyCode;
    if (keyCode === 38 || keyCode === 32) {
      let pinball = createBall();
      Matter.Body.setPosition(pinball, { x: 525, y: 650 });
      Matter.Body.setVelocity(pinball, {x: 0, y: 10 });

      return pinball;
    }

  }
);
};

export const createBall = function createBall() {
  let ball = Bodies.circle(100, 200, 15);

  return ball;
};

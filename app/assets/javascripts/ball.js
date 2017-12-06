import Matter from 'Matter-js';

const Bodies = Matter.Bodies;



export const createBall = function createBall() {
  let ball = Bodies.circle(100, 200, 15);

  return ball;
};

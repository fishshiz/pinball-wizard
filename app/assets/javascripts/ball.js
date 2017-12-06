import Matter from 'Matter-js';

const Bodies = Matter.Bodies;
const bufferGroup = Matter.Body.nextGroup(true);


export const createBall = function createBall() {
  let ball = Bodies.circle(285, 200, 15, 80);

  return ball;
};

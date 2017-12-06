import { circles, walls, innerWalls, bumpers, paddles, thorns } from './app/assets/javascripts/board';
import { createBall } from './app/assets/javascripts/ball';
import Matter from 'Matter-js';

  let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

  let engine;
  let world;
  let score;
  let highScore;
  let leftPaddleUp;
  let rightPaddleUp;

  function setup() {

    engine = Engine.create();

    let render = Render.create({
        canvas: document.getElementById('pinball-canvas'),
        engine: engine,
        options: {
          width: 550,
          height: 650,
          wireframes: false
        }
    });
    world = engine.world;
    const board = [circles(), walls(), innerWalls(), bumpers(), paddles(), thorns()];
    World.add(engine.world, board.reduce((prev, curr) => {
      return prev.concat(curr);
    }));

    World.add(engine.world, [createBall()]);
    console.log(World);
    console.log(engine);

    Engine.run(engine);
    Render.run(render);
  }

  function paddleCommands() {
    document.addEventListener("keydown", function keyDown(e) {
      let keyCode = e.keyCode;
      if (keyCode === 37) {
        Matter.Body.setAngularVelocity(engine.world.bodies[17], 2);
        Matter.Body.setAngularVelocity(engine.world.bodies[19], 0);
      } else if (keyCode===39) {
        Matter.Body.setAngularVelocity(engine.world.bodies[19], 2);
        Matter.Body.setAngularVelocity(engine.world.bodies[17], 0);

      } else {
        Matter.Body.setAngle(engine.world.bodies[19], (4 * Math.PI)/3);
        Matter.Body.setAngle(engine.world.bodies[17], (2 * Math.PI)/3);
      }

    }
  );
}

  document.addEventListener("DOMContentLoaded", function(){

    setup();
    paddleCommands();
  });

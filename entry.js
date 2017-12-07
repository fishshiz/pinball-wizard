import { circles, walls, innerWalls, bumpers, paddles, thorns } from './app/assets/javascripts/board';
import { launch } from './app/assets/javascripts/game';
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
  const bufferGroup = Matter.Body.nextGroup(true);
  const paddleGroup = Matter.Body.nextGroup(true);

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
    world.gravity.y = 0.75;
    const board = [circles(), walls(), innerWalls(), bumpers(), paddles(), thorns()];
    World.add(engine.world, board.reduce((prev, curr) => {
      return prev.concat(curr);
    }));

    World.add(engine.world, [createBall()]);
    // engine.world.bodies[27].collisionFilter = { group: bufferGroup };
    engine.world.bodies[21].collisionFilter = { group: bufferGroup };
    engine.world.bodies[22].collisionFilter = { group: bufferGroup };
    engine.world.bodies[23].collisionFilter = { group: bufferGroup };
    engine.world.bodies[24].collisionFilter = { group: bufferGroup };
    // engine.world.bodies[17].collisionFilter = { group: paddleGroup };
    // engine.world.bodies[19].collisionFilter = { group: paddleGroup };

    Engine.run(engine);
    Render.run(render);
  }

  function paddleCommands() {
    var leftFired = false;
    var rightFired = false;

    document.addEventListener("keydown", function keDown(e) {
      let keyCode = e.keyCode;
      if (keyCode === 37 && leftFired === false) {
        leftFired = true;
        Matter.Body.setAngularVelocity(engine.world.bodies[17], 0.5);
      } else if (keyCode === 39  && rightFired === false) {
        rightFired = true;
        Matter.Body.setAngularVelocity(engine.world.bodies[19], 0.5);
      }
    });
    document.addEventListener("keyup", function keUp(e) {
      let keyCode = e.keyCode;
      if (keyCode === 37 ) {
        leftFired = false;
      } else if (keyCode === 39) {
        rightFired = false;
      }
    }
  );
}

  document.addEventListener("DOMContentLoaded", function(){

    setup();
    paddleCommands();
    launch();
  });

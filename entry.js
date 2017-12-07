import { circles, walls, innerWalls, bumpers, paddles, thorns } from './app/assets/javascripts/board';
// import { launch } from './app/assets/javascripts/game';
// import { createBall, launch } from './app/assets/javascripts/ball';
import Matter from 'Matter-js';

  let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

  let engine;
  let world;
  let score;
  let inPlay;
  let highScore;
  let ballCount;
  let leftPaddleUp;
  let rightPaddleUp;
  const bufferGroup = Matter.Body.nextGroup(true);
  const paddleGroup = Matter.Body.nextGroup(true);

  engine = Engine.create();
  function setup() {


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

    ballCount = 3;
    score = 0;
    inPlay = false;

    // World.add(engine.world, [createBall()]);
    // engine.world.bodies[27].collisionFilter = { group: bufferGroup };
    engine.world.bodies[21].collisionFilter = { group: bufferGroup };
    engine.world.bodies[22].collisionFilter = { group: bufferGroup };
    engine.world.bodies[23].collisionFilter = { group: bufferGroup };
    engine.world.bodies[24].collisionFilter = { group: bufferGroup };
    // engine.world.bodies[17].collisionFilter = { group: paddleGroup };
    // engine.world.bodies[19].collisionFilter = { group: paddleGroup };
    console.log(engine);
    Engine.run(engine);
    Render.run(render);
  }

  function playGame() {
    if (ballCount >= 1 && inPlay === false) {
      paddleCommands();
      launch();
      inPlay = true;
      // handleEvents();
    }
  }

  function launch() {
    let launched = false;

    document.addEventListener("keydown", function keyDown(e) {
      let keyCode = e.keyCode;
      if (keyCode === 38 || keyCode === 32) {
        let pinball = createBall();
        World.add(engine.world, pinball);
        Matter.Body.setPosition(pinball, { x: 500, y: 650 });
        Matter.Body.setVelocity(pinball, {x: 0, y: -25 });
      }

    }
  );
  }

  function createBall() {
    let ball = Bodies.circle(0, 0, 15);

    return ball;
  }

  function handleEvents() {
    if (engine.world.bodies[27].position.y > 650) {
      inPlay = false;
      ballCount -= 1;
    }
    console.log("test");
    Matter.Events.on(engine, 'collisionStart', function(e) {
      if (e.pairs.bodyA === engine.world.bodies[0] ||
      e.pairs.bodyA === engine.world.bodies[1] ||
    e.pairs.bodyA === engine.world.bodies[2]) {
      updateScore(10);
      console.log(score);
      e.pairs.bodyA.render.fillStyle = 'rgb(176, 145, 80)';
      setTimeout(function() {
        e.pairs.bodyA.render.fillStyle = 'rgb(230, 149, 42)';}, 100);
      } else if (e.pairs.bodyA === engine.world.bodies[15] ||
      e.pairs.bodyA === engine.world.bodies[16]) {
        updateScore(5);
        console.log(score);
      }
    });
  }

  function updateScore(points) {
    score += points;
    if (score > highScore) highScore = score;
  }

  function paddleCommands() {
    var leftFired = false;
    var rightFired = false;

    document.addEventListener("keydown", function keDown(e) {
      let keyCode = e.keyCode;
      if (keyCode === 37 && leftFired === false) {
        leftFired = true;
        Matter.Body.setAngularVelocity(engine.world.bodies[17], 2);
        // engine.world.bodies[17].isSleeping = true;
      } else if (keyCode === 39  && rightFired === false) {
        rightFired = true;
        Matter.Body.setAngularVelocity(engine.world.bodies[19], 2);
        // engine.world.bodies[19].isSleeping = true;
      }
    });
    document.addEventListener("keyup", function keUp(e) {
      let keyCode = e.keyCode;
      if (keyCode === 37 ) {
        leftFired = false;
        // Matter.Body.setAngle(engine.world.bodies[17], (2 * Math.PI)/3);
        engine.world.bodies[17].isSleeping = true;
      } else if (keyCode === 39) {
        rightFired = false;
        // Matter.Body.setAngle(engine.world.bodies[19], (4 * Math.PI)/3);
        engine.world.bodies[19].isSleeping = true;
      }
    }
  );
}

  document.addEventListener("DOMContentLoaded", function(){

    setup();
    playGame();
  });

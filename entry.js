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
  let highScore = 0;
  let ballCount;
  let leftPaddleUp;
  let rightPaddleUp;
  let listening = false;
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

    ballCount = 3;
    document.getElementById('ball-count').innerHTML = ballCount;
    world = engine.world;
    world.gravity.y = 0.75;
    const board = [circles(), walls(), innerWalls(), bumpers(), paddles(), thorns()];
    World.add(engine.world, board.reduce((prev, curr) => {
      return prev.concat(curr);
    }));


    score = 0;
    document.getElementById('score').innerHTML = score;
    document.getElementById('high-score').innerHTML = highScore;
    inPlay = false;

    // engine.world.bodies.filter(findPinball).collisionFilter = { group: bufferGroup };
    engine.world.bodies[21].collisionFilter = { group: bufferGroup };
    engine.world.bodies[22].collisionFilter = { group: bufferGroup };
    engine.world.bodies[23].collisionFilter = { group: bufferGroup };
    engine.world.bodies[24].collisionFilter = { group: bufferGroup };
    console.log(engine.world.bodies);
    // engine.world.bodies[17].collisionFilter = { group: -1 };
    // engine.world.bodies[19].collisionFilter = { group: -1 };
    Engine.run(engine);
    Render.run(render);
  }


  function launch() {

    window.addEventListener("keydown", function keyDown(e) {
      let keyCode = e.keyCode;
      if ((inPlay === false && keyCode === 38 && ballCount > 0) ||
      (inPlay === false && keyCode === 32 && ballCount > 0)) {
        let pinball = createBall();
        pinball.label = 'pinball';
        World.add(engine.world, pinball);
        Matter.Body.setPosition(pinball, { x: 500, y: 650 });
        Matter.Body.setVelocity(pinball, {x: 0, y: (Math.floor(Math.random() * -35) - 25) });
        inPlay = true;

      }
    }
  );
  }

  function createBall() {
    let ball = Bodies.circle(0, 0, 15);
    ball.label = 'pinball';
    return ball;
  }

  function findPinball(obj) {
    if(obj.label === 'pinball') return true;
  }

  function ballOut() {
    if (inPlay) {
      listening = true;
      let pinball = engine.world.bodies.filter(findPinball);
      let ballTracker = setInterval( function(){
        if (pinball[0].position.y > 650) {
          Matter.Composite.remove(engine.world, pinball);
          clearInterval(ballTracker);
          inPlay = false;
          ballCount -= 1;
          document.getElementById('ball-count').innerHTML = ballCount;
          listening = false;
        }
      }, 500);
    }
    Matter.Events.on(engine, 'collisionStart', function(event) {
      console.log(event.pairs);
      if (event.pairs.bodyA === engine.world.bodies[0] ||
      event.pairs.bodyA === engine.world.bodies[1] ||
      event.pairs.bodyA === engine.world.bodies[2]) {
      updateScore(10);
      console.log(score);
      event.pairs.bodyA.render.fillStyle = 'rgb(176, 145, 80)';
      setTimeout(function() {
        event.pairs.bodyA.render.fillStyle = 'rgb(230, 149, 42)';}, 100);
      } else if (event.pairs.bodyA === engine.world.bodies[15] ||
      event.pairs.bodyA === engine.world.bodies[16]) {
        updateScore(5);
        console.log(score);
      }
    });
  }

  function updateScore(points) {
    score += points;
    document.getElementById('score').innerHTML = score;
    if (score > highScore) {
      highScore = score;
      document.getElementById('high-score').innerHTML = highScore;
    }
  }

  function paddleCommands() {
    var leftFired = false;
    var rightFired = false;

    document.addEventListener("keydown", function keDown(e) {
      let keyCode = e.keyCode;
      if (keyCode === 37 && leftFired === false) {
        leftFired = true;
        Matter.Body.setAngularVelocity(engine.world.bodies[17], -2);
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
      if (ballCount > 0) {
        launch();
        if (listening === false) {
          ballOut();
        }
      }
    }
  );
}

  document.addEventListener("DOMContentLoaded", function(){

    setup();
    paddleCommands();

  });

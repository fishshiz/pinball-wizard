import { circles, walls, innerWalls, bumpers, paddles, thorns, ballHatch } from './app/assets/javascripts/board';
// import { launch } from './app/assets/javascripts/game';
// import { createBall, launch } from './app/assets/javascripts/ball';
import Matter from 'Matter-js';

  let Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint;

  let engine;
  let hatchUp = true;
  let world;
  let score;
  let inPlay;
  let highScore = 0;
  let ballCount;
  let leftPaddleUp;
  let rightPaddleUp;
  let leftPaddle
  let rightPaddle;
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
    world.gravity.y = 0.95;
    const board = [circles(), walls(), innerWalls(), bumpers(), paddles(), thorns(), ballHatch()];
    World.add(engine.world, board.reduce((prev, curr) => {
      return prev.concat(curr);
    }));
    leftPaddle = engine.world.bodies.filter(body => body.label === 'leftPaddle')[0];
    rightPaddle = engine.world.bodies.filter(body => body.label === 'rightPaddle')[0];


    score = 0;
    document.getElementById('score').innerHTML = score;
    document.getElementById('high-score').innerHTML = highScore;
    inPlay = false;

    engine.world.bodies.filter(findPinball).collisionFilter = { group: bufferGroup };
    let buffers = engine.world.bodies.filter(body => body.label === 'buffer');
    for (let buffer of buffers) {
      buffer.collisionFilter = { group: bufferGroup };
    }
    // engine.world.bodies[17].collisionFilter = { group: -1 };
    // engine.world.bodies[19].collisionFilter = { group: -1 };
    Engine.run(engine);
    Render.run(render);
  }

  function openHatch() {
    let hatch = engine.world.bodies.filter(body => body.label === 'hatch')[0];
    Matter.Body.translate(hatch, { x: 0, y: 100 });
    hatchUp = false;
  }

  function closeHatch() {
    let hatch = engine.world.bodies.filter(body => body.label === 'hatch')[0];
    Matter.Body.translate(hatch, { x: 0, y: -100 });
    hatchUp = true;
  }

  function launchAction(e) {
    let keyCode = e.keyCode;
    if ((inPlay === false && keyCode === 38 && ballCount > 0) ||
    (inPlay === false && keyCode === 32 && ballCount > 0)) {
      openHatch();
      let pinball = createBall();
      pinball.label = 'pinball';
      World.add(engine.world, pinball);
      Matter.Body.setPosition(pinball, { x: 500, y: 650 });
      Matter.Body.setVelocity(pinball, {x: 0, y: (Math.floor(Math.random() * -35) - 25) });
      inPlay = true;
    }
  }

  function launch() {
    window.addEventListener("keydown", function keyDown(e) {
      launchAction(e);
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
        } else if (pinball[0].position.x < 490 && hatchUp === false) {
          closeHatch();
        }
      }, 250);
    }
    Matter.Events.on(engine, 'collisionStart', function(event) {
      let body;
      let ballVelocity;

     var pairs = event.pairs;
      ballVelocity = event.pairs[0].bodyB.velocity
      let xVelocity = (ballVelocity.x) * (-1.1);

      let yVelocity = (ballVelocity.y) * (-1.1);

      if (event.pairs[0].bodyA.label === 'topCircle') {
      updateScore(10);
      Matter.Body.setVelocity(event.pairs[0].bodyB, {x: xVelocity, y: yVelocity});
      xVelocity = 0;
      yVelocity = 0;
      body = event.pairs[0].bodyA.render
      body.fillStyle = 'rgb(176, 145, 80)';
      setTimeout(function() {
        body.fillStyle = 'rgb(230, 149, 42)';}, 100);
      } else if (event.pairs[0].bodyA.label === 'launchpad') {
        console.log('yp');
        updateScore(5);
        Matter.Body.setVelocity(event.pairs[0].bodyB, {x: xVelocity, y: yVelocity});
        body = event.pairs[0].bodyA.render
        body.fillStyle = 'rgb(176, 145, 80)';
        setTimeout(function() {
          body.fillStyle = 'rgb(169, 210, 240)';}, 100);
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

  function firePaddle(e, leftFired, rightFired) {
    let keyCode = e.keyCode;
    if (keyCode === 37 && leftFired === false) {
      leftFired = true;
      Matter.Body.setAngularVelocity(leftPaddle, -2);
    } else if (keyCode === 39  && rightFired === false) {
      rightFired = true;
      Matter.Body.setAngularVelocity(rightPaddle, 2);
    }
  }

  function releasePaddle(e, leftFired, rightFired) {
    let keyCode = e.keyCode;
    if (keyCode === 37 ) {
      leftFired = false;
      // engine.world.bodies[17].isSleeping = false;
    } else if (keyCode === 39) {
      rightFired = false;
      // engine.world.bodies[19].isSleeping = true;
    }
    if (ballCount > 0) {
      launch();
      if (listening === false) {
        ballOut();
      }
    } else {
      newGame();
    }
  }

  function paddleCommands() {
    var leftFired = false;
    var rightFired = false;

    document.addEventListener("keydown", function keyDown(e) {
      firePaddle(e, leftFired, rightFired);
    });
    document.addEventListener("keyup", function keyUp(e) {
      releasePaddle(e, leftFired, rightFired);
    }
  );
}

function newGame() {
  if(ballCount === 0 ) {
    resetGlobalVariables();
    window.removeEventListener("keydown", function keyDown(e) {
      launchAction(e);
    });
    document.removeEventListener("keydown", function keyDown(e) {
      firePaddle(e);
    });
    document.removeEventListener("keyup", function keyUp(e) {
      releasePaddle(e);
    });
    document.getElementById('ball-count').innerHTML = ballCount;
    updateScore(0);
  }
}

function resetGlobalVariables() {
  score = 0;
  ballCount = 3;
}

  document.addEventListener("DOMContentLoaded", function(){

    setup();
    paddleCommands();
  });

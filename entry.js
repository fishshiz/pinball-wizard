import { circles, walls, innerWalls, bumpers, paddles, thorns, ballHatch } from './app/assets/javascripts/board';
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
  let leftPaddle;
  let rightPaddle;
  let leftFired = false;
  let rightFired = false;
  let listening = false;
  const bufferGroup = Matter.Body.nextGroup(false);
  const paddleGroup = Matter.Body.nextGroup(false);

  function setup() {
    engine = Engine.create();

    let render = Render.create({
      canvas: document.getElementById("pinball-canvas"),
      engine: engine,
      options: {
        width: 550,
        height: 650,
        wireframes: false,
        background: "#787b8aa3"
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

    // engine.world.bodies.filter(findPinball).collisionFilter = { group: bufferGroup };
    let buffers = engine.world.bodies.filter(body => body.label === 'buffer');
    for (let buffer of buffers) {
      buffer.collisionFilter = { group: bufferGroup };
    }
    leftPaddle.collisionFilter = { group: bufferGroup, category: 4294967295, mask: 2 };
    rightPaddle.collisionFilter = { group: bufferGroup, category: 4294967295, mask: 2 };
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
      pinball.collisionFilter = { mask: 4294967295, category: 2, group: 0 };
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
          let displayBallCount = document.getElementById('ball-count');
          displayBallCount.classList.add('lose-ball');
          displayBallCount.innerHTML = ballCount;
          displayBallCount.addEventListener('transitionend', removeTransition);
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
      ballVelocity = event.pairs[0].bodyB.velocity;
      let maxVelocity = 50;

      // let yVelocity = (ballVelocity.y) * (-1.1);

    if(event.pairs[0].bodyB.id === 27 || event.pairs[0].bodyB.id === 29) {
      freezePaddle(event.pairs[0].bodyA);
    } else if (event.pairs[0].bodyA.label === 'topCircle') {
      updateScore(10);
      Matter.Body.setVelocity(event.pairs[0].bodyB, {
				x: Math.max(Math.min(ballVelocity.x, maxVelocity), -maxVelocity),
				y: Math.max(Math.min(ballVelocity.y, maxVelocity), -maxVelocity),
			});
      body = event.pairs[0].bodyA.render;
      body.fillStyle = '#B09150';
      setTimeout(function() {
        body.fillStyle = "#5C43B5";}, 100);
      } else if (event.pairs[0].bodyA.label === 'launchpad') {
        updateScore(5);
        Matter.Body.setVelocity(event.pairs[0].bodyB, {
          x: Math.max(Math.min(ballVelocity.x, maxVelocity), -maxVelocity),
          y: Math.max(Math.min(ballVelocity.y, maxVelocity), -maxVelocity),
        });
        body = event.pairs[0].bodyA.render;
        body.fillStyle = '#B09150';
        setTimeout(function() {
          body.fillStyle = "#A9D2F0";}, 100);
      }
    });
  }

  function freezePaddle(paddle) {
    Matter.Sleeping.set(paddle, true);
  }

  function updateScore(points) {
    score += points;
    let displayScore = document.getElementById('score');
    let displayHighScore = document.getElementById('high-score');
    displayScore.classList.add('update');
    
    displayScore.innerHTML = score;
    displayScore.addEventListener('transitionend', removeTransition);

    if (score > highScore) {
      highScore = score;
      displayHighScore.classList.add('update');
      displayHighScore.innerHTML = highScore;
      displayHighScore.addEventListener('transitionend', removeTransition);
    }
  }

  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('update');
    this.classList.remove('lose-ball');
  }

  function firePaddle(e) {
    let keyCode = e.keyCode;
    if (keyCode === 37 && leftPaddle.isSleeping === false && leftFired === false) {
      leftFired = true;
      Matter.Body.setAngularVelocity(leftPaddle, -1);
    } else if (keyCode === 39 && rightPaddle.isSleeping === false && rightFired === false) {
      rightFired = true;
      Matter.Body.setAngularVelocity(rightPaddle, 1);
    }
  }

  function releasePaddle(e) {
    let keyCode = e.keyCode;
    if (keyCode === 37 ) {
      leftFired = false;
      leftPaddle.isSleeping = false;
    } else if (keyCode === 39) {
      rightFired = false;
      rightPaddle.isSleeping = false;
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
    document.addEventListener("keydown", function keyDown(e) {
      firePaddle(e);
    }
  );
    document.addEventListener("keyup", function keyUp(e) {
      releasePaddle(e);
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
    document.getElementById('score').removeEventListener('transitionend', removeTransition);
    document.getElementById('high-score').removeEventListener('transitionend', removeTransition);
    document.getElementById('ball-count').removeEventListener('transitionend', removeTransition);
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

# Pinball Wizard

## Background

Pinball Wizard is a modern JS take on an arcade classic. Users will be able to compete against themselves to keep the ball rolling and surpass their high score.

As their score continues to climb, the user will begin to notice hidden features of the game (like multi-ball/double points balls). The controls will be very simple, just up-arrow to launch the ball, left/right arrows to move paddles, and spacebar to pause the game.

Check out the live version [here.](https://fishshiz.github.io/pinball-wizard/)

## Technology Overview

I built Pinball Wizard in about 5 days. It was a great exercise in gaining understanding and experience in Matter.js and physics libraries. The whole game is built using Javascript, with ball and paddle physics handled by Matter.js and rendering via HTML5 canvas.

## Pinball Monitoring

One of the significant challenges that I faced in this project was managing multiple asynchronous event listeners to keep track of the state of the pinball. It was the single threaded nature of JavaScript that made this a challenge. I ultimately solved this by appending the necessary functions onto a keyup event listener that I was already using to monitor key commands controlling paddle movement. By using a boolean variable along with my ball tracking method, I was able to invoke it just once per round, checking for ball position on an interval throughout the stint of that round.

```document.addEventListener("keyup", function keUp(e) {
  let keyCode = e.keyCode;
  if (keyCode === 37 ) {
    leftFired = false;
    engine.world.bodies[17].isSleeping = true;
  } else if (keyCode === 39) {
    rightFired = false;
    engine.world.bodies[19].isSleeping = true;
  }
  if (ballCount > 0) {
    launch();
    if (listening === false) {
      ballOut();
    }
  }
}
```
In the above snippet, I tie the my monitoring function (ballOut) to my key up listener.

```if (inPlay) {
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
```
And here I fire my setInterval just once, thanks to a boolean variable (listening).

## Paddle Motions

The most difficult part of this project was figuring out how to get my paddles to move correctly, like paddles on a real pinball table. I still have a lot of work to do on this, but I've already taken care of a few of the aspects. I am currently moving paddles by setting their angular velocity on a keyDown event. Initially, they would fire multiple times if the key was held down. I fixed this by adding in a boolean variable to be toggled by a paddle movement, and then only fire that paddle on the condition of that boolean. I have also added Invisible barriers to try to sandwich the paddles to a specific range, and am working on collision filtering to make this approach work well.

## Future Implements

I plan to add several bonus scoring features in the future, more accurate collision detection, and cleaner graphics and animations on the game.

## Functionality & MVPS

In Pinball Wizard, the user will be able to:

- [ ] Manipulate the paddles to hit the ball
- [ ] See their current and high scores displayed
- [ ] Play with an environment that emulates real world physics

## Wireframes

The application will live on a single screen. In addition to the main board, I will have a separate modal to display the controls, links to my github/linkedin, and a scoreboard modal.

Different features of the board will be worth different points. Each of the circles is worth 10 pts, except for the middle, which is worth 20 pts. The 2 bumpers near the paddles are worth 5 pts each. After reaching 250 pts, the user gets bonus balls, where a flurry of extra balls come into play from the chute delpoyer. At 500pts, the current ball turns colors, and every feature that it hits earns twice the points. This cycle conitnues every 250 points scored.

![wireframes](https://imgur.com/Vx6w7pw.png)

## Technologies

For Pinball Wizard, I plan to use Vanilla JS for overall structure and functionality, HTML 5 Canvas for board rendering, Matter.Js for game physics and Webpack for app organization.

In addition to the Webpack entry file, my project will also have the following JS scripts.

`board.js` will define the boundaries and interactive objects on the board.
`ball.js` will deal with the physics/movement of the ball.
`game.js` will keep track of game rules, scoreboard etc.

## Timeline

**Over the weekend**:
- [ ] Read up on Matter.Js, do enough of their tutorials to feel comfortable with moving bodies around
- [ ] Start on the project skeleton/webpack/NPM/etc.

**Day 1**: Finish up the project skeleton. Start to draw the shapes for my game board.  Goals for the day:

- [ ] Get `webpack` serving files and frame out index.html
- [ ] Draw some of my initial shapes, the ball and paddle pieces.
- [ ] Start to tinker with Matter.Js to create ball physics.

**Day 2**: Complete my board. Try to get my paddles working with my ball.

- [ ] Complete the board.js module with all shapes
- [ ] Get certain objects to light up/affect velocity on impact
- [ ] Try to get my paddle pivots working

**Day 3**: Finish the paddle/ball mechanics, start the game logic.

- [ ] Get the paddles to change direction/velocity of the ball correctly
- [ ] Introduce logic for updating, maintaing score/hish score in game.js
- [ ] Introduce logic for ball "lives"

**Day 4**: Finish game logic, Introduce bonus features, finish styling.

- [ ] Finish score, life logic
- [ ] Tie movement to keyboard controls
- [ ] Add on multi-ball and bonus ball mode
- [ ] Style the board/modals

**Bonus**

- [ ] Unlock bonus score features by surpassing certain scores

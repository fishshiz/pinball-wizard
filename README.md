# Pinball Wizard

## Background

Pinball Wizard is a modern JS take on an arcade classic. Users will be able to compete against themselves to keep the ball rolling and surpass their high score.

As their score continues to climb, the user will begin to notice hidden features of the game (like multiball/double points balls). The controls will be very simple, just up-arrow to launch the ball, left/right arrows to move paddles, and spacebar to pause the game.

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

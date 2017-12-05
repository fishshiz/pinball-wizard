import Board from './app/assets/javascripts/board';

let Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
Constraint = Matter.Constraint;

var engine;
var world;

function setup() {
  // create an engine
  engine = Engine.create();
  // create a renderer
  let render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: 550,
        height: 650,
        wireframes: false
      }
  });
  world = engine.world;
  World.add(engine.world, Board);

  Engine.run(engine);
}

document.addEventListener("DOMContentLoaded", function(){

  setup();



  // add all of the bodies to the world




});

document.addEventListener("DOMContentLoaded", function(){
  // module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var circle = Bodies.circle(400, 300, 25, 80);
var ground = Bodies.rectangle(190, 610, 380, 60, { isStatic: true });
var ground1 = Bodies.rectangle(620, 610, 380, 60, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [circle, ground, ground1]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
});

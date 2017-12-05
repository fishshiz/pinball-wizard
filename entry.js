document.addEventListener("DOMContentLoaded", function(){
  let Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

  // create an engine
  let engine = Engine.create();

    const DOME_POINTS =
    '0 0 0 235 65.15 201.21 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 500 196.1 550 230 550 144.71 550 144.71 550 0 0 0';

// "M0,0V201.21H65.15c0-79.92,94-144.71,209.85-144.71s209.85,64.79,209.85,144.71H550V0Z"

  function domeShape(x, y) {
    let verts = Matter.Vertices.fromPath(DOME_POINTS);
    return Bodies.fromVertices(x, y, verts, { isStatic: true });
  }

  // create two boxes and a ground
  let circle = Bodies.circle(500, 200, 15, 80);
  let circle1 = Bodies.circle(255, 120, 30, { isStatic: true });
  let circle2 = Bodies.circle(200, 200, 30, { isStatic: true });
  let circle3 = Bodies.circle(310, 200, 30, { isStatic: true });
  let side = domeShape(255, 50);
  let rightWall = Bodies.rectangle(0, 325, 650, 20, { angle: Math.PI / 2, isStatic: true });
  let leftWall = Bodies.rectangle(550, 325, 650, 20, { angle: Math.PI / 2, isStatic: true });
  let ballChute = Bodies.rectangle(490, 455, 400, 20, { angle: Math.PI / 2, chamfer: { radius: 10 }, isStatic: true });
  let leftPaddleWallSlant = Bodies.rectangle(105, 490, 110, 20, { angle: (Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  let leftPaddleWallVert = Bodies.rectangle(63, 415, 120, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true });
  let leftPaddle = Bodies.rectangle(200, 545, 100, 20, { angle: (Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  let rightPaddleWallSlant = Bodies.rectangle(395, 490, 110, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  let rightPaddleWallVert = Bodies.rectangle(435, 415, 120, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true });
  let rightPaddle = Bodies.rectangle(305, 545, 100, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  let baseLeft = Bodies.rectangle(100, 550, 280, 20, { angle: Math.PI/6, chamfer: { radius: 10 }, isStatic: true });
  let baseRight = Bodies.rectangle(390, 565, 230, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
console.log(side);
console.log(circle);
  // add all of the bodies to the world
  World.add(engine.world, [side, circle, circle1, circle2, circle3, baseLeft, leftPaddle, leftPaddleWallSlant, leftPaddleWallVert, rightPaddle, rightPaddleWallSlant, rightPaddleWallVert, baseRight, rightWall, leftWall, ballChute]);

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

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);

});
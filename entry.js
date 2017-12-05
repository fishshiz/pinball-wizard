document.addEventListener("DOMContentLoaded", function(){
  let Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies;

  // create an engine
  let engine = Engine.create();

    const DOME_POINTS =
    'M481.74,0H55V181.11h59.1C121.06,120,190.1,72,274.26,72s153.2,48,160.16,109.13h47.32Z';


  function domeShape(x, y) {
    let verts = Matter.Vertices.fromPath(DOME_POINTS);
    return Bodies.fromVertices(x, y, verts, { isStatic: true });
  }

  // create two boxes and a ground
  let circle = Bodies.circle(200, 200, 15, 80);
  // let side = domeShape(330, 500);
  let rightWall = Bodies.rectangle(0, 325, 650, 20, { angle: Math.PI / 2, isStatic: true });
  let leftWall = Bodies.rectangle(550, 325, 650, 20, { angle: Math.PI / 2, isStatic: true });
  let ballChute = Bodies.rectangle(465, 455, 400, 20, { angle: Math.PI / 2, chamfer: { radius: 10 }, isStatic: true });
  let leftPaddleWallSlant = Bodies.rectangle(100, 490, 110, 20, { angle: (Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  let leftPaddleWallVert = Bodies.rectangle(58, 385, 180, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true });
  let leftPaddle = Bodies.rectangle(195, 545, 100, 20, { angle: (Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  let rightPaddleWallSlant = Bodies.rectangle(370, 490, 110, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  let rightPaddleWallVert = Bodies.rectangle(410, 385, 180, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true });
  let rightPaddle = Bodies.rectangle(300, 545, 100, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  let ceiling = Bodies.rectangle(275, 0, 550, 20, { isStatic: true });
  let baseLeft = Bodies.rectangle(100, 550, 280, 20, { angle: Math.PI/6, chamfer: { radius: 10 }, isStatic: true });
  let baseRight = Bodies.rectangle(365, 565, 230, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });

  // add all of the bodies to the world
  World.add(engine.world, [circle, baseLeft, leftPaddle, leftPaddleWallSlant, leftPaddleWallVert, rightPaddle, rightPaddleWallSlant, rightPaddleWallVert, baseRight, rightWall, leftWall, ballChute, ceiling]);

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

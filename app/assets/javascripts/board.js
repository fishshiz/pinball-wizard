class Board {
  constructor() {
    let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint;
    // const DOME_POINTS =
    // '0 0 0 235 65.15 201.21 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 500 196.1 550 230 550 144.71 550 65.15 550 0 0 0';
  }
  // "M0,0V201.21H65.15c0-79.92,94-144.71,209.85-144.71s209.85,64.79,209.85,144.71H550V0Z"

  // domeShape(x, y) {
  //   let verts = Matter.Vertices.fromPath(DOME_POINTS);
  //   return Bodies.fromVertices(x, y, verts, { isStatic: true, render: { fillStyle: 'rgb(57, 30, 246)' } });
  // }

  circles() {
    let circle1 = Bodies.circle(255, 120, 30, { isStatic: true });
    let circle2 = Bodies.circle(180, 200, 30, { isStatic: true });
    let circle3 = Bodies.circle(330, 200, 30, { isStatic: true });
    return [circle1, circle2, circle3];
  }

  // create two boxes and a ground
  // let circle = Bodies.circle(285, 200, 15, 80);
  // let side = domeShape(255, 50);
  // let leftBumper = Bodies.trapezoid(140, 400, 40, 100, 0.5, { isStatic: true, angle: 5.9, chamfer: { radius: 10 } });
  // let leftThorn = Bodies.trapezoid(10, 280, 50, 50, 0.5, { isStatic: true, angle: (Math.PI) / 2, chamfer: { radius: 10 } });
  // let rightThorn = Bodies.trapezoid(475, 280, 50, 50, 0.5, { isStatic: true, angle: (3 * Math.PI) / 2, chamfer: { radius: 10 } });
  // let rightBumper = Bodies.trapezoid(350, 400, 40, 100, 0.5, { isStatic: true, angle: 0.6, chamfer: { radius: 10 } });
  // let leftWall = Bodies.rectangle(0, 325, 650, 20, { angle: Math.PI / 2, isStatic: true });
  // let rightWall = Bodies.rectangle(550, 325, 650, 20, { angle: Math.PI / 2, isStatic: true });
  // let ballChute = Bodies.rectangle(490, 455, 400, 20, { angle: Math.PI / 2, chamfer: { radius: 10 }, isStatic: true });
  // let leftPaddleWallSlant = Bodies.rectangle(105, 490, 110, 20, { angle: (Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  // let leftPaddleWallVert = Bodies.rectangle(63, 415, 120, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true });
  // let leftPaddle = Bodies.trapezoid(205, 545, 20, 70, 0.25, { angle: (2 * Math.PI)/3, chamfer: { radius: 10 }, isStatic: true });
  // let rightPaddleWallSlant = Bodies.rectangle(395, 490, 110, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  // let rightPaddleWallVert = Bodies.rectangle(435, 415, 120, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true });
  // let rightHinge = Bodies.circle(325, 533, 5, { isStatic: true, render: { fillStyle: 'red'}});
  // let rightPaddle = Bodies.trapezoid(305, 545, 20, 70, 0.25, { angle: (4 * Math.PI)/3, chamfer: { radius: 10 }});
  // let baseLeft = Bodies.rectangle(100, 550, 280, 20, { angle: Math.PI/6, chamfer: { radius: 10 }, isStatic: true });
  // let baseRight = Bodies.rectangle(390, 565, 230, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
  // let rightConstraint = Constraint.create({ bodyA: rightPaddle, bodyB: rightHinge, pointA: {x: 20, y: -11 }, stiffness: 0, length: 0 });

}

export default Board;

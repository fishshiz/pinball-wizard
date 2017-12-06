import Matter from 'Matter-js';

  const Bodies = Matter.Bodies;
  const Constraint = Matter.Constraint;

  export const circles = function circles() {
    let circle1 = Bodies.circle(235, 120, 30, { isStatic: true });
    let circle2 = Bodies.circle(146, 200, 30, { isStatic: true });
    let circle3 = Bodies.circle(323, 200, 30, { isStatic: true });
    let circle = Bodies.circle(285, 200, 15, 80);

    return [circle1, circle2, circle3, circle];
  };

  export const walls = function walls() {
    let leftWall = Bodies.rectangle(0, 325, 650, 20, { angle: Math.PI / 2, isStatic: true });
    let rightWall = Bodies.rectangle(550, 325, 650, 20, { angle: Math.PI / 2, isStatic: true });
    let ceiling = Bodies.rectangle(275, 0, 550, 20, { isStatic: true });
    let ballChute = Bodies.rectangle(490, 455, 400, 20, { angle: Math.PI / 2, chamfer: { radius: 10 }, isStatic: true });
    let baseLeft = Bodies.rectangle(90, 560, 220, 20, { angle: Math.PI/6, chamfer: { radius: 10 }, isStatic: true });
    let baseRight = Bodies.rectangle(400, 560, 220, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
    let leftDiag = Bodies.rectangle(120, 80, 350, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
    let rightDiag = Bodies.rectangle(400, 100, 380, 20, { angle: Math.PI/6, chamfer: { radius: 10 }, isStatic: true });

    return [leftWall, rightWall, ceiling, ballChute, baseLeft, baseRight, leftDiag, rightDiag];
  };

  export const innerWalls = function innerWalls() {
    let leftPaddleWallVert = Bodies.rectangle(60, 415, 120, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true });
    let leftPaddleWallSlant = Bodies.rectangle(100, 490, 110, 20, { angle: (Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });
    let rightPaddleWallVert = Bodies.rectangle(430, 415, 120, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true });
    let rightPaddleWallSlant = Bodies.rectangle(390, 490, 110, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true });

    return [leftPaddleWallVert, leftPaddleWallSlant, rightPaddleWallVert, rightPaddleWallSlant];
  };

  export const bumpers = function bumpers() {
    let leftBumper = Bodies.trapezoid(150, 400, 40, 100, 0.5, { isStatic: true, angle: 5.58505, chamfer: { radius: 10 } });
    let rightBumper = Bodies.trapezoid(340, 400, 40, 100, 0.5, { isStatic: true, angle: 0.698132, chamfer: { radius: 10 } });

    return [leftBumper, rightBumper];
  };

  export const thorns = function thorns() {
    let leftThorn = Bodies.trapezoid(10, 280, 50, 50, 0.5, { isStatic: true, angle: (Math.PI) / 2, chamfer: { radius: 10 } });
    let rightThorn = Bodies.trapezoid(475, 280, 50, 50, 0.5, { isStatic: true, angle: (3 * Math.PI) / 2, chamfer: { radius: 10 } });

    return [leftThorn, rightThorn];
  };

  export const paddles = function paddles() {
    let leftPaddle = Bodies.trapezoid(190, 540, 20, 70, 0.25, { angle: (2 * Math.PI)/3, chamfer: { radius: 10 }});
    let leftHinge = Bodies.circle(165, 533, 5, { isStatic: true, render: { fillStyle: 'red'}});
    let leftConstraint = Constraint.create({ bodyA: leftPaddle, bodyB: leftHinge, pointA: {x: -20, y: -11 }, stiffness: 0, length: 0 });
    let rightPaddle = Bodies.trapezoid(300, 540, 20, 70, 0.25, { angle: (4 * Math.PI)/3, chamfer: { radius: 10 }});
    let rightHinge = Bodies.circle(325, 533, 5, { isStatic: true, render: { fillStyle: 'red'}});
    let rightConstraint = Constraint.create({ bodyA: rightPaddle, bodyB: rightHinge, pointA: {x: 20, y: -11 }, stiffness: 0, length: 0 });

    return [leftPaddle, leftHinge, leftConstraint, rightPaddle, rightHinge, rightConstraint];
  };

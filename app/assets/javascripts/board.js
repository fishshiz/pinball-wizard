import Matter from 'Matter-js';

  const Bodies = Matter.Bodies;
  const Constraint = Matter.Constraint;
  const bufferGroup = Matter.Body.nextGroup(true);

  const COLORS = { WALLS: "#C4CFD4", INNERWALLS: "#608CBB", BUMPERS: "#A9D2F0", ORBS: "#5C43B5", PADDLE: "#f5a02e" };

  export const circles = function circles() {
    let circle1 = Bodies.circle(235, 120, 30, { label: 'topCircle', isStatic: true, render: { fillStyle: COLORS.ORBS } });
    let circle2 = Bodies.circle(146, 200, 30, { label: 'topCircle', isStatic: true, render: { fillStyle: COLORS.ORBS } });
    let circle3 = Bodies.circle(323, 200, 30, { label: 'topCircle', isStatic: true, render: { fillStyle: COLORS.ORBS } });

    return [circle1, circle2, circle3];
  };

  export const walls = function walls() {
    let leftWall = Bodies.rectangle(0, 325, 650, 20, { angle: Math.PI / 2, isStatic: true, render: { fillStyle: COLORS.WALLS } });
    let rightWall = Bodies.rectangle(550, 325, 650, 20, { angle: Math.PI / 2, isStatic: true, render: { fillStyle: COLORS.WALLS } });
    let ceiling = Bodies.rectangle(275, 0, 550, 20, { isStatic: true, render: { fillStyle: COLORS.WALLS } });
    let ballChute = Bodies.rectangle(490, 455, 400, 20, { angle: Math.PI / 2, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.WALLS } });
    let baseLeft = Bodies.rectangle(90, 560, 220, 20, { angle: Math.PI/6, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.WALLS } });
    let baseRight = Bodies.rectangle(400, 560, 220, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.WALLS } });
    let leftDiag = Bodies.rectangle(100, 0, 350, 200, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.WALLS } });
    let rightDiag = Bodies.rectangle(420, 0, 400, 200, { angle: Math.PI/6, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.WALLS } });

    return [leftWall, rightWall, ceiling, ballChute, baseLeft, baseRight, leftDiag, rightDiag];
  };

  export const innerWalls = function innerWalls() {
    let leftPaddleWallVert = Bodies.rectangle(60, 415, 120, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.INNERWALLS } });
    let leftPaddleWallSlant = Bodies.rectangle(100, 490, 110, 20, { angle: (Math.PI)/6, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.INNERWALLS } });
    let rightPaddleWallVert = Bodies.rectangle(430, 415, 120, 20, { angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.INNERWALLS } });
    let rightPaddleWallSlant = Bodies.rectangle(390, 490, 110, 20, { angle: (5 * Math.PI)/6, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.INNERWALLS } });

    return [leftPaddleWallVert, leftPaddleWallSlant, rightPaddleWallVert, rightPaddleWallSlant];
  };

  export const bumpers = function bumpers() {
    let leftBumper = Bodies.trapezoid(150, 400, 40, 100, 0.5, { isStatic: true, angle: 5.58505, chamfer: { radius: 10 }, render: { fillStyle: COLORS.BUMPERS } });
    let leftLaunchPad = Bodies.rectangle(155, 386, 5, 95, { label: 'launchpad', isStatic: true, angle: 5.47805, chamfer: { radius: 2 }, render: { fillStyle: COLORS.BUMPERS } });
    let rightBumper = Bodies.trapezoid(340, 400, 40, 100, 0.5, { isStatic: true, angle: 0.698132, chamfer: { radius: 10 }, render: { fillStyle: COLORS.BUMPERS } });
    let rightLauchPad = Bodies.rectangle(335, 386, 5, 95, { label: 'launchpad', isStatic: true, angle: 0.810132, chamfer: { radius: 2 }, render: { fillStyle: COLORS.BUMPERS } });

    return [leftBumper, rightBumper, leftLaunchPad, rightLauchPad];
  };

  export const thorns = function thorns() {
    let leftThorn = Bodies.trapezoid(10, 280, 50, 50, 0.5, { isStatic: true, angle: (Math.PI) / 2, chamfer: { radius: 10 }, render: { fillStyle: COLORS.WALLS } });
    let rightThorn = Bodies.trapezoid(475, 280, 50, 50, 0.5, { isStatic: true, angle: (3 * Math.PI) / 2, chamfer: { radius: 10 }, render: { fillStyle: COLORS.WALLS } });

    return [leftThorn, rightThorn];
  };

  export const ballHatch = function ballHatch() {
    let hatch = Bodies.rectangle(490, 210, 130, 20, { label: 'hatch', angle: (Math.PI)/2, chamfer: { radius: 10 }, isStatic: true, render: { fillStyle: COLORS.WALLS }});

    return [hatch];
  };

  export const paddles = function paddles() {
    let leftPaddle = Bodies.trapezoid(190, 540, 25, 80, 0.25, { label: 'leftPaddle', angle: (2 * Math.PI)/3, chamfer: { radius: 10 }, isSleeping: false, render: { fillStyle: COLORS.PADDLE }});
   let leftHinge = Bodies.circle(172, 529, 5, { isStatic: true});
   let leftConstraint = Constraint.create({ bodyA: leftPaddle, bodyB: leftHinge, pointA: {x: -18, y: -11 }, stiffness: 0, length: 0 });
   let leftBlock = Bodies.rectangle(200, 550, 30, 30, { isStatic: false, render: {visible: false}});
   let leftWeight = Constraint.create({ bodyA: leftPaddle, bodyB: leftBlock, pointA: {x: 13, y: 11 }, stiffness: 1, length: 1, render: {visible: false} });

   let rightPaddle = Bodies.trapezoid(300, 540, 25, 80, 0.25, { label: 'rightPaddle', angle: (4 * Math.PI)/3, chamfer: { radius: 10 },  isSleeping: false, render: { fillStyle: COLORS.PADDLE }});
   let rightHinge = Bodies.circle(318, 529, 5, { isStatic: true});
   let rightConstraint = Constraint.create({ bodyA: rightPaddle, bodyB: rightHinge, pointA: {x: 18, y: -11 }, stiffness: 0, length: 0 });
   let rightBlock = Bodies.rectangle(290, 550, 30, 30, { isStatic: false, render: {visible: false}});
   let rightWeight = Constraint.create({ bodyA: rightPaddle, bodyB: rightBlock, pointA: {x: -13, y: 11 }, stiffness: 1, length: 1, render: {visible: false} });
   
   let leftBuffer = Bodies.circle(190, 605, 50, { label: 'buffer', isStatic: true, render: { visible: false }});
   let leftTopBuffer = Bodies.circle(190, 450, 50, { label: 'buffer', isStatic: true, render: { visible: false }});
   let rightBuffer = Bodies.circle(300, 605, 50, { label: 'buffer', isStatic: true, render: { visible: false }});
   let rightTopBuffer = Bodies.circle(300, 450, 50, { label: 'buffer', isStatic: true, render: { visible: false }});

    return [leftPaddle, leftWeight, leftHinge, leftBlock, leftConstraint, rightPaddle, rightWeight, rightBlock, rightHinge, rightConstraint, leftBuffer, rightBuffer, leftTopBuffer, rightTopBuffer];
  };

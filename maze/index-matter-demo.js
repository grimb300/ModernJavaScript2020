const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse
} = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width: width,
    height: height 
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

World.add(world, MouseConstraint.create(engine, {
  mouse: Mouse.create(render.canvas)
}));

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),      // top
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }), // bottom
  Bodies.rectangle(0, height / 2,  40, height, { isStatic: true }),   // left
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }) // right
];
World.add(world, walls);

// Shapes
for (let i = 0; i < 50; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(
        Math.random() * width,
        Math.random() * height,
        50,
        50,
        {
          render: {
            fillStyle: 'pink'
          }
        }
      )
    );
  } else {
    World.add(
      world,
      Bodies.circle(
        Math.random() * width,
        Math.random() * height,
        35,
        {
          render: {
            fillStyle: 'purple'
          }
        }
      )
    );
  }
}
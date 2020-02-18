const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

// TODO: For some reason innerWidth/Height doesn't match
// what the body width/height is, so I have to shave a bit off of each.
// Figure out why this is.
const width = window.innerWidth - 1;
const height = window.innerHeight - 5;

// TODO: Add a variable to create different difficulties (easy, medium, hard)
// that will change the number of rows/cols automatically.
// Also add the ability to handle different aspect ratios (portrait, landscape, square)
const numRows = 10;
const numCols = 14;

const unitWidth = width / numCols;
const unitHeight = height / numRows;

const engine = Engine.create();
engine.world.gravity.y = 0;
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

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 20, { isStatic: true }), // top
  Bodies.rectangle(width / 2, height, width, 20, { isStatic: true }), // bottom
  Bodies.rectangle(0, height / 2, 20, height, { isStatic: true }), // left
  Bodies.rectangle(width, height / 2, 20, height, { isStatic: true }) // right
];
World.add(world, walls);

// Build the Maze
const grid = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
const verticals = Array(numRows)
  .fill(null)
  .map(() => Array(numCols - 1).fill(false));
const horizontals = Array(numRows - 1)
  .fill(null)
  .map(() => Array(numCols).fill(false));

const startRow = Math.floor(Math.random() * numRows);
const startCol = Math.floor(Math.random() * numCols);

const myStepThroughCell = (cellRow, cellCol) => {
  // console.log(`Stepping through ${cellRow}, ${cellCol}`);
  // If we've already visited this cell, return
  if (grid[cellRow][cellCol]) return;

  // Mark this cell as visited
  grid[cellRow][cellCol] = true;

  // Create random-ordered list of neighbors
  const neighbors = [
    { row: cellRow - 1, col: cellCol },
    { row: cellRow + 1, col: cellCol },
    { row: cellRow, col: cellCol - 1 },
    { row: cellRow, col: cellCol + 1 }
  ].sort(() => Math.random() * 2 - 1);

  // console.log(neighbors);

  // For each neighbor...
  neighbors.forEach((neighbor) => {
    // console.log(`Checking neighbor at ${neighbor.row}, ${neighbor.col}`);
    // Check if neighbor is in bounds
    if (
      neighbor.row < 0 ||
      neighbor.row >= numRows ||
      neighbor.col < 0 ||
      neighbor.col >= numCols
    )
      return;

    // If that neighbor has already been visited continue to next neighbor
    if (grid[neighbor.row][neighbor.col]) return;

    // Remove wall between current cell and neighbor
    if (cellRow === neighbor.row) {
      // console.log('Removing vertical');
      verticals[cellRow][Math.min(cellCol, neighbor.col)] = true;
    } else {
      // console.log('Removing horizontal');
      horizontals[Math.min(cellRow, neighbor.row)][cellCol] = true;
    }

    // Visit next cell
    myStepThroughCell(neighbor.row, neighbor.col);
  });
};

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const stepThroughCell = (row, col) => {
  // If we've already visited this cell, return
  if (grid[row][col]) {
    return;
  }

  // Mark this cell as visited
  grid[row][col] = true;

  // Create random-ordered list of neighbors
  const neighbors = shuffle([
    [ row - 1, col, 'up' ], // above
    [ row, col + 1, 'right' ], // right
    [ row + 1, col, 'down' ], // below
    [ row, col - 1, 'left' ] // left
  ]);

  // For each neighbor...
  for (let neighbor of neighbors) {
    const [ nextRow, nextCol, direction ] = neighbor;

    // Check if neighbor is in bounds
    if (
      nextRow < 0 ||
      nextRow >= numRows ||
      nextCol < 0 ||
      nextCol >= numCols
    ) {
      continue;
    }

    // If that neighbor has already been visited continue to next neighbor
    if (grid[nextRow][nextCol]) {
      continue;
    }

    // Remove wall between current cell and neighbor
    if (direction === 'left') {
      verticals[row][col - 1] = true;
    } else if (direction === 'right') {
      verticals[row][col] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][col] = true;
    } else {
      // direction === 'down'
      horizontals[row][col] = true;
    }

    // Visit next cell
    stepThroughCell(nextRow, nextCol);
  }
};

stepThroughCell(startRow, startCol);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitWidth + unitWidth / 2,
      rowIndex * unitHeight + unitHeight,
      unitWidth,
      10,
      {
        label: 'Wall',
        isStatic: true,
        render: {
          fillStyle: 'red'
        }
      }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitWidth + unitWidth,
      rowIndex * unitHeight + unitHeight / 2,
      10,
      unitHeight,
      {
        label: 'Wall',
        isStatic: true,
        render: {
          fillStyle: 'red'
        }
      }
    );
    World.add(world, wall);
  });
});

// Goal
const goal = Bodies.rectangle(
  width - unitWidth / 2,
  height - unitHeight / 2,
  unitWidth * 0.7,
  unitHeight * 0.7,
  {
    label: 'Goal',
    isStatic: true,
    render: {
      fillStyle: 'green'
    }
  }
);
World.add(world, goal);

// Ball
const ballRadius = Math.min(unitWidth, unitHeight) / 4;
const ball = Bodies.circle(unitWidth / 2, unitHeight / 2, ballRadius, {
  label: 'Ball',
  render: {
    fillStyle: 'blue'
  }
});
World.add(world, ball);

document.addEventListener('keydown', (event) => {
  const { x, y } = ball.velocity;

  if (event.keyCode === 87) {
    // w === up
    Body.setVelocity(ball, { x, y: y - 5 });
  }
  if (event.keyCode === 83) {
    // s === down
    Body.setVelocity(ball, { x, y: y + 5 });
  }
  if (event.keyCode === 65) {
    // a === left
    Body.setVelocity(ball, { x: x - 5, y });
  }
  if (event.keyCode === 68) {
    // d === right
    Body.setVelocity(ball, { x: x + 5, y });
  }
});

// Win Condition
Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach((collision) => {
    // This makes the if statement detecting the collision a bit shorter and easier to read
    const labels = [ 'Ball', 'Goal' ];

    // If there is a collision between the Ball and Goal
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      // TODO: Add button to restart game
      // Turn gravity back on
      world.gravity.y = 1;

      // And make all Walls collapse to the bottom of the screen
      world.bodies.forEach((body) => {
        if (body.label === 'Wall') {
          Body.setStatic(body, false);
        }
      });

      // Finally, show the win message
      document.querySelector('.winner').classList.remove('hidden');
    }
  });
});

/////////////////
// My render loop
/////////////////
// // Add the verticals and horizontals to the World
// const cellWidth = width / 3;
// const cellHeight = height / 3;
// const verticalWidth = 40;
// const verticalHeight = cellHeight;
// const horizontalWidth = cellWidth;
// const horizontalHeight = 40;
// for (let row = 0; row < verticals.length; row++) {
//   for (let col = 0; col < verticals[row].length; col++) {
//     if (verticals[row][col]) continue;
//     const xPos = cellWidth * (col + 1);
//     const yPos = (verticalHeight / 2) + (cellHeight * row);
//     World.add(world, Bodies.rectangle(xPos, yPos, verticalWidth, verticalHeight, { isStatic: true }));
//   }
// }
// for (let row = 0; row < horizontals.length; row++) {
//   for (let col = 0; col < horizontals[row].length; col++) {
//     if (horizontals[row][col]) continue;
//     const xPos = (horizontalWidth / 2) + (cellWidth * col);
//     const yPos = cellHeight * (row + 1);
//     World.add(world, Bodies.rectangle(xPos, yPos, horizontalWidth, horizontalHeight, { isStatic: true }));
//   }
// }

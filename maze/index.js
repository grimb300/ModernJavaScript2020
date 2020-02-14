const {
  Engine,
  Render,
  Runner,
  World,
  Bodies
} = Matter;

const width = 600;
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

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),      // top
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }), // bottom
  Bodies.rectangle(0, height / 2,  40, height, { isStatic: true }),   // left
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }) // right
];
World.add(world, walls);

// Build the Maze
const numRows = 3;
const numCols = 3;
const grid = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
const verticals = Array(numRows).fill(null).map(() => Array(numCols - 1).fill(false));
const horizontals = Array(numRows - 1).fill(null).map(() => Array(numCols).fill(false));

const startRow = Math.floor(Math.random() * numRows);
const startCol = Math.floor(Math.random() * numCols);

const stepThroughCell = (cellRow, cellCol) => {
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
  neighbors.forEach(neighbor => {
    // console.log(`Checking neighbor at ${neighbor.row}, ${neighbor.col}`);
    // Check if neighbor is in bounds
    if (neighbor.row < 0 || neighbor.row >= numRows || neighbor.col < 0 || neighbor.col >= numCols) return;

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
    stepThroughCell(neighbor.row, neighbor.col);
  });
};

stepThroughCell(startRow, startCol);

// Add the verticals and horizontals to the World
const cellWidth = width / 3;
const cellHeight = height / 3;
const verticalWidth = 40;
const verticalHeight = cellHeight;
const horizontalWidth = cellWidth;
const horizontalHeight = 40;
for (let row = 0; row < verticals.length; row++) {
  for (let col = 0; col < verticals[row].length; col++) {
    if (verticals[row][col]) continue;
    const xPos = cellWidth * (col + 1);
    const yPos = (verticalHeight / 2) + (cellHeight * row);
    World.add(world, Bodies.rectangle(xPos, yPos, verticalWidth, verticalHeight, { isStatic: true }));
  }
}
for (let row = 0; row < horizontals.length; row++) {
  for (let col = 0; col < horizontals[row].length; col++) {
    if (horizontals[row][col]) continue;
    const xPos = (horizontalWidth / 2) + (cellWidth * col);
    const yPos = cellHeight * (row + 1);
    World.add(world, Bodies.rectangle(xPos, yPos, horizontalWidth, horizontalHeight, { isStatic: true }));
  }
}
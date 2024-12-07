const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const guardMatrix = INPUT.trim()
  .split('\n')
  .map((row) => row.trim().split(''));

const directions = {
  North: {
    move: [-1, 0],
    symbol: '^',
    nextDirection: 'East',
  },
  East: {
    move: [0, 1],
    symbol: '>',
    nextDirection: 'South',
  },
  South: {
    move: [1, 0],
    symbol: 'v',
    nextDirection: 'West',
  },
  West: {
    move: [0, -1],
    symbol: '<',
    nextDirection: 'North',
  },
};

const guardStartPosition = (guardMatrix) => {
  for (let i = 0; i < guardMatrix.length; i++) {
    for (let j = 0; j < guardMatrix[i].length; j++) {
      if (guardMatrix[i][j] === '^') {
        return [i, j];
      }
    }
  }
};

const countDistinctGuardMoves = (matrix) => {
  let output = new Set();
  let currentDirection = 'North';
  let [row, col] = guardStartPosition(matrix);
  output.add(`${row},${col}`);

  while (true) {
    const nextRow = row + directions[currentDirection].move[0];
    const nextCol = col + directions[currentDirection].move[1];

    if (
      nextRow < 0 ||
      nextRow >= matrix.length ||
      nextCol < 0 ||
      nextCol >= matrix[0].length
    ) {
      return output.size;
    }

    if (matrix[nextRow][nextCol] === '#') {
      currentDirection = directions[currentDirection].nextDirection;
      continue;
    }

    row = nextRow;
    col = nextCol;
    output.add(`${row},${col}`);
  }
};

console.log(countDistinctGuardMoves(guardMatrix));

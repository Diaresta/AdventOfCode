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

const isGuardLoop = (matrix, guardStart) => {
  let output = new Set();
  let currentDirection = 'North';
  let [row, col] = guardStart;

  while (true) {
    if (output.has(`${row},${col},${currentDirection}`)) {
      return true;
    }

    output.add(`${row},${col},${currentDirection}`);
    const nextRow = row + directions[currentDirection].move[0];
    const nextCol = col + directions[currentDirection].move[1];

    if (
      nextRow < 0 ||
      nextRow >= matrix.length ||
      nextCol < 0 ||
      nextCol >= matrix[0].length
    ) {
      return false;
    }

    if (matrix[nextRow][nextCol] === '#' || matrix[nextRow][nextCol] === '0') {
      currentDirection = directions[currentDirection].nextDirection;
      continue;
    }

    row = nextRow;
    col = nextCol;
  }
};

const countLoops = (matrix) => {
  let output = 0;
  const guardStart = guardStartPosition(matrix);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === '.') {
        let matrixCopy = matrix.map((row) => [...row]);
        matrixCopy[i][j] = '0';

        if (isGuardLoop(matrixCopy, guardStart)) {
          output++;
        }
      }
    }
  }

  return output;
};

console.log(countLoops(guardMatrix));

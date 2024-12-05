const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const wordSearch = INPUT.trim().split('\n');

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];
let output = 0;

const loopThroughWordSearch = (DIRECTIONS, wordSearch) => {
  for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[0].length; j++) {
      for (let [rowNext, colNext] of DIRECTIONS) {
        if (xmasFound(i, j, rowNext, colNext, wordSearch)) {
          output++;
        }
      }
    }
  }

  return output;
};

const xmasFound = (rowStart, colStart, rowNext, colNext, wordSearch) => {
  for (let i = 0; i < 'XMAS'.length; i++) {
    const searchRow = rowStart + i * rowNext;
    const newCol = colStart + i * colNext;

    if (
      searchRow < 0 ||
      searchRow >= wordSearch.length ||
      newCol < 0 ||
      newCol >= wordSearch[0].length ||
      wordSearch[searchRow][newCol] !== 'XMAS'[i]
    ) {
      return false;
    }
  }

  return true;
};

console.log(loopThroughWordSearch(DIRECTIONS, wordSearch));

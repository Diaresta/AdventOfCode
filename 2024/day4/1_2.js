const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const wordSearch = INPUT.trim().split('\n');

let output = 0;

const loopThroughWordSearchX = (wordSearch) => {
  for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[i].length; j++) {
      if (wordSearch[i][j] === 'A') {
        let diagonalUp =
          (wordSearch[i + 1]?.[j + 1] === 'M' &&
            wordSearch[i - 1]?.[j - 1] === 'S') ||
          (wordSearch[i - 1]?.[j - 1] === 'M' &&
            wordSearch[i + 1]?.[j + 1] === 'S');

        let diagonalDown =
          (wordSearch[i + 1]?.[j - 1] === 'M' &&
            wordSearch[i - 1]?.[j + 1] === 'S') ||
          (wordSearch[i - 1]?.[j + 1] === 'M' &&
            wordSearch[i + 1]?.[j - 1] === 'S');

        if (diagonalUp && diagonalDown) {
          output++;
        }
      }
    }
  }

  return output;
};

console.log(loopThroughWordSearchX(wordSearch));

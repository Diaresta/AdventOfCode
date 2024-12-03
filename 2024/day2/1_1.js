const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const LIST_LINES = INPUT.trim().split('\n');

let output = 0;
let level;
let isDecreasing;
let distance;

let isLevelSafe = (input) => {
  input.forEach((i) => {
    level = i.split(/\s+/).map(Number);
    isDecreasing = level[1] < level[0];

    for (let i = 0; i < level.length - 1; i++) {
      distance = level[i + 1] - level[i];

      if (
        distance === 0 ||
        distance < -3 ||
        distance > 3 ||
        isDecreasing != distance < 0
      ) {
        return;
      }
    }

    output++;
  });

  return output;
};

console.log(isLevelSafe(LIST_LINES));

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const LIST_LINES = INPUT.trim().split('\n');

let output = 0;
let levels = LIST_LINES.map((i) => i.split(/\s+/).map(Number));
let isDecreasing;
let distance;

let isLevelSafe = () => {
  levels.forEach((level) => {
    for (let i = 0; i < level.length; i++) {
      let removeIndex = [...level.slice(0, i), ...level.slice(i + 1)];

      if (isDampened(removeIndex)) {
        output++;
        break;
      }
    }
  });

  return output;
};

let isDampened = (input) => {
  isDecreasing = input[1] < input[0];

  return input.slice(1).every((level, i) => {
    distance = level - input[i];

    return (
      distance !== 0 &&
      distance >= -3 &&
      distance <= 3 &&
      isDecreasing === distance < 0
    );
  });
};

console.log(isLevelSafe(LIST_LINES));

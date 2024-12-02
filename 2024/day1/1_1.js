const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const LIST_LINES = INPUT.trim().split('\n');

let leftList = [];
let rightList = [];

const formatInput = (LIST_LINES) => {
  LIST_LINES.forEach((i) => {
    const [left, right] = i.split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
  });
};

const sortInputs = (leftList, rightList) => {
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);
};

const totalDistance = (leftList, rightList) => {
  formatInput(LIST_LINES);
  sortInputs(leftList, rightList);
  let output = 0;

  leftList.forEach((left, i) => {
    const right = rightList[i];
    if (left >= right) {
      output += Math.abs(left - right);
    } else {
      output += Math.abs(right - left);
    }
  });

  return output;
};

console.log(totalDistance(leftList, rightList));

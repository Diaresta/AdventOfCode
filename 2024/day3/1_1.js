const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const INPUT = fs.readFileSync(filePath, 'utf-8');

const findMulMatches = (input) => {
  const regex = /mul\(\d+,\d+\)/g;
  return input.match(regex);
};

const multiplyMatches = (input) => {
  const mulNumbers = findMulMatches(input);
  let output = 0;

  mulNumbers.map((match) => {
    let matchNumbers = match.match(/\d+/g);

    output += parseInt(matchNumbers[0]) * parseInt(matchNumbers[1]);
  });

  return output;
};

console.log(multiplyMatches(INPUT));

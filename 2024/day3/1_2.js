const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const INPUT = fs.readFileSync(filePath, 'utf-8');

const findMulMatches = (input) => {
  let mulMatches = [];
  let isMatch = true;
  const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
  const formattedInput = input.match(regex);

  formattedInput.forEach((i) => {
    if (i === 'do()') {
      isMatch = true;
    } else if (i === "don't()") {
      isMatch = false;
    } else if (i !== 'do()' && i !== "don't()" && isMatch) {
      mulMatches.push(i);
    }
  });

  return mulMatches;
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

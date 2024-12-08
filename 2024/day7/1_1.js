const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const bridgeOperations = INPUT.trim().split('\n');

const checkCombinations = (numbersToCalculate, target) => {
  for (let i = 0; i < Math.pow(2, numbersToCalculate.length - 1); i++) {
    let result = numbersToCalculate[0];
    let operationLoop = i;

    for (let j = 0; j < numbersToCalculate.length - 1; j++) {
      const operation = operationLoop % 2;
      operationLoop = Math.floor(operationLoop / 2);

      if (operation === 0) {
        result += numbersToCalculate[j + 1];
      } else {
        result *= numbersToCalculate[j + 1];
      }
    }

    if (result === target) {
      return true;
    }
  }

  return false;
};

const formatBridgeOperations = (bridgeOperations) => {
  let output = 0;

  bridgeOperations.forEach((line) => {
    const [target, numbersToCalculate] = line.split(':');
    const targetNum = Number(target);
    const formatNumbersToCalculate = numbersToCalculate
      .trim()
      .split(/\s+/)
      .map(Number);

    if (checkCombinations(formatNumbersToCalculate, targetNum)) {
      output += targetNum;
    }
  });

  return output;
};

console.log(formatBridgeOperations(bridgeOperations));

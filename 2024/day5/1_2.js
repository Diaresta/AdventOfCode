const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const [inputPageRule, inputPageNumbers] = INPUT.split('\n\n');

const pageRules = inputPageRule.split('\n').map((rules) => rules.split('|'));
const pageNumbers = inputPageNumbers
  .split('\n')
  .map((section) => section.split(','));

const findValidSections = (pageRules, pageNumbers) => {
  let validSections = [];

  pageNumbers.forEach((section) => {
    let isValidSection;
    let swapNumbers = true;

    while (swapNumbers) {
      swapNumbers = false;

      pageRules.forEach((rule) => {
        if (section.includes(rule[0]) && section.includes(rule[1])) {
          if (section.indexOf(rule[0]) >= section.indexOf(rule[1])) {
            isValidSection = true;
            swapNumbers = true;

            section[section.indexOf(rule[0])] = rule[1];
            section[section.indexOf(rule[1])] = rule[0];
          }
        }
      });
    }

    if (isValidSection) {
      validSections.push(section);
    }
  });

  return validSections;
};

const middleNumberTotal = (validSections) => {
  let total = 0;

  validSections.forEach((section) => {
    total += parseInt(section[Math.ceil(section.length / 2) - 1]);
  });

  return total;
};

console.log(middleNumberTotal(findValidSections(pageRules, pageNumbers)));

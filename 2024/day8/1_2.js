const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

const INPUT = fs.readFileSync(filePath, 'utf-8');
const antennaRows = INPUT.trim().split('\n');

const locateAntennas = (antennaRows) => {
  let antennas = {};

  antennaRows.forEach((row, i) => {
    [...row].forEach((char, j) => {
      if (char !== '.') {
        if (!antennas[char]) {
          antennas[char] = [];
        }

        antennas[char].push([i, j]);
      }
    });
  });

  return antennas;
};

const locateAntinodes = () => {
  let antennas = locateAntennas(antennaRows);
  let antinodes = new Set();
  let gridPoints = getAllPointsInMap(antennaRows);

  for (const antennaPositions of Object.values(antennas)) {
    if (antennaPositions.length < 2) {
      continue;
    }

    gridPoints.forEach((point) => {
      for (let i = 0; i < antennaPositions.length - 1; i++) {
        for (let j = i + 1; j < antennaPositions.length; j++) {
          if (isCollinear(antennaPositions[i], antennaPositions[j], point)) {
            antinodes.add(point.join(','));
            break;
          }
        }
      }
    });
  }

  return antinodes.size;
};

const isCollinear = (antennaPosition1, antennaPosition2, antennaPosition3) => {
  const [x1, y1] = antennaPosition1;
  const [x2, y2] = antennaPosition2;
  const [x3, y3] = antennaPosition3;

  return (y2 - y1) * (x3 - x2) === (y3 - y2) * (x2 - x1);
};

const getAllPointsInMap = (antennaRows) => {
  let points = [];

  for (let i = 0; i < antennaRows.length; i++) {
    for (let j = 0; j < antennaRows[0].length; j++) {
      points.push([i, j]);
    }
  }

  return points;
};

console.log(locateAntinodes());

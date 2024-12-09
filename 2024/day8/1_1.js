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
  const antennas = locateAntennas(antennaRows);
  const antinodes = new Set();

  for (const antennaPositions of Object.values(antennas)) {
    if (antennaPositions.length < 2) {
      continue;
    }

    for (let i = 0; i < antennaPositions.length - 1; i++) {
      for (let j = i + 1; j < antennaPositions.length; j++) {
        const [x1, y1] = antennaPositions[i];
        const [x2, y2] = antennaPositions[j];

        const directions = {
          vertical: y2 - y1,
          horizontal: x2 - x1,
        };

        const antinodePositions = [
          [x1 - directions.horizontal, y1 - directions.vertical],
          [x2 + directions.horizontal, y2 + directions.vertical],
        ];

        antinodePositions.forEach((position) => {
          if (isInMap(position, antennaRows)) {
            antinodes.add(position.join(','));
          }
        });
      }
    }
  }

  return antinodes.size;
};

const isInMap = ([i, j], antennaRows) => {
  return (
    i >= 0 && i < antennaRows.length && j >= 0 && j < antennaRows[0].length
  );
};

console.log(locateAntinodes());

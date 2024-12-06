const fs = require('fs');

const getAndFormatInput = () => {
  const file = fs.readFileSync("day06_javascript/input.txt")
  const lines = file.toString()
  return lines.split("\n").map((e) => e.split(""))
}

const findCoordinate = (func, map) => {
  for (var y = 0; y < map.length; y++) {
    const row = map[y];
    for (var x = 0; x < row.length; x++) {
      const element = row[x];
      if (func(element)) {
        return { x, y }
      }
    }
  }
}

const directions = {
  "^": { x: 0, y: -1 },
  "<": { x: -1, y: 0 },
  "v": { x: 0, y: 1 },
  ">": { x: 1, y: 0 }
}

const charIsGuard = (char) => Object.keys(directions).includes(char);
const addCoords = (c1, c2) => ({ x: c1.x + c2.x, y: c1.y + c2.y });
const coordIsOutsideMappedArea = (coord, mappedArea) => coord.x < 0 || coord.x > mappedArea.at(0).length - 1 || coord.y < 0 || coord.y > mappedArea.length - 1;
const rotateGuard = (guardChar) => {
  switch (guardChar) {
    case "^":
      return ">"
    case ">":
      return "v"
    case "v":
      return "<"
    default:
      return "^"
  }
}
const printMappedArea = (mappedArea) => {
  console.log(mappedArea.map((e) => e.join("")).join("\n"))
}

const main1 = async () => {
  const mappedArea = getAndFormatInput();
  const startingCoordinate = findCoordinate(charIsGuard, mappedArea);
  const characterAtCoord = (coord) => mappedArea[coord.y][coord.x]

  let currentCoord = startingCoordinate
  while (true) {
    const guardCharacter = characterAtCoord(currentCoord);
    const direction = directions[guardCharacter];
    const nextCoord = addCoords(currentCoord, direction);

    if (coordIsOutsideMappedArea(nextCoord, mappedArea)) {
      mappedArea[currentCoord.y][currentCoord.x] = "X";
      break;
    }

    const nextCharacter = characterAtCoord(nextCoord);

    if (nextCharacter === "#") {
      mappedArea[currentCoord.y][currentCoord.x] = rotateGuard(guardCharacter);
    } else {
      mappedArea[currentCoord.y][currentCoord.x] = "X";
      mappedArea[nextCoord.y][nextCoord.x] = guardCharacter;
      currentCoord = nextCoord
    }
  }

  const totalVisited = mappedArea.reduce((sum, curr) => {
    return sum + curr.reduce((sum, curr) => sum + (curr === "X" ? 1 : 0), 0)
  }, 0);

  console.log(totalVisited);
}


const main2 = async () => {
  const mappedArea = getAndFormatInput();
  const startingCoordinate = findCoordinate(charIsGuard, mappedArea);
  const characterAtCoord = (coord) => mappedArea[coord.y][coord.x]

  let currentCoord = startingCoordinate
  let hasRotated = false
  while (true) {
    const guardCharacter = characterAtCoord(currentCoord);
    const direction = directions[guardCharacter];
    const nextCoord = addCoords(currentCoord, direction);

    if (coordIsOutsideMappedArea(nextCoord, mappedArea)) {
      mappedArea[currentCoord.y][currentCoord.x] = "X";
      break;
    }

    const nextCharacter = characterAtCoord(nextCoord);

    if (nextCharacter === "#") {
      mappedArea[currentCoord.y][currentCoord.x] = rotateGuard(guardCharacter);
      hasRotated = true;
    } else {
      mappedArea[currentCoord.y][currentCoord.x] = hasRotated ? "+" : "X";
      mappedArea[nextCoord.y][nextCoord.x] = guardCharacter;
      currentCoord = nextCoord
      hasRotated = false
    }
  }

  const totalVisited = mappedArea.reduce((sum, curr) => {
    return sum + curr.reduce((sum, curr) => sum + (curr === "X" || curr === "+" ? 1 : 0), 0)
  }, 0);

  printMappedArea(mappedArea);
}

main2();

// main1();

// ....#.....
// ....+XXX+#
// ....X...X.
// ..#.X...X.
// ..+XXX+#X.
// ..X.X.X.X.
// .#+XXXXX+.
// .+XXXXX+#.
// #+XXXX+X..
// ......#X..
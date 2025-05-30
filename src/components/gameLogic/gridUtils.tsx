export const checkForMatches = async (grid: any[][]) => {
  const matches: {row: number; col: number}[] = [];

  // check horizontal matches (3 or more in a row)

  for (let r = 0; r < grid.length; r++) {
    let matchLength = 1;

    for (let c = 0; c < grid[r].length - 1; c++) {
      if (grid[r][c] !== null && grid[r][c] === grid[r][c + 1]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            matches.push({row: r, col: c - i});
          }
        }

        matchLength = 1;
      }
    }
    if (matchLength >= 3) {
      for (let i = 0; i < matchLength; i++) {
        matches.push({row: r, col: grid[r].length - 1 - i});
      }
    }
  }

  // check vertical matches (3 or more in a row)
  for (let c = 0; c < grid[0].length; c++) {
    let matchLength = 1;

    for (let r = 0; r < grid.length - 1; r++) {
      if (grid[r][c] !== null && grid[r][c] === grid[r + 1][c]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            matches.push({row: r - i, col: c});
          }
        }

        matchLength = 1;
      }
    }
    if (matchLength >= 3) {
      for (let i = 0; i < matchLength; i++) {
        matches.push({row: grid.length - 1 - i, col: c});
      }
    }
  }

  return matches;
};

export const clearMatches = async (
  grid: any[][],
  matches: {row: number; col: number}[],
) => {
  matches?.forEach(match => {
    grid[match.row][match.col] = 0;
  });

  return grid;
};

export const shiftDown = async (grid: any[][]) => {
  for (let col = 0; col < grid[0].length; col++) {
    let emptyRow = grid?.length - 1;

    for (let row = grid?.length - 1; row >= 0; row--) {
      if (grid[row][col] !== null && grid[row][col] !== 0) {
        if (emptyRow !== row) {
          grid[emptyRow][col] = grid[row][col];
          grid[row][col] = 0;
        }
        emptyRow--;
      } else if (grid[row][col] === null) {
        emptyRow = row - 1;
      }
    }
  }
  return grid;
};

export const fillRandomCandies = async (grid: any[][]) => {
  const candyTypes = [1, 2, 3, 4, 5];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; r++) {
      if (grid[r][c] === 0) {
        const randomCandy =
          candyTypes[Math.floor(Math.random() * candyTypes.length)];
        grid[r][c] = randomCandy;
      }
    }
  }
  return grid;
};

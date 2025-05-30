

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

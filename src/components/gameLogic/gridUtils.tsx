export const checkForMatches = async (grid: any[][]) => {
  const matches: {row: number; col: number}[] = [];
  console.log(`🔍 Iniciando búsqueda de matches en grid ${grid.length}x${grid[0].length}`);

  // check horizontal matches (3 or more in a row)
  for (let r = 0; r < grid.length; r++) {
    let matchLength = 1;
    let currentType = grid[r][0];

    for (let c = 1; c < grid[r].length; c++) {
      if (
        grid[r][c] !== null && 
        grid[r][c] !== 0 && 
        currentType !== null && 
        currentType !== 0 && 
        grid[r][c] === currentType
      ) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          console.log(`🔥 Match horizontal encontrado en fila ${r}, longitud ${matchLength}`);
          for (let i = 0; i < matchLength; i++) {
            matches.push({row: r, col: c - 1 - i});
          }
        }
        matchLength = 1;
        currentType = grid[r][c];
      }
    }
    // Check the last sequence
    if (matchLength >= 3) {
      console.log(`🔥 Match horizontal al final de fila ${r}, longitud ${matchLength}`);
      for (let i = 0; i < matchLength; i++) {
        matches.push({row: r, col: grid[r].length - 1 - i});
      }
    }
  }

  // check vertical matches (3 or more in a row)
  for (let c = 0; c < grid[0].length; c++) {
    let matchLength = 1;
    let currentType = grid[0][c];

    for (let r = 1; r < grid.length; r++) {
      if (
        grid[r][c] !== null && 
        grid[r][c] !== 0 && 
        currentType !== null && 
        currentType !== 0 && 
        grid[r][c] === currentType
      ) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          console.log(`🔥 Match vertical encontrado en columna ${c}, longitud ${matchLength}`);
          for (let i = 0; i < matchLength; i++) {
            matches.push({row: r - 1 - i, col: c});
          }
        }
        matchLength = 1;
        currentType = grid[r][c];
      }
    }
    // Check the last sequence
    if (matchLength >= 3) {
      console.log(`🔥 Match vertical al final de columna ${c}, longitud ${matchLength}`);
      for (let i = 0; i < matchLength; i++) {
        matches.push({row: grid.length - 1 - i, col: c});
      }
    }
  }

  console.log(`✅ Búsqueda completada. Total matches: ${matches.length}`);
  return matches;
};

export const clearMatches = async (
  grid: any[][],
  matches: {row: number; col: number}[],
) => {
  console.log(`🧹 Limpiando ${matches.length} matches`);
  matches?.forEach(match => {
    grid[match.row][match.col] = 0;
  });
  return grid;
};

export const shiftDown = async (grid: any[][]) => {
  console.log(`⬇️ Ejecutando shiftDown`);
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
  console.log(`🍬 Rellenando candies`);
  const candyTypes = [1, 2, 3, 4, 5];
  let filled = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        const randomCandy =
          candyTypes[Math.floor(Math.random() * candyTypes.length)];
        grid[r][c] = randomCandy;
        filled++;
      }
    }
  }
  console.log(`🍬 Rellenados ${filled} candies`);
  return grid;
};

export const hasPossibleMoves = async (grid: any[][]): Promise<boolean> => {
  console.log(`🎯 Verificando movimientos posibles...`);
  const rows = grid.length;
  const cols = grid[0].length;

  const swap = (r1: number, c1: number, r2: number, c2: number) => {
    const temp = grid[r1][c1];
    grid[r1][c1] = grid[r2][c2];
    grid[r2][c2] = temp;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === null || grid[r][c] === 0) continue;

      // Verificar movimiento horizontal (derecha)
      if (c + 1 < cols && grid[r][c + 1] !== null && grid[r][c + 1] !== 0) {
        console.log(`🔄 Probando swap horizontal: (${r},${c}) <-> (${r},${c+1})`);
        swap(r, c, r, c + 1);
        const matches = await checkForMatches(grid);
        swap(r, c, r, c + 1); // Revertir inmediatamente
        if (matches.length > 0) {
          console.log(`✅ Movimiento posible encontrado: (${r},${c}) -> (${r},${c+1})`);
          return true;
        }
      }

      // Verificar movimiento vertical (abajo)
      if (r + 1 < rows && grid[r + 1][c] !== null && grid[r + 1][c] !== 0) {
        console.log(`🔄 Probando swap vertical: (${r},${c}) <-> (${r+1},${c})`);
        swap(r, c, r + 1, c);
        const matches = await checkForMatches(grid);
        swap(r, c, r + 1, c); // Revertir inmediatamente
        if (matches.length > 0) {
          console.log(`✅ Movimiento posible encontrado: (${r},${c}) -> (${r+1},${c})`);
          return true;
        }
      }
    }
  }

  console.log(`❌ No hay movimientos posibles`);
  return false;
};

export const shuffleGrid = (grid: any[][]) => {
  console.log(`🔀 Shuffle Grid iniciado`);
  const candies = grid.flat().filter(cell => cell !== null && cell !== 0);
  const rows = grid.length;
  const cols = grid[0].length;

  console.log(`🍬 Candies extraídos: ${candies.length}`);

  // Mezclar el array de dulces
  for (let i = candies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candies[i], candies[j]] = [candies[j], candies[i]];
  }
  
  // Redistribuir los dulces mezclados
  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== null) {
        grid[r][c] = candies[index++];
      }
    }
  }
  console.log(`✅ Shuffle completado`);
  return grid;
};

export const handleShuffleAndClear = async (grid: any[][]) => {
  console.log(`🎲 handleShuffleAndClear iniciado`);
  let newGrid = shuffleGrid(grid);
  let totalClearedCandies = 0;

  let matches = await checkForMatches(newGrid);
  while (matches?.length > 0) {
    totalClearedCandies += matches.length;
    newGrid = await clearMatches(newGrid, matches);
    newGrid = await shiftDown(newGrid);
    newGrid = await fillRandomCandies(newGrid);
    matches = await checkForMatches(newGrid);
  }

  console.log(`✅ Shuffle y clear completado. Total limpiado: ${totalClearedCandies}`);
  return {grid: newGrid, clearedMatching: totalClearedCandies};
};
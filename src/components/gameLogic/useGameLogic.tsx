import {useRef} from 'react';
import {Animated} from 'react-native';
import {State} from 'react-native-gesture-handler';
import {playSound} from '../../utils/SoundUtility';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  checkForMatches,
  clearMatches,
  fillRandomCandies,
  handleShuffleAndClear,
  hasPossibleMoves,
  shiftDown,
} from './gridUtils';

const useGameLogic = (data: any[][], setData: (data: any) => any) => {
  const animatedValues = useRef(
    data?.map(row =>
      row.map(tile =>
        tile === null
          ? null
          : {x: new Animated.Value(0), y: new Animated.Value(0)},
      ),
    ),
  ).current;

  const handleSwipe = async (
    rowIndex: number,
    colIndex: number,
    direction: 'up' | 'down' | 'left' | 'right', 
    setCollectedCandes: any,
  ) => {
    console.log(`🎮 SWIPE INICIADO: Posición (${rowIndex},${colIndex}) hacia ${direction}`);
    
    playSound('candy_shuffle');

    let newGrid = JSON.parse(JSON.stringify(data));
    let targetRow = rowIndex;
    let targetCol = colIndex;

    if (direction === 'up') targetRow -= 1;
    if (direction === 'down') targetRow += 1;
    if (direction === 'left') targetCol -= 1;
    if (direction === 'right') targetCol += 1;

    console.log(`🎯 Target calculado: (${targetRow},${targetCol})`);

    // Check bounds and skip null tiles
    if (
      targetRow >= 0 &&
      targetRow < data?.length &&
      targetCol >= 0 &&
      targetCol < data[0].length &&
      data[rowIndex][colIndex] !== null &&
      data[targetRow][targetCol] !== null
    ) {
      console.log(`✅ Movimiento válido - Bounds OK`);
      console.log(`📦 Candy origen: ${data[rowIndex][colIndex]}, Candy destino: ${data[targetRow][targetCol]}`);

      const targetTileAnimationX = Animated.timing(
        animatedValues[targetRow][targetCol]!.x,
        {
          toValue: (colIndex - targetCol) * RFPercentage(5.5),
          duration: 200,
          useNativeDriver: true,
        },
      );

      const targetTileAnimationY = Animated.timing(
        animatedValues[targetRow][targetCol]!.y,
        {
          toValue: (rowIndex - targetRow) * RFPercentage(5.5),
          duration: 200,
          useNativeDriver: true,
        },
      );

      const sourceTileAnimationX = Animated.timing(
        animatedValues[rowIndex][colIndex]!.x,
        {
          toValue: (targetCol - colIndex) * RFPercentage(5.5),
          duration: 200,
          useNativeDriver: true,
        },
      );

      const sourceTileAnimationY = Animated.timing(
        animatedValues[rowIndex][colIndex]!.y,
        {
          toValue: (targetRow - rowIndex) * RFPercentage(5.5),
          duration: 200,
          useNativeDriver: true,
        },
      );
      
      console.log(`🎬 Iniciando animaciones...`);
      
      Animated.parallel([
        sourceTileAnimationX,
        sourceTileAnimationY,
        targetTileAnimationX,
        targetTileAnimationY,
      ]).start(async () => {
        console.log(`🔄 Intercambiando candies...`);
        
        // Intercambiar los candies
        [newGrid[rowIndex][colIndex], newGrid[targetRow][targetCol]] = [
          newGrid[targetRow][targetCol],
          newGrid[rowIndex][colIndex],
        ];
        
        console.log(`🔍 Buscando matches después del intercambio...`);
        let matches = await checkForMatches(newGrid);
        console.log(`🎯 Matches encontrados: ${matches?.length || 0}`);
        
        if (matches?.length > 0) {
          console.log(`✨ ¡MATCH VÁLIDO! Procesando...`);
          let totalClearedCandies = 0;
          while (matches?.length > 0) {
            playSound('candy_clear');
            totalClearedCandies += matches.length;
            console.log(`🧹 Limpiando ${matches.length} matches`);
            newGrid = await clearMatches(newGrid, matches);
            newGrid = await shiftDown(newGrid);
            newGrid = await fillRandomCandies(newGrid);
            matches = await checkForMatches(newGrid);
            console.log(`🔄 Nuevos matches después del refill: ${matches?.length || 0}`);
          }

          // Reset animations
          animatedValues[rowIndex][colIndex]!.x.setValue(0);
          animatedValues[rowIndex][colIndex]!.y.setValue(0);
          animatedValues[targetRow][targetCol]!.x.setValue(0);
          animatedValues[targetRow][targetCol]!.y.setValue(0);

          setData(newGrid);
          
          console.log(`🎮 Verificando movimientos posibles...`);
          const hasMoves = await hasPossibleMoves(newGrid);
          if (!hasMoves) {
            console.log(`🔀 No hay movimientos, barajando...`);
            const d = await handleShuffleAndClear(newGrid);
            newGrid = d.grid;
            totalClearedCandies += d.clearedMatching;
            while (!(await hasPossibleMoves(newGrid))) {
              const p = await handleShuffleAndClear(newGrid);
              newGrid = p.grid;
              totalClearedCandies += p.clearedMatching;
            }
            setData(newGrid);
          }
          setCollectedCandes(
            (prevCount: number) => prevCount + totalClearedCandies,
          );
        } else {
          console.log(`❌ NO HAY MATCHES - Revirtiendo movimiento`);
          // Si no hay matches, revertir
          animatedValues[rowIndex][colIndex]!.x.setValue(0);
          animatedValues[rowIndex][colIndex]!.y.setValue(0);
          animatedValues[targetRow][targetCol]!.x.setValue(0);
          animatedValues[targetRow][targetCol]!.y.setValue(0);
          setData(data); // Mantener grid original
        }
      });
    } else {
      console.log(`❌ Movimiento INVÁLIDO - Fuera de bounds o tile null`);
      console.log(`Bounds check: targetRow=${targetRow}, targetCol=${targetCol}`);
      console.log(`Grid size: ${data?.length}x${data[0]?.length}`);
    }
  };

  const handleGesture = async (
    event: any,
    rowIndex: number,
    colIndex: number,
    state: any,
    setCollectedCandes: any,
  ) => {
    if (data[rowIndex][colIndex] === null) {
      console.log(`⚠️ Tile null detectado en (${rowIndex},${colIndex})`);
      return;
    }
    if (state === State.END) {
      const {translateX, translateY} = event.nativeEvent;
      const absX = Math.abs(translateX);
      const absY = Math.abs(translateY);

      console.log(`👆 GESTO DETECTADO: translateX=${translateX}, translateY=${translateY}`);
      console.log(`📏 Magnitudes: absX=${absX}, absY=${absY}`);

      if (absX > absY) {
        if (translateX > 0) {
          console.log(`➡️ Movimiento DERECHA detectado`);
          await handleSwipe(rowIndex, colIndex, 'right', setCollectedCandes);
        } else {
          console.log(`⬅️ Movimiento IZQUIERDA detectado`);
          await handleSwipe(rowIndex, colIndex, 'left', setCollectedCandes);
        }
      } else {
        if (translateY > 0) {
          console.log(`⬇️ Movimiento ABAJO detectado`);
          await handleSwipe(rowIndex, colIndex, 'down', setCollectedCandes);
        } else {
          console.log(`⬆️ Movimiento ARRIBA detectado`);
          await handleSwipe(rowIndex, colIndex, 'up', setCollectedCandes);
        }
      }
    }
  };

  return {
    handleGesture,
    animatedValues,
  };
};

export default useGameLogic;
import {useRef} from 'react';
import {Animated} from 'react-native';
import {State} from 'react-native-gesture-handler';
import {playSound} from '../../utils/SoundUtility';

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
    direction: 'up' | 'down' | 'left' | 'rigth',
    setCollectedCandes: any,
  ) => {
    playSound('candy_shuffle');

    let newGrid = JSON.parse(JSON.stringify(data));
    let targetRow = rowIndex;
    let targetCol = colIndex;

    if (direction === 'up') targetRow -= 1;
    if (direction === 'down') targetRow += 1;
    if (direction === 'left') targetCol -= 1;
    if (direction === 'rigth') targetCol += 1;

    // Check bounds and skip bull tiles
    if (
      targetRow >= 0 &&
      targetRow < data?.length &&
      targetCol >= 0 &&
      targetCol < data[0].length &&
      data[rowIndex][colIndex] !== null &&
      data[targetRow][targetCol] !== null
    ) {
      
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
      return;
    }
    if (state === State.END) {
      const {translateX, translateY} = event.nativeEvent;
      const absX = Math.abs(translateX);
      const absY = Math.abs(translateY);

      if (absX > absY) {
        if (translateX > 0) {
          await handleSwipe(rowIndex, colIndex, 'rigth', setCollectedCandes);
        } else {
          await handleSwipe(rowIndex, colIndex, 'left', setCollectedCandes);
        }
      } else {
        if (translateY > 0) {
          await handleSwipe(rowIndex, colIndex, 'down', setCollectedCandes);
        } else {
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

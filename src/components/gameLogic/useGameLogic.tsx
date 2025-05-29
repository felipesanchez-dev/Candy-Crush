import {useRef} from 'react';
import {Animated} from 'react-native';
import {State} from 'react-native-gesture-handler';

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
    setCollectedCandes: any
  ) => {};

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
        } else {
        }
      } else {
        if (translateY > 0) {
        } else {
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

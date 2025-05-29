import {useRef} from 'react';
import {Animated} from 'react-native';

const useGameLogic = (data: any[][], setData: (data: any) => any) => {
  const animatedValues = useRef(
    data?.map(row =>
      row.map(tile =>
        tile === null
          ? null
          : {x: new Animated.Value(0), y: new Animated.Value(0)},
      ),
    ),
  );

  const handleGesture = async (
    event: any,
    rowIndex: number,
    colIndex: number,
    state: any,
    setCollectedCandes: any,
  ) => {};

  return {
    handleGesture,
    animatedValues,
  };
};

export default useGameLogic;

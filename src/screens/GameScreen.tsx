import {StyleSheet, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {commonStyles} from '../styles/commonStyles';
import GameHeader from '../components/game/GameHeader';

const GameScreen = () => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTimer] = useState<any>(null);
  const [collectedCandies, setCollectedCandies] = useState<number>(0);

  return (
    <ImageBackground
      style={commonStyles.simpleContainer}
      source={require('../assets/images/b1.png')}>
      <GameHeader
        totalCount={totalCount}
        collectedCandies={collectedCandies}
        time={time}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({});
export default GameScreen;

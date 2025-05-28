import {StyleSheet, ImageBackground} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {commonStyles} from '../styles/commonStyles';
import GameHeader from '../components/game/GameHeader';
import { useRoute } from '@react-navigation/native';
import { useSound } from '../navigation/SoundContext';
import { gameLevels } from '../utils/data';
import GameFooter from '../components/game/GameFooter';

const GameScreen:FC = () => {
  const route = useRoute();
  const item = route?.params as any;
  const {playSound} = useSound();
  const [gridData, setGridData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTimer] = useState<any>(null);
  const [collectedCandies, setCollectedCandies] = useState<number>(0);

  useEffect(() => {
    if (item?.id) {
      const levelKey = `level${item.id}`;
      const levelData = gameLevels[levelKey];
      if (levelData) {
        setGridData(levelData.grid);
        setTotalCount(Number(levelData.pass));
        setTimer(Number(levelData.time)); 
      }
    }
  }, [item]);

  return (
    <ImageBackground
      style={commonStyles.simpleContainer}
      source={require('../assets/images/b1.png')}>
      <GameHeader
        totalCount={totalCount}
        collectedCandies={collectedCandies}
        time={time}
      />
      <GameFooter />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({});
export default GameScreen;
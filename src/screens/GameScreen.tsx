import {StyleSheet, ImageBackground, Animated, Alert} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {commonStyles} from '../styles/commonStyles';
import GameHeader from '../components/game/GameHeader';
import {useRoute} from '@react-navigation/native';
import {useSound} from '../navigation/SoundContext';
import {gameLevels} from '../utils/data';
import GameFooter from '../components/game/GameFooter';
import GameTile from '../components/game/GameTile';
import {useLevelStore} from '../state/useLevelStore';
import {goBack} from '../utils/NavigationUtil';
import { screenWidth } from '../utils/Constants';
import LottieView from 'lottie-react-native';

const GameScreen: FC = () => {
  const route = useRoute();
  const item = route?.params as any;
  const {playSound} = useSound();
  const [gridData, setGridData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [time, setTimer] = useState<any>(null);
  const [collectedCandies, setCollectedCandies] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [firstAnimation, setFirstAnimation] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false); // <- Nuevo estado

  const {completeLevel, unlockLevel} = useLevelStore();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null); // <- Para controlar el timer

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

  useEffect(() => {
    if (time === 0 && !gameEnded) {
      handleGameOver();
    }
  }, [time, gameEnded]);

  // ✨ NUEVA FUNCIÓN: Verificar victoria inmediata
  const checkVictory = () => {
    if (collectedCandies >= totalCount && totalCount > 0 && !gameEnded) {
      console.log(`🎉 ¡VICTORIA! Dulces: ${collectedCandies}/${totalCount}`);
      setGameEnded(true);
      
      // Detener el timer inmediatamente
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Completar nivel inmediatamente
      completeLevel(item?.id, collectedCandies);
      unlockLevel(item?.id + 1);
      
      // Mostrar animación de victoria
      setShowAnimation(true);
      startHeartBeatAnimation();
      
      // Mostrar alerta después de la animación
      setTimeout(() => {
        Alert.alert('🎉 ¡Felicidades!', 'Has completado el nivel con éxito.', [
          {
            text: 'Continuar',
            onPress: () => goBack(),
          },
        ]);
      }, 3000); // Esperar 3 segundos para que termine la animación
    }
  };

  const handleGameOver = () => {
    if (gameEnded) return; // Evitar múltiples llamadas
    
    setGameEnded(true);
    
    if (collectedCandies >= totalCount) {
      completeLevel(item?.id, collectedCandies);
      unlockLevel(item?.id + 1);
      Alert.alert('🎉 ¡Felicidades!', 'Has completado el nivel con éxito.', [
        {
          text: 'Continuar',
          onPress: () => goBack(),
        },
      ]);
    } else {
      Alert.alert(
        '😢 ¡Tiempo Agotado!',
        'No has alcanzado la cantidad de dulces necesarios.',
        [
          {
            text: 'Reintentar',
            onPress: () => {
              setGameEnded(false);
              setCollectedCandies(0);
              setFirstAnimation(false);
              setShowAnimation(false);
              setGridData(gameLevels[`level${item.id}`].grid);
              setTimer(gameLevels[`level${item.id}`].time);
            },
          },
          {
            text: 'Salir',
            onPress: () => goBack(),
          },
        ],
      );
    }
  };

  // ✨ VERIFICAR VICTORIA cuando cambian los dulces recolectados
  useEffect(() => {
    checkVictory();
  }, [collectedCandies]);

  useEffect(() => {
    if (time && time > 0 && !gameEnded) {
      timerRef.current = setInterval(() => {
        setTimer((prev: number) => {
          if (prev <= 1000) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    }
  }, [time, gameEnded]);

  // ✨ ACTUALIZADA: Solo mostrar animación, no manejar lógica de victoria aquí
  useEffect(() => {
    if (collectedCandies >= totalCount && totalCount > 0 && !firstAnimation && !gameEnded) {
      setShowAnimation(true);
      startHeartBeatAnimation();
    }
  }, [collectedCandies, totalCount, gameEnded]);

  const startHeartBeatAnimation = () => {
    playSound('cheer', false);
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
      {
        iterations: 2,
      },
    ).start(() => {
      setFirstAnimation(true);
      setShowAnimation(false);
    });
  };

  return (
    <ImageBackground
      style={commonStyles.simpleContainer}
      source={require('../assets/images/b1.png')}>
      <GameHeader
        totalCount={totalCount}
        collectedCandies={collectedCandies}
        time={time}
      />
      {gridData && !gameEnded && (
        <GameTile
          data={gridData}
          setData={setGridData}
          setCollectedCandies={setCollectedCandies}
        />
      )}
      {showAnimation && (
        <>
          <Animated.Image 
            source={require('../assets/text/t2.png')}
            style={[
              styles.centerImage,
              {
                opacity: fadeAnim,
                transform: [{scale: scaleAnim}]
              }
            ]}
          />
          <LottieView 
            source={require('../assets/animations/confetti.json')}
            style={styles.lottie}
            autoPlay
            loop
          />
        </>
      )}
      <GameFooter />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centerImage: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '15%',
  },
  lottie: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '10%'
  }
});

export default GameScreen;
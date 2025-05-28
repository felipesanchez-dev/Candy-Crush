import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '../../utils/Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';

const GameHeader: FC<{
  totalCount: number;
  collectedCandies: number;
  time: number;
}> = ({totalCount, collectedCandies, time}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Image
        source={require('../../assets/icons/hangrope.png')}
        style={styles.img}
      />
      <ImageBackground
        source={require('../../assets/images/lines.jpg')}
        style={styles.lines}
      >

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.15,
    width: '100%',
    backgroundColor: 'red',
  },
  img: {
    width: RFValue(60),
    height: RFValue(80),
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 2,
    top: -RFValue(0),
    alignSelf: 'center',
  },
  lines: {
    padding: 5, 
    borderRadius: 10,
    resizeMode: 'contain',
    overflow: 'hidden',
    margin: RFValue(10),
    marginTop: RFValue(20),
  }
});

export default GameHeader;

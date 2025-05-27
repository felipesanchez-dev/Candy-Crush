import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { FONTS } from '../../utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'

const Footer = () => {
  const handlePress = async () => {
    const url = 'https://felipesanchezdev.site'
    const supported = await Linking.openURL(url)
    if (supported) {
      await Linking.openURL(url)
    } else {
      console.log("No se puede abrir la URL:", url)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.button}>
        <Text style={styles.label}>Desarrollado por</Text>
        <Text style={styles.name}>Felipe Reyes Sánchez</Text>
        <Text style={styles.url}>felipesanchezdev.site</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 6,
  },
  button: {
    alignItems: 'center',
  },
  label: {
    fontSize: RFValue(11),
    color: '#CCCCCC',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  name: {
    fontFamily: FONTS.Lily,
    fontSize: RFValue(15),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  url: {
    fontSize: RFValue(10),
    color: '#87CEFA',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
})

export default Footer

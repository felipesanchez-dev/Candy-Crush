import React, { FC, useEffect } from 'react'
import { Image, ImageBackground } from 'react-native'
import { commonStyles } from '../styles/commonStyles'
import { resetAndNavigate } from '../utils/NavigationUtil'

const SplashScreen:FC = () => {

  useEffect(() => {
    const timoutId = setTimeout(() => {
      resetAndNavigate('HomeScreen')
    }, 2500)

    return () => clearTimeout(timoutId)
  }, [])

  return (
    <ImageBackground source={require('../assets/images/bg.png')} style={commonStyles.container}>
      <Image  source={require('../assets/text/logo.png')} style={commonStyles.img}/>
    </ImageBackground>
  )
}

export default SplashScreen
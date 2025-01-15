import React from "react"
import { View, Text, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MainpageImgSrc from "./_assets/MainpageImage.png"

const HomePage = () => {
  return (
    <LinearGradient
      colors={["#FFF", "#FFF8DF", "#FFD1E9", "#FFF"]}
      locations={[0.0692, 0.1577, 0.5672, 0.834]}
      className="flex flex-1 px-6">
      <View className="flex items-center justify-center w-full h-full">
        <Text className="font-bold text-title2">HomePage</Text>
        <Image source={MainpageImgSrc} className="fixed" />
      </View>
    </LinearGradient>
  )
}

export default HomePage

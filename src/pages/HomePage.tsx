import React from "react"
import { View, Button, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

const HomePage = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>HomePage</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("album")
        }}
      />
    </View>
  )
}

export default HomePage

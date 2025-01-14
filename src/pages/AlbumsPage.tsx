import React from "react"
import { View, Button, Text } from "react-native"

const AlbumsPage = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text className="text-red-200">AlbumsPages</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("home")
        }}
      />
    </View>
  )
}

export default AlbumsPage

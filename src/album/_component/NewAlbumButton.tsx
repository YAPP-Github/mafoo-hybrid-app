import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import Icon from "../../common/Icon"

export type RootStackParamList = {
  AlbumCreate: undefined
}

const NewAlbumButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const handlePress = () => {
    navigation.navigate("AlbumCreate")
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityLabel="새 앨범 만들기"
      style={styles.link}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>새 앨범 만들기</Text>
        <Icon name="widgetAddOutline" size={20} color="white" />
      </View>
    </TouchableOpacity>
  )
}

export default NewAlbumButton

const styles = StyleSheet.create({
  link: {
    position: "absolute",
    bottom: 114,
    left: "50%",
    transform: [{ translateX: -79 }],
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 9999,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
})

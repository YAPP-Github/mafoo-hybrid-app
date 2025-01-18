import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import Icon from "../../common/Icon"
import MFText from "../../common/MFText"
import NewAlbum from "../../assets/newAlbum.svg"

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
        <MFText
          weight="SemiBold"
          className="text-body1"
          style={styles.buttonText}>
          새 앨범 만들기
        </MFText>
        <NewAlbum size={20} color="white" />
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
    gap: 4,
    backgroundColor: "#2D3541", // TODO: gray 800
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 9999,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
})

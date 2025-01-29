import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { PhotoInfo } from "../types"

export const Photo = ({ photo }: { photo: PhotoInfo }) => {
  const { photoUrl } = photo

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E1E4E8",
  },
  image: {
    width: "100%",
    aspectRatio: 1, // 1:1 비율 유지
  },
})

import React from "react"
import { View, StyleSheet } from "react-native"
import ColorIcon from "../../../common/ColorIcon"
import { AlbumType } from "../../types"

interface AlbumTypeSelectTabProps {
  type: AlbumType
  handleType: (type: AlbumType) => void
}

const colors = [
  "HEART",
  "FIRE",
  "BASKETBALL",
  "BUILDING",
  "STARFALL",
  "SMILE_FACE",
] as const

function AlbumTypeSelectTab({ type, handleType }: AlbumTypeSelectTabProps) {
  return (
    <View style={styles.container}>
      {colors.map((color) => (
        <ColorIcon
          key={color}
          iconColor={color}
          size={color === type ? "large" : "medium"}
          style={color !== type ? styles.inactiveIcon : undefined}
          onPress={() => handleType(color)} // onClick -> onPress
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inactiveIcon: {
    opacity: 0.3,
  },
})

export default AlbumTypeSelectTab

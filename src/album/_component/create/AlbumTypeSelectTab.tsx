import React from "react"
import { View, StyleSheet } from "react-native"
import ColorIcon, { iconSize } from "../../../common/ColorIcon"
import { AlbumType } from "../../types"
import { TouchableOpacity } from "react-native-gesture-handler"

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
        <TouchableOpacity
          key={color}
          style={{
            height: color === type ? 48 : 36,
            width: color === type ? 48 : 36,
          }}
          onPress={() => handleType(color)}>
          <ColorIcon
            key={color}
            iconColor={color}
            size={color === type ? "large" : "medium"}
            style={color !== type ? styles.inactiveIcon : undefined}
          />
        </TouchableOpacity>
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

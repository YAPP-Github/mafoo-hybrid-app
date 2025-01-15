import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
// import Icon from "@/common/Icon"
import { albumDetailHeaderVariants as headerVariants } from "@/styles/variants"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { AlbumInfo } from "@/album/types"
import { cn } from "@/utils"

interface HeaderProps {
  albumInfo: AlbumInfo
  className?: string
  onTapMenu: () => void
}
const AlbumDetailHeader = ({
  albumInfo,
  className,
  onTapMenu,
}: HeaderProps) => {
  const navigation = useNavigation()

  if (!albumInfo) {
    return <Text className={cn(headerVariants())}>albumInfo 없음</Text>
  }

  return (
    <View className={cn(headerVariants({ type: albumInfo.type }), className)}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconButton}>
        {/* <Icon name="altArrowLeftOutline" size={28} /> */}
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        {/* <Icon
          name={ICON_NAME[albumInfo.type]}
          color={ICON_COLOR_STYLE[albumInfo.type]}
          size={28}
        /> */}
        <Text style={styles.title}>{albumInfo.name}</Text>
      </View>
      <TouchableOpacity onPress={onTapMenu} style={styles.iconButton}>
        {/* <Icon name="hamburger" size={28} /> */}
      </TouchableOpacity>
    </View>
  )
}

export default AlbumDetailHeader

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  default: {
    backgroundColor: "#f5f5f5",
  },
  iconButton: {
    padding: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
})

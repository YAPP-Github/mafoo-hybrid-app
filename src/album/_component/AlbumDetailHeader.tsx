import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "@/common/Icon"
import { albumDetailHeaderVariants as headerVariants } from "@/styles/variants"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { AlbumInfo } from "@/album/types"
import { cn } from "@/utils"
import MFText from "@/common/MFText"
import { ICON_COLOR_STYLE_HEX } from "@/constants"

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
    <View
      style={styles.header}
      className={cn(headerVariants({ type: albumInfo.type }), className)}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconButton}>
        <Icon name="altArrowLeftOutline" size={28} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Icon
          name={ICON_NAME[albumInfo.type]}
          color={ICON_COLOR_STYLE_HEX[albumInfo.type]}
          size={28}
        />
        <MFText weight="SemiBold" className="text-title2" style={styles.title}>
          {albumInfo.name}
        </MFText>
      </View>
      <TouchableOpacity onPress={onTapMenu} style={styles.iconButton}>
        <Icon name="hamburger" size={28} />
      </TouchableOpacity>
    </View>
  )
}

export default AlbumDetailHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    height: 56,
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

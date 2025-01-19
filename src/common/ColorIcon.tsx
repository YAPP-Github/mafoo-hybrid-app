import { View, StyleSheet, StyleProp, ViewStyle } from "react-native"
import { VariantProps } from "class-variance-authority"

import { ICON_NAME } from "@/constants"
import { colorIconVariants } from "@/styles/variants"
import iconMap from "./iconMap"
import { AlbumType } from "@/album/types"

export const iconSize = {
  medium: 24,
  large: 36,
} as const

export interface ColorIconProps extends VariantProps<typeof colorIconVariants> {
  size?: keyof typeof iconSize
  iconColor?: AlbumType
  style?: StyleProp<ViewStyle>
}

/**
 * @param size 아이콘의 크기 (기본값: "medium")
 * @param iconColor 아이콘의 배경색 (기본값: "HEART")
 */
const ColorIcon = ({
  size = "medium",
  iconColor,
  ...props
}: ColorIconProps) => {
  const SvgIcon = iconMap[ICON_NAME[iconColor || "HEART"]].default

  return (
    <View
      style={[styles.container, props.style]}
      className={`${colorIconVariants({ size, iconColor })}`}>
      <SvgIcon
        width={iconSize[size || "medium"]}
        height={iconSize[size || "medium"]}
        color="white"
      />
    </View>
  )
}

export default ColorIcon

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

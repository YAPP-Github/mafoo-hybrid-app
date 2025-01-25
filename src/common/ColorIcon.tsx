import React from "react"
import { View, StyleSheet } from "react-native"
import { VariantProps } from "class-variance-authority"

import { ICON_NAME } from "../constants"
import { colorIconVariants } from "../styles/variants"
import { cn } from "../utils"
import iconMap from "./iconMap"

export const iconSize = {
  medium: 24,
  large: 36,
} as const

// export interface ColorIconProps extends VariantProps<typeof colorIconVariants> {
//   size?: keyof typeof iconSize // 아이콘 크기
//   iconColor?: string // 아이콘 배경색
// }

/**
 * @param size 아이콘의 크기 (기본값: "medium")
 * @param iconColor 아이콘의 배경색 (기본값: "red")
 */
const ColorIcon = ({ size = "medium", iconColor = "red", ...props }: any) => {
  const SvgIcon = iconMap[ICON_NAME[iconColor || "HEART"]].default

  return (
    <View
      style={[styles.container, props.style]}
      className={`${colorIconVariants({ size, iconColor })}`}>
      <SvgIcon width={24} height={24} color="white" />
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

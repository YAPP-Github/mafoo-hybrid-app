import React from "react"
import { View, StyleSheet, Text } from "react-native"
import Svg, { Path, SvgUri } from "react-native-svg"
import { VariantProps } from "class-variance-authority"

import { ICON_NAME } from "../constants"
import { colorIconVariants } from "../styles/variants"
import { cn } from "../utils"

const iconSize = {
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
  // ColorIconProps
  // const SvgIconPath =  require(`../assets/${
  //   ICON_NAME[iconColor || "HEART"]
  // }.svg`).default

  const SvgIcon = require(`../assets/heartAngleBold.svg`).default

  return (
    <View
      style={[
        styles.container,
        colorIconVariants({ size, iconColor }),
        props.style, // 추가 스타일
      ]}>
      <Text>ColorIcon</Text>
      {/* <SvgUri
        width={24} //{iconSize[size]}
        height={24} //{iconSize[size]}
        uri={SvgIcon}
        viewBox="0 0 24 24"
        fill="red"
      /> */}
      {/* <Path d={SvgIconPath} fill="white" /> */}
    </View>
  )
}

export default ColorIcon

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
})

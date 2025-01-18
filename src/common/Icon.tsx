import { ComponentProps } from "react"
import Svg from "react-native-svg"
import { cn } from "../utils"
import React from "react"
import iconMap from "./iconMap"

export type IconTypes =
  | "basketballBold"
  | "buildingsBold"
  | "emojiFunnyCircleBold"
  | "fireBold"
  | "heartAngleBold"
  | "starFallMinimalisticBold"
  | "altArrowLeftOutline"
  | "galleryAddOutline"
  | "kakaoLogo"
  | "albumOutline"
  | "albumBold"
  | "scannerOutline"
  | "userCircleOutline"
  | "userCircleBold"
  | "widgetAddOutline"
  | "downloadBold"
  | "closeCircleBold"
  | "arrowRight"
  | "errorLogo"
  | "reelOutline"
  | "insta"
  | "appleLogo"
  | "mafooLogo"
  | "galleryIcon"
  | "qrIcon"
  | "uploadMafoo"
  | "sadMafoo"
  | "message"
  | "info"
  | "emptyMafoo"
  | "hamburger"
  | "heartPink"
  | "pen"
  | "trash"
  | "permission"
  | "handShake"
  | "heartBold"

export interface IconProps extends ComponentProps<"svg"> {
  name: IconTypes
  size: 16 | 20 | 24 | 28 | 36 | 44 | 56 | 64 | 120
  color?: string
}

/**
 *
 * @param name 아이콘 이름과 타입 ex) heartAngleBold
 * @param size 아이콘 크기 ex) 16
 * @param color 아이콘에 적용할 컬러 ex) gray/600 -> gray-600 (기본값)
 */
const Icon = ({
  name,
  size,
  color = "gray-600",
  className,
  ...props
}: IconProps) => {
  // const uri = require(`../assets/${name}.svg`)

  const SvgIcon = iconMap[name].default

  return (
    <SvgIcon
      width={size}
      height={size}
      //className={cn(className, color ? `fill-${color}` : "fill-gray-600")}
    />
  )
}

export default Icon

export interface ImageIconProps extends ComponentProps<"svg"> {
  name: IconTypes
  width: number
  height: number
  color?: string
}

/**
 *
 * @param name 아이콘 이름과 타입 ex) heartAngleBold
 * @param size 아이콘 크기 ex) 16
 * @param color 아이콘에 적용할 컬러 ex) gray/600 -> gray-600 (기본값)
 */
export const IconImage = ({
  name,
  width,
  height,
  color = "gray-600",
  className,
  ...props
}: ImageIconProps) => {
  // const uri = require(`../assets/${name}.svg`)
  return (
    <Svg
      // {...props}
      // uri={uri}
      width={width}
      height={height}
      // className={cn(className, color ? `fill-${color}` : "fill-gray-600")}
    />
  )
}

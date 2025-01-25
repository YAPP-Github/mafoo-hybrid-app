import React from "react"
import { SvgProps, SvgXml } from "react-native-svg"
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
  | "mafooLogo2025"

export interface IconProps extends SvgProps {
  name: IconTypes
  size?: number
  height?: number
  color?: string
}

const Icon = ({
  name,
  size = 24,
  height,
  color = "#000",
  ...props
}: IconProps) => {
  const SvgComponent = iconMap[name].default

  return (
    <SvgComponent
      {...props}
      width={size}
      height={height || size}
      fill={color}
    />
  )
}

export default Icon

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
  color?: string
}

const Icon = ({ name, size = 24, color = "#000", ...props }: IconProps) => {
  const SvgComponent = iconMap[name]()
  console.log(typeof SvgComponent)
  if (!SvgComponent) {
    throw new Error(`Icon not found: ${name}`)
  }

  return (
    <SvgXml
      xml={SvgComponent}
      width={size}
      height={size}
      fill={color}
      onError={(err) => console.log(err)}
    />
  )
}

export default Icon

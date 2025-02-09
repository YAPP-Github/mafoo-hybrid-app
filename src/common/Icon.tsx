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
  | "checkCircleBold"
  | "mafooLogo2025"
  | "mafooCharacter1"

export interface IconProps {
  name: IconTypes
  size?: number
  height?: number
  color?: string
  className?: string
}

const Icon = ({
  name,
  size = 24,
  height,
  color = "#000",
  ...props
}: IconProps) => {
  const SvgIcon = iconMap[name].default

  return (
    <SvgIcon
      {...props}
      width={size}
      height={height || size}
      color={color}
      //className={cn(className, color ? `fill-${color}` : "fill-gray-600")}
    />
  )
}

export default Icon

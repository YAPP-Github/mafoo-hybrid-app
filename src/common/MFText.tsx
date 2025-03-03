import { useMemo } from "react"
import { Text as RNText, TextProps } from "react-native"

interface CustomTextProps extends TextProps {
  font?: "Pretendard" | "SBAggroOTF"
  style?: any
  weight?:
    | "Bold"
    | "Regular"
    | "Thin"
    | "SemiBold"
    | "Black"
    | "ExtraBold"
    | "ExtraLight"
    | "Light"
    | "Medium"
  className?: string
}

const MFText = ({
  font = "Pretendard",
  style,
  weight = "Regular",
  ...rest
}: CustomTextProps) => {
  const customStyle = useMemo(() => {
    return {
      fontFamily: `${font}-${weight}`,
      color: "#000000",
    }
  }, [weight])

  return <RNText style={[customStyle, style]} {...rest} />
}

export default MFText

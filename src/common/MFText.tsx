import { useMemo } from "react"
import { Text as RNText, TextProps } from "react-native"

interface CustomTextProps extends TextProps {
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

const MFText = ({ style, weight = "Regular", ...rest }: CustomTextProps) => {
  const customStyle = useMemo(() => {
    return {
      fontFamily: `Pretendard-${weight}`,
      color: "#000000",
    }
  }, [weight])

  return <RNText style={[customStyle, style]} {...rest} />
}

export default MFText

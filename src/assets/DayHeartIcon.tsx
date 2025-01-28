import { G, Path, SvgXml } from "react-native-svg"
import { IconProps } from "@/types/icon"

const DayHeartIcon = ({ width, height }: IconProps) => {
  return (
    <SvgXml
      width={width || "29"}
      height={height || "28"}
      viewBox="0 0 29 28"
      fill="none"
      xml="http://www.w3.org/2000/svg">
      <G id="Bold / Like / Heart Angle">
        <Path
          id="Subtract"
          d="M9.81539 21.2876C6.53929 18.7635 2.69141 15.7988 2.69141 10.6596C2.69141 4.98616 9.10826 0.962675 14.3581 6.41704L16.6914 8.74879C17.0332 9.09044 17.5872 9.09034 17.9288 8.74857C18.2705 8.4068 18.2704 7.85278 17.9286 7.51113L15.6746 5.25794C20.6213 1.63657 26.0247 5.45339 26.0247 10.6596C26.0247 15.7988 22.1769 18.7635 18.9008 21.2876C18.5602 21.55 18.2259 21.8075 17.9027 22.0623C16.6914 23.0172 15.5247 23.9163 14.3581 23.9163C13.1914 23.9163 12.0247 23.0172 10.8134 22.0623C10.4902 21.8075 10.1559 21.55 9.81539 21.2876Z"
          fill="#F56965"
        />
      </G>
    </SvgXml>
  )
}

export default DayHeartIcon

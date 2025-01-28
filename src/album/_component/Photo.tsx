import { useState } from "react"
import { View, Image } from "react-native"
import { PhotoInfo } from "../types"

export const Photo = ({ photo }: { photo: PhotoInfo }) => {
  const { photoUrl } = photo

  const [height, setHeight] = useState(0)
  //  const { width } = Dimensions.get("window")

  /**
   * RN은 height: auto 사용불가
   * 가로: 화면비율
   * 세로: 이미지 크기
   */
  Image.getSize(photo.photoUrl, (w, h) => {
    setHeight(h * (170 / w))
  })

  return (
    <View className="mb-[13px]">
      <Image
        source={{ uri: photoUrl, height }}
        className="rounded-[12px] border border-gray-200"
        resizeMode="cover"
      />
    </View>
  )
}

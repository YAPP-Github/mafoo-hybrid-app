import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
//import { VariantProps } from "class-variance-authority"
//import { twMerge } from "nativewind"

// import { AlbumValue } from "@/app/album/types"
// import SquareButton from "@/common/SquareButton"
// import { albumItemVariants, photoCountVariants } from "@/styles/variants"
// import Badge from "./Badge"

// export interface WaitingAlbumItemProps
//   extends VariantProps<typeof albumItemVariants> {
//   value: AlbumValue
//   onAccept?: (value: AlbumValue) => void
//   onReject?: (value: AlbumValue) => void
//   className?: string
// }

/**
 * WaitingAlbumItem Component
 * @param value Album 데이터를 나타내는 객체
 * @param onAccept Album 수락 시 호출되는 함수
 * @param onReject Album 거절 시 호출되는 함수
 * @param className 추가적인 스타일링 클래스
 */

// WaitingAlbumItemProps
const WaitingAlbumItem: React.FC<any> = ({
  value,
  onAccept,
  onReject,
  className,
}) => {
  const {
    name: initialName,
    type,
    photoCount,
    isNew,
    isEditable,
    ownerProfileImageUrl,
  } = value

  const [name] = useState(initialName)

  return (
    <View
    //   className={twMerge(
    //     albumItemVariants({ type, isEditable }),
    //     !isEditable && "group",
    //     "flex flex-col justify-between",
    //     className
    // )}>
    >
      <View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-col">
            <Text className="tp-title2-semibold text-gray-800">{name}</Text>
            <Text>
              {/* 위에 Text 대신 <Text className={photoCountVariants({ type })}> */}
              사진 {photoCount}장
            </Text>
          </View>
          {ownerProfileImageUrl && (
            <Image
              source={{ uri: ownerProfileImageUrl }}
              className="h-9 w-9 rounded-full"
              style={{ height: 36, width: 36, borderRadius: 18 }}
              alt="friend"
            />
          )}
        </View>

        {/* {isNew && <Badge className="absolute -left-2 -top-2">New!</Badge>} */}
      </View>
      <View className="flex flex-row justify-between gap-2">
        {/* <SquareButton
          onPress={() => onReject?.(value)}
          className="tp-body2-semibold round-[10px] h-10 grow bg-white px-5 py-0 text-gray-600">
          거절
        </SquareButton>
        <SquareButton
          onPress={() => onAccept?.(value)}
          className="tp-body2-semibold round-[10px] h-10 grow bg-purple-600 px-5 py-0 text-white">
          수락
        </SquareButton> */}
      </View>
    </View>
  )
}

export default WaitingAlbumItem

import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native"
//import { VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

// import { AlbumValue } from "@/app/album/types"
import { albumItemVariants, photoCountVariants } from "@/styles/variants"
import SquareButton from "@/common/SquareButton"
import MFText from "@/common/MFText"
import LinearGradient from "react-native-linear-gradient"
import Badge from "@/common/Badge"
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
 * @param showNewRing 새로운 앨범 하이라이트 여부
 * @param value Album 데이터를 나타내는 객체
 * @param onAccept Album 수락 시 호출되는 함수
 * @param onReject Album 거절 시 호출되는 함수
 * @param className 추가적인 스타일링 클래스
 */

// WaitingAlbumItemProps
const WaitingAlbumItem: React.FC<any> = ({
  showNewRing,
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
      className={twMerge(
        albumItemVariants({
          type,
          isEditable,
          showNewRing: showNewRing ? type : false,
        }),

        !isEditable && "group",
        "flex flex-col justify-between",
        className
      )}>
      <View>
        <View className="flex flex-row justify-between">
          <View className="flex flex-col">
            <MFText className="text-gray-800 text-title2" weight="SemiBold">
              {name}
            </MFText>
            <MFText weight="Regular" className={photoCountVariants({ type })}>
              사진 {photoCount}장
            </MFText>
          </View>
          {ownerProfileImageUrl && (
            <Image
              source={{ uri: ownerProfileImageUrl }}
              className="rounded-full h-9 w-9"
              style={{ height: 36, width: 36, borderRadius: 18 }}
              alt="friend"
            />
          )}
        </View>

        {/* {isNew && (
          <Badge className="absolute -left-2 -top-2">
            <Text>New!</Text>
          </Badge>
        )} */}
      </View>
      <View style={{ gap: 8 }} className="flex flex-row justify-between w-full">
        <Pressable
          onPress={() => onReject?.(value)}
          className="rounded-[10px] flex-1 items-center justify-center py-2.5 bg-white">
          <MFText className="text-gray-600 text-body2" weight="SemiBold">
            거절
          </MFText>
        </Pressable>
        <Pressable onPress={() => onAccept?.(value)} className="flex-1">
          <LinearGradient
            colors={["#C680FF", "#FF82C6"]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 1, y: 1 }}
            className="rounded-[10px] items-center justify-center py-2.5 w-full">
            <MFText className="text-white text-body2" weight="SemiBold">
              수락
            </MFText>
          </LinearGradient>
        </Pressable>

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

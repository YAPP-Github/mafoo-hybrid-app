import MFText from "@/common/MFText"
import { httpToHttps } from "@/utils/formatUrl"
import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

interface FriendElementProps {
  imageUrl: string
  name: string
  tag: string
  isShared: boolean
  onTapShare: () => void
}

const FriendElement = ({
  imageUrl,
  name,
  tag,
  isShared,
  onTapShare,
}: FriendElementProps) => {
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row gap-3">
        <View className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
          <Image
            source={{ uri: httpToHttps(imageUrl) }} // https가 아니면 호출이 안되더라,,,
            resizeMode="cover"
            className="w-[95%] aspect-square rounded-full"
            alt="friend"
          />
        </View>
        <View className="flex-col items-start justify-center">
          <MFText weight="SemiBold" className="text-gray-800 text-title2">
            {name}
          </MFText>
          <MFText weight="Regular" className="text-gray-500 text-body2">
            {tag}
          </MFText>
        </View>
      </View>
      <SharedButton isShared={isShared} onTapShare={onTapShare} />
    </View>
  )
}

const SharedButton = ({
  isShared,
  onTapShare,
}: {
  isShared: boolean
  onTapShare: () => void
}) => {
  const buttonStyle = isShared
    ? "rounded-full bg-gray-100 px-4 py-1.5 flex justify-center items-center text-gray-400"
    : "rounded-full bg-sumone-white px-4 py-1.5 flex justify-center items-center text-gray-700"
  const textStyle = isShared ? "text-gray-400" : "text-gray-700"

  return (
    <TouchableOpacity className={buttonStyle} onPress={onTapShare}>
      <Text className={`text-sm font-medium ${textStyle}`}>
        {isShared ? "공유됨" : "공유하기"}
      </Text>
    </TouchableOpacity>
  )
}

export default FriendElement

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
        <Image
          source={{ uri: imageUrl }}
          className="h-12 w-12 rounded-full"
          alt="friend"
        />
        <View className="flex-col items-start justify-center">
          <Text className="text-base font-semibold text-gray-800">{name}</Text>
          <Text className="text-sm text-gray-500">{tag}</Text>
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

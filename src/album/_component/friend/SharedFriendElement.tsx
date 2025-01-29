import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

interface FriendElementProps {
  imageUrl: string
  name: string
  tag: string
  isOwner: boolean
  isManageVisible: boolean
  onTapShare: () => void
}

const SharedFriendElement = ({
  imageUrl,
  name,
  tag,
  isOwner,
  isManageVisible,
  onTapShare,
}: FriendElementProps) => {
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row gap-2">
        <Image
          source={{ uri: imageUrl }}
          className="h-[54px] w-[54px] rounded-full border-2 border-white"
        />
        <View className="flex flex-col items-start justify-center">
          <Text className="tp-title2-semibold text-gray-800">{name}</Text>
          <Text className="tp-body2-regular text-gray-500">{tag}</Text>
        </View>
      </View>
      {!isOwner && isManageVisible && <ManageButton onTapShare={onTapShare} />}
    </View>
  )
}

const ManageButton = ({ onTapShare }: { onTapShare: () => void }) => {
  return (
    <TouchableOpacity
      className="tp-body2-regular flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-gray-500"
      onPress={onTapShare}>
      <Text>관리</Text>
    </TouchableOpacity>
  )
}

export default SharedFriendElement

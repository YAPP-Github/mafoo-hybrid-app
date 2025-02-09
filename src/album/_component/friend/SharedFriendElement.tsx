import { httpToHttps } from "@/utils/formatUrl"
import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"

interface FriendElementProps {
  imageUrl: string
  name: string
  tag: string
  isPending: boolean
  isOwner: boolean
  isManageVisible: boolean
  onTapShare: () => void
}

const SharedFriendElement = ({
  imageUrl,
  name,
  tag,
  isPending,
  isOwner,
  isManageVisible,
  onTapShare,
}: FriendElementProps) => {
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row gap-2">
        <View className="flex items-center justify-center w-[54px] h-[54px]">
          <Image
            source={{ uri: httpToHttps(imageUrl) }}
            className="w-full h-full border-2 border-white rounded-full"
          />
          {isPending && (
            <View
              style={{ zIndex: 10 }}
              className="absolute z-50 flex items-center justify-center w-12 h-12 ">
              <View className="flex items-center justify-center w-full h-full rounded-full opacity-50 bg-gray-1000">
                <Text className="-mt-5 text-white text-[40px]">...</Text>
              </View>
            </View>
          )}
        </View>
        <View className="flex flex-col items-start justify-center">
          <Text className="text-gray-800 tp-title2-semibold">{name}</Text>
          <Text className="text-gray-500 tp-body2-regular">{tag}</Text>
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

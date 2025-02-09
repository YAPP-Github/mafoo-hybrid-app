import React from "react"
import { View, Text, Image } from "react-native"
import { useGetProfile } from "@/profile/hooks/useProfile"
import MFText from "@/common/MFText"

const Header = () => {
  const { profile } = useGetProfile()

  if (!profile) {
    return null
  }

  return (
    <>
      <MFText
        weight="SemiBold"
        className="text-header2 p-4 py-[14px] text-gray-800">
        마이
      </MFText>
      <View
        className="px-[24px] py-[24px] z-50 items-center justify-center"
        style={{ gap: 12 }}>
        <Image
          source={{ uri: profile.profileImageUrl }}
          alt="프로필 이미지"
          className="h-[108px] w-[108px] rounded-full object-cover"
        />

        <View className="items-center -mb-6" style={{ gap: 6 }}>
          <MFText weight="SemiBold" className="text-gray-800 text-header2">
            {profile.name}
          </MFText>
          <View className="flex flex-col items-center">
            <Text className="text-gray-400 tp-title2-regular">
              #{profile.serialNumber}
            </Text>
            <View className="whitespace-pre rounded-md bg-white px-3 py-2.5 text-gray-700 shadow-sm translate-y-4">
              <MFText weight="Regular" className="text-gray-700 text-body2">
                친구가 나를 찾을 수 있는 번호에요
              </MFText>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

export default Header

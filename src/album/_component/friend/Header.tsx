import React from "react"
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import MFText from "@/common/MFText"
import Icon from "@/common/Icon"
// import Icon from "@/common/Icon"

export interface HeaderProps {
  className?: string
  friendCount: number
}

export const Header: React.FC<HeaderProps> = ({ className, friendCount }) => {
  const navigation = useNavigation()

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-[14px] ${
        className ?? ""
      }`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="altArrowLeftOutline" size={28} />
      </TouchableOpacity>
      <MFText weight="SemiBold" className="text-gray-800 text-title2">
        함께하는 친구 ({friendCount})
      </MFText>
      <View className="w-7" />
    </View>
  )
}

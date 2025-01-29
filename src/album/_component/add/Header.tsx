import React from "react"
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "@/common/Icon" // 아이콘 컴포넌트 경로 유지
import { cn } from "../../../utils" // cn 함수 경로 유지

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  const navigation = useNavigation()

  return (
    <View
      className={cn(
        "flex h-14 w-full flex-row items-center justify-between p-4 py-[14px]",
        className
      )}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="altArrowLeftOutline" size={28} />
      </TouchableOpacity>
      <View />
    </View>
  )
}

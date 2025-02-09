import React from "react"
import { View, Text, TouchableOpacity, Modal } from "react-native"
// import Icon from "@/common/Icon"

interface FriendMenuDialogProps {
  isVisible: boolean
  onTapBackdrop: () => void
  onTapKick: () => void
  onTapPermission: () => void
}

export const FriendMenuDialog: React.FC<FriendMenuDialogProps> = ({
  isVisible,
  onTapBackdrop,
  onTapKick,
  onTapPermission,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onTapBackdrop}>
      <TouchableOpacity
        className="absolute inset-0 bg-gray-800/50"
        activeOpacity={1}
        onPress={onTapBackdrop}
      />
      <View className="absolute bottom-0 w-full rounded-t-2xl bg-sumone-white p-5">
        <View className="flex-row">
          <TouchableOpacity
            className="flex-1 items-center justify-center gap-2 py-4"
            onPress={onTapKick}>
            {/* <Icon name="handShake" size={28} color="gray-500" /> */}
            <Text className="tp-body1-semibold text-gray-600">
              친구 내보내기
            </Text>
          </TouchableOpacity>
          <View className="w-[1px] bg-gray-200" />
          <TouchableOpacity
            className="flex-1 items-center justify-center gap-2 py-4"
            onPress={onTapPermission}>
            {/* <Icon name="permission" size={28} color="gray-500" /> */}
            <Text className="tp-body1-semibold text-gray-600">
              권한 수정하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

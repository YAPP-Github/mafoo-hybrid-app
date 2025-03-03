import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { useReadNotification } from "@/hooks/useReadNotification"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { styled } from "nativewind"
import { useState } from "react"
import { Modal, TouchableOpacity, View } from "react-native"
import { NotificationProps } from "."

interface NotificationMenuProps {
  notificationIds: string[]
  unReadNotificationIds: string[]
  visible: boolean
  closeMenu: () => void
  showDeleteModal: () => void
  readAllNotification: () => void
}

const NotificationMenuAction = {
  DELETE: "DELETE",
  READ: "READ",
} as const

const NotificationMenu = ({
  unReadNotificationIds,
  notificationIds,
  visible,
  closeMenu,
  showDeleteModal,
  readAllNotification,
}: NotificationMenuProps) => {
  const [offset, setOffset] = useState(0)

  const { profile } = useGetProfile()

  const { mutate: readMutate } = useReadNotification(
    profile?.memberId ?? "",
    unReadNotificationIds
  )

  const onTapAction = (action: keyof typeof NotificationMenuAction) => {
    switch (action) {
      case NotificationMenuAction.DELETE:
        showDeleteModal()
        closeMenu()
        break
      case NotificationMenuAction.READ:
        if (unReadNotificationIds?.length > 0) readMutate(unReadNotificationIds) // 모두 읽음
        readAllNotification() // 알림 state 변경
        closeMenu()
        break
    }
  }

  const StyledPressable = styled(TouchableOpacity)

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        activeOpacity={0.45}
        style={{ opacity: 0.45 }}
        className="flex-1 bg-gray-700"
        onPress={closeMenu}
      />
      <View
        className="w-[350px] absolute left-[50%] bottom-[21px] bg-white rounded-[16px] px-[16px] py-[12px]"
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout
          setOffset(-width / 2)
        }}
        style={{ transform: [{ translateX: offset }] }}>
        <View className="flex flex-col">
          {/* 앨범 삭제하기 */}
          <StyledPressable
            className="flex flex-row items-center justify-center py-[12px]"
            onPress={() => onTapAction(NotificationMenuAction.DELETE)}>
            <Icon name="trash" size={28} color="red-500" />
            <MFText
              weight="SemiBold"
              className="text-body1 text-red-500 ml-[10px]">
              모두 삭제
            </MFText>
          </StyledPressable>
          <View className="h-[1px] bg-gray-200 my-[6px]" />
          <StyledPressable
            className="flex flex-row items-center justify-center py-[12px]"
            onPress={() => onTapAction(NotificationMenuAction.READ)}>
            <Icon name="securityEye" size={28} color="gray-600" />
            <MFText
              weight="SemiBold"
              className="text-body1 text-gray-600 ml-[10px]">
              모두 읽음
            </MFText>
          </StyledPressable>
        </View>
      </View>
    </Modal>
  )
}

export default NotificationMenu

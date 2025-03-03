import { useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { Dialog } from "@/album/_component/Dialog"
import Notification from "@/album/_component/notification"
import NotificationHeader from "@/album/_component/notification/NotificationHeader"
import NotificationMenu from "@/album/_component/notification/NotificationMenu"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import PageContainer from "@/common/PageContainer"
import { useGetNotification } from "@/hooks/useNotification"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { useDeleteNotification } from "@/hooks/useDeleteNotification"

const NotificationPage = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false)

  const onTapMenu = () => setMenuOpen(true)

  const { profile } = useGetProfile()

  const { notifications } = useGetNotification(profile?.memberId)

  const notificationIds = notifications.map(
    (notification) => notification.notificationId
  )

  const unReadNotificationIds = notifications
    ?.filter((notification) => !notification?.isRead)
    ?.map((notification) => notification.notificationId)

  const { mutate: deleteMutate } = useDeleteNotification(
    profile?.memberId ?? "",
    notificationIds,
    () => setIsDeleteModalShown(false)
  )

  const deleteDialogProps = {
    title: `정말 알림을 모두 삭제할까요?`,
    confirmBtnContext: "네",
    onClose: () => {
      setIsDeleteModalShown(false)
    },
    onConfirm: deleteMutate,
    visible: isDeleteModalShown,
  }

  const readAllNotification = () => {
    readNotificationFnRef.current?.readAllNotification()
  }

  const readNotificationFnRef = useRef<{ readAllNotification: () => void }>(
    null
  )

  console.log("notifications", notifications)

  return (
    <PageContainer headerProps={{ title: "Notification" }}>
      <View className="flex-1">
        <NotificationHeader onTapMenu={onTapMenu} />
        {notifications.length ? (
          <ScrollView className="flex-1 flex-col px-[16px] py-[12px]">
            {notifications.map(({ paramKey, ...item }, index) => (
              <Notification
                {...item}
                key={`${item.notificationId}-${index}`}
                paramKey={paramKey}
                ref={readNotificationFnRef}
                {...item}
              />
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 bg-gray-50 flex-col items-center">
            <View className="mt-[180px] flex-col items-center">
              <Icon name="emptyAlarmBell" size={64} />
              <MFText
                weight="SemiBold"
                className="text-title2 text-gray-400 mt-[28px]">
                아직 알림이 오지 않았어요.
              </MFText>
            </View>
          </View>
        )}
      </View>
      <NotificationMenu
        notificationIds={notificationIds}
        unReadNotificationIds={unReadNotificationIds}
        visible={menuOpen}
        closeMenu={() => setMenuOpen(false)}
        readAllNotification={readAllNotification}
        showDeleteModal={() => setIsDeleteModalShown(true)}
      />
      {isDeleteModalShown && <Dialog {...deleteDialogProps} />}
    </PageContainer>
  )
}

export default NotificationPage

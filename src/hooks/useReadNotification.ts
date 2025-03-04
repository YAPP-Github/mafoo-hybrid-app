import { markNotificationsAsRead } from "@/api/notification"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { NotificationProps } from "@/album/_component/notification"
import { NOTIFICATIONS } from "@/constants/queryString"

/* 호출 경로
 모두 읽음 - 알림함 그대로
 알림함 개발 알림 클릭 - 랜딩페이지
 시스템 노티 - 알림함 / 랜딩페이지
*/
export const useReadNotification = (
  memberId: string,
  notificationIds: string[]
) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: [...NOTIFICATIONS.READ_NOTIFICATIONS],
    mutationFn: (notificationIds: string[]) =>
      markNotificationsAsRead(memberId, notificationIds),
    onSuccess: () => {
      queryClient.setQueryData(
        [...NOTIFICATIONS.GET_NOTIFICATIONS],

        (prev: NotificationProps[]) => {
          if (!prev) return prev

          const newData = JSON.parse(JSON.stringify(prev))

          notificationIds?.map((notificationId) => {
            const readNotificationIdx = prev.findIndex(
              (noti) => noti.notificationId === notificationId
            )

            if (readNotificationIdx !== -1) {
              newData[readNotificationIdx].isRead = true
            }
          })

          return newData
        }
      )
    },
    onError: (e) => {
      console.error("알림 읽음", e)
    },
  })
  return { mutate }
}

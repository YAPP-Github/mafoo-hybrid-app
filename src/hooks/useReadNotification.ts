import { markNotificationsAsRead } from "@/api/notification"
import { useNavigation } from "@react-navigation/native"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getRouteParams } from "./useForegroundEvent"
import { Notification } from "@notifee/react-native"
import { NotificationProps } from "@/album/_component/notification"
import { NOTIFICATIONS } from "@/constants/queryString"

/* 호출 경로
 모두 읽음 - 알림함 그대로
 알림함 개발 알림 클릭 - 랜딩페이지
 시스템 노티 - 알림함 / 랜딩페이지
*/
export const useReadNotification = (
  memberId: string,
  notificationIds: string[],
  move: boolean, // 이동 여부
  params: any
) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation()

  const { mutate } = useMutation({
    mutationKey: [...NOTIFICATIONS.READ_NOTIFICATIONS],
    mutationFn: (notificationIds: string[]) =>
      markNotificationsAsRead(memberId, notificationIds),
    onSuccess: (data) => {
      /** 낙관적 업데이트 */

      queryClient.setQueryData(
        [...NOTIFICATIONS.GET_NOTIFICATIONS],
        (prev: NotificationProps[]) => {
          // console.log("oldData", prev, notificationIds)
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
          // console.log("newData", newData)
          return newData
        }
      )
      // params 에 따라 페이지 이동 (알림함, 시스템 공통)
      // if (move) {
      //   navigation.navigate(
      //     (params?.routes as any) ?? "AlbumCreate",
      //     getRouteParams(params as any)
      //   )
      // }
    },
    onError: () => {},
  })
  return { mutate }
}

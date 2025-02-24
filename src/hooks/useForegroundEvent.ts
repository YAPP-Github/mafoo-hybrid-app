import notifee, { EventType } from "@notifee/react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { RootStackParamList } from "./usePostAlbum"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { useReadNotification } from "./useReadNotification"
import { fcmNotificationParams } from "@/types/notifications"
import { fcmNotification } from "./useForegroundMessage"

/**
 * foreground 푸시 알림 이벤트 수신 핸들러
 * 알림 종류별 페이지 이동 로직 구현
 * navigation provider 안에서 동작
 * hasButton true: 알림함, false: url
 */
export interface fcmNotificationResponse {
  data: { redirectUrl: string } & fcmNotificationParams
  from: string
  messageId: string
  notification: fcmNotification
}

export function getRouteParams(
  data: { route: string; key: string | null } | undefined
) {
  let result = {}
  if (!data) return result

  // `route`에 따라 `key` 값을 다르게 설정
  switch (data.route) {
    case "Recap":
      result = { recapUrl: data.key }
      break
    case "SharedFriend":
    case "AlbumDetail":
    case "AddFriend":
      result = { albumId: data.key }
      break
    default:
      result = {} // 다른 route인 경우 기본 값
      break
  }

  return result
}

export function useForegroundEvent() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const { profile } = useGetProfile()
  const { mutate } = useReadNotification("", [], false, null)

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (
        type === EventType.PRESS &&
        (detail.pressAction?.id === "open_detail" || // android
          detail.notification?.ios?.categoryId === "open_detail_category") // ios
      ) {
        //console.log("f 알림 읽음 API 호출", profile?.memberId)

        const data = detail?.notification?.data

        //  mutate({ profile?.memberId, [data?.notificationId] }) TODO: api 확인
        // console.log("f 알림 클릭됨 - 상세 페이지로 이동", detail)
        navigation.navigate(
          (data?.routes as any) ?? "AlbumCreate",
          getRouteParams(data as any)
        )
      }
    })

    return () => unsubscribe()
  }, [navigation])
}

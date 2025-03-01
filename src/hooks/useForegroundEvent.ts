import { useEffect } from "react"
import notifee, { EventType } from "@notifee/react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { useReadNotification } from "./useReadNotification"
import { fcmNotificationParams } from "@/types/notifications"
import { fcmNotification } from "./useForegroundMessage"
import { useAuth } from "@/store/auth/AuthProvider"
import { RootStackParamList } from "@/types/routeParams"

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
  data:
    | {
        route: keyof RootStackParamList
        key: string | null
        buttonType?: null | boolean
      }
    | undefined
) {
  let result = {}
  if (!data) return result

  if (data?.buttonType) return "Notification"

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

  const { status } = useAuth()

  // const isSignedIn = status === "signIn"

  // const { profile } = isSignedIn ? useGetProfile() : { profile: null }
  // const { mutate } = isSignedIn
  //   ? useReadNotification(profile?.memberId ?? "", [])
  //   : { mutate: null }

  useEffect(() => {
    // iOS, android

    const unsubscribe = notifee.onForegroundEvent(async ({ type, detail }) => {
      console.log("foreground event!!")
      if (
        type === EventType.PRESS &&
        (detail.pressAction?.id === "open_detail" || // android
          detail.notification?.ios?.categoryId === "open_detail_category") // ios
      ) {
        const data = detail?.notification?.data

        // if (isSignedIn && profile?.memberId && data?.notificationId && mutate) {
        //   // mutate([data.notificationId] as any)

        //   navigation.navigate(
        //     (data?.route as any) ?? "AlbumCreate",
        //     getRouteParams(data as any)
        //   )
        // }
      }
    })

    return () => unsubscribe()
  }, [navigation])
}

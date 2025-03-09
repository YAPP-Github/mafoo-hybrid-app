import { useEffect } from "react"
import notifee, { EventType } from "@notifee/react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { fcmNotificationParams } from "@/types/notifications"
import { fcmNotification } from "./useForegroundMessage"
import { useAuth } from "@/store/auth/AuthProvider"
import { RootStackParamList } from "@/types/routeParams"
import { getMyProfile } from "@/api/signIn"
import { markNotificationsAsRead } from "@/api/notification"
import { useQueryClient } from "@tanstack/react-query"
import { NOTIFICATIONS } from "@/constants/queryString"

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
        paramKey: string | null
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
      result = { recapUrl: data.paramKey }
      break
    case "SharedFriend":
    case "AlbumDetail":
    case "AddFriend":
      result = { albumId: data.paramKey }
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

  const queryClient = useQueryClient()

  const isSignedIn = status === "signIn"

  const readAndMove = async (data: any) => {
    try {
      const profile = await getMyProfile()

      if (isSignedIn && profile?.memberId && data?.notificationId) {
        /** 읽음 처리 */
        await markNotificationsAsRead(profile.memberId, [data.notificationId])

        /** 알림 목록 갱신 */
        await queryClient.invalidateQueries({
          queryKey: [...NOTIFICATIONS.GET_NOTIFICATIONS],
        })

        // 알림함으로 이동
        if (data?.buttonType === "INVITATION_ACCEPT") {
          navigation.navigate("Notification")
        } else {
          navigation.navigate(
            (data?.route as any) ?? "AlbumCreate",
            getRouteParams(data as any)
          )
        }
      }
    } catch (e) {
      console.error("me", e)
      // 이미 삭제된 알림인 경우 Toast 메시지 추가
    }
  }

  useEffect(() => {
    // iOS, android
    const unsubscribe = notifee.onForegroundEvent(async ({ type, detail }) => {
      if (
        type === EventType.PRESS &&
        (detail.pressAction?.id === "open_detail" || // android
          detail.notification?.ios?.categoryId === "open_detail_category") // ios
      ) {
        const data = detail?.notification?.data

        if (data?.buttonType) {
          navigation.navigate("Notification")
        } else if (data) {
          await readAndMove(data)
        } else {
          console.error("data 없음")
        }
      }
    })

    return () => unsubscribe()
  }, [navigation])
}

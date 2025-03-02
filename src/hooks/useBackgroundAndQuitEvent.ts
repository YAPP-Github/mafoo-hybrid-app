import { useAuth } from "@/store/auth/AuthProvider"
import { useDeepLinkStore } from "@/store/notification"
import { RootStackParamList } from "@/types/routeParams"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { getRouteParams } from "./useForegroundEvent"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { markNotificationsAsRead } from "@/api/notification"

export const useBackgroundAndQuitEvent = () => {
  const { deepLinkUrl, removeDeepLink } = useDeepLinkStore()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const { status } = useAuth()

  // 로그인 안된 상태에서 도달 가능 여부 확인
  const { profile } = useGetProfile()

  // 로그인, app loading 끝나면 실행, background, quit 모두 처리
  useEffect(() => {
    const openDeepLinkUrl = async () => {
      const deepLink = deepLinkUrl

      console.log("store deepLink", deepLink)

      if (
        status === "signIn" &&
        deepLink &&
        deepLink?.route &&
        deepLink?.notificationId &&
        profile?.memberId
      ) {
        // 읽음 처리
        try {
          const data = markNotificationsAsRead(profile.memberId, [
            deepLink.notificationId,
          ])
          navigation.navigate(
            deepLink?.route as any,
            getRouteParams(deepLink as any)
          )
          console.log(
            "로그인 완료, store 저장된 링크로 이동 background, quit",
            data
          )
          // 사용한 deepLink 소진
          removeDeepLink()
        } catch (e) {
          console.error(e)
        }
      } else {
        console.log("Cannot open url:", deepLink)
      }
    }
    openDeepLinkUrl()
  }, [status, deepLinkUrl])
}

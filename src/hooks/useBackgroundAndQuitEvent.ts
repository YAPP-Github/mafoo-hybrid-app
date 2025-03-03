import { useAuth } from "@/store/auth/AuthProvider"
import { DeepLinkUrl, useDeepLinkStore } from "@/store/notification"
import { RootStackParamList } from "@/types/routeParams"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { getRouteParams } from "./useForegroundEvent"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { markNotificationsAsRead } from "@/api/notification"
import { useQueryClient } from "@tanstack/react-query"
import { NOTIFICATIONS } from "@/constants/queryString"

export const useBackgroundAndQuitEvent = () => {
  const { deepLinkUrl, removeDeepLink } = useDeepLinkStore()
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const { status } = useAuth()
  const { profile } = useGetProfile()
  const queryClient = useQueryClient()

  const isSignedIn = status === "signIn"

  useEffect(() => {
    const openDeepLinkUrl = async () => {
      const deepLink = deepLinkUrl as DeepLinkUrl

      const isValidUrl = deepLink?.route && deepLink?.notificationId

      if (isSignedIn && isValidUrl && profile?.memberId) {
        try {
          await markNotificationsAsRead(profile.memberId, [
            deepLink.notificationId!,
          ])
          await queryClient.invalidateQueries({
            queryKey: [...NOTIFICATIONS.GET_NOTIFICATIONS],
          })
          // TODO: Screen 별 param 명확하게 설정
          navigation.navigate(
            deepLink?.route as any,
            getRouteParams(deepLink as any)
          )
          removeDeepLink()
        } catch (e) {
          console.error(e)
        }
      }
    }
    openDeepLinkUrl()
  }, [status, deepLinkUrl])
}

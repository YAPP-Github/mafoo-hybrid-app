import { Linking } from "react-native"
import messaging from "@react-native-firebase/messaging"
import { useAuth } from "@/store/auth/AuthProvider"
import { LinkingOptions } from "@react-navigation/native"
import { RootStackParamList } from "@/types/routeParams"
import { DeepLinkUrl, useDeepLinkStore } from "@/store/notification"

export const useLinking = (): LinkingOptions<RootStackParamList> => {
  const { status } = useAuth()

  const isSignedIn = status === "signIn"

  const { setDeepLink } = useDeepLinkStore()

  return {
    prefixes: ["mafoo://"],
    config: {
      initialRouteName: isSignedIn ? "Album" : "Home",
      screens: {
        Home: "Home",
        Album: "Album",
        Notification: "Notification",
        AlbumCreate: "AlbumCreate",
        Profile: "Profile",
        AlbumDetail: {
          path: "AlbumDetail",
          parse: {
            albumId: (albumId: string) => albumId,
          },
        },
        AddFriend: {
          path: "AddFriend",
          parse: {
            albumId: (albumId: string) => albumId,
          },
        },
        SharedFriend: {
          path: "SharedFriend",
          parse: {
            albumId: (albumId: string) => albumId,
          },
        },
        Recap: {
          path: "Recap",
          parse: {
            recapUrl: (recapUrl: string) => recapUrl,
          },
        },
        Frame: {
          path: "Frame",
          parse: {},
        },
      },
    },
    async getInitialURL() {
      // getInitialNotification: When the application is opened from a quit state.
      const message = await messaging().getInitialNotification()

      const data = message?.data as DeepLinkUrl

      // 시스템 노티를 통해서 들어온게 아닌 앱 아이콘으로 들어온 경우
      if (!data) {
        return isSignedIn ? "mafoo://Album" : "mafoo://Home"
      }
      setDeepLink(data)
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url)

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener("url", onReceiveURL)

      //onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(
        (remoteMessage) => {
          const data = remoteMessage?.data as DeepLinkUrl
          if (data) setDeepLink(data)
        }
      )
      return () => {
        linkingSubscription.remove()
        unsubscribe()
      }
    },
  }
}

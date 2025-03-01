import { Linking } from "react-native"
import messaging from "@react-native-firebase/messaging"
import { useAuth } from "@/store/auth/AuthProvider"
import { buildDeepLinkFromNotificationData } from "@/utils/buildDeepLinkFromNotificationData"
import { LinkingOptions } from "@react-navigation/native"
import { RootStackParamList } from "@/types/routeParams"
import { DeepLinkUrl, useDeepLinkStore } from "@/store/notification"

export const useLinking = (): LinkingOptions<RootStackParamList> => {
  const { status } = useAuth()

  const isSignedIn = status === "signIn"

  const { setDeepLink } = useDeepLinkStore() // fcm

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
          parse: {
            //recapUrl: (albumInfo: AlbumInfo) => albumInfo,
          },
        },
      },
    },
    async getInitialURL() {
      // getInitialNotification: When the application is opened from a quit state.
      const message = await messaging().getInitialNotification()

      console.log("useLinking foreground", message)

      const params = message?.data?.params as DeepLinkUrl

      // fcm 을 통해서 들어온게 아닌 경우 (앱 아이콘으로 들어온 경우)
      if (!message || (!message?.data && !params)) {
        console.log(
          "앱 아이콘 클릭",
          isSignedIn ? "mafoo://Album" : "mafoo://Home"
        )
        return isSignedIn ? "mafoo://Album" : "mafoo://Home"
      }

      // quit: 푸시 알림으로 열렸을 때
      // 여기서 직접 이동하지 말고 null 리턴, storage에 저장.
      if (params) {
        console.log("params", params, "store 저장")
        setDeepLink(params)
      }
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url)

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener("url", onReceiveURL)

      //onNotificationOpenedApp: When the application is running, but in the background.
      const unsubscribe = messaging().onNotificationOpenedApp(
        (remoteMessage) => {
          console.log("background", remoteMessage)

          const params = remoteMessage?.data?.params as DeepLinkUrl

          if (params) {
            console.log("params", params, "store 저장")
            setDeepLink(params)
          }
        }
      )

      return () => {
        linkingSubscription.remove()
        unsubscribe()
      }
    },
  }
}

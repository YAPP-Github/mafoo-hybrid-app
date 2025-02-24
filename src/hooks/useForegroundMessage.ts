import { useEffect } from "react"
import messaging from "@react-native-firebase/messaging"
import notifee from "@notifee/react-native"
import { useQueryClient } from "@tanstack/react-query"
import { NOTIFICATIONS } from "@/constants/queryString"

export interface fcmNotification {
  body: string
  title: string
}

// onMessage: foreground message control
// Code executred via this handler has access to React Context
// and is able to interact with your application (e.g. updating the state or UI)
export const useForegroundMessage = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    // data property: custom data + notification data

    // notification property: device will not show any notification to user.
    // Instead, you could trigger a local notification or update the in-app UI to signal a new notification.
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("remoteMessage", remoteMessage)

      /** 시스템 노티 출력 */
      onDisplayNotification(remoteMessage)
    })

    return unsubscribe
  }, [])

  async function onDisplayNotification(remoteMessage: any) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    })

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      data: remoteMessage.data, // send custom data
      android: {
        channelId,
        smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: "open_detail", // android 클릭 이벤트 처리
        },
      },
      ios: {
        categoryId: "open_detail_category",
      },
    })

    await queryClient.invalidateQueries({
      queryKey: [...NOTIFICATIONS.GET_NOTIFICATIONS],
    })
  }
}

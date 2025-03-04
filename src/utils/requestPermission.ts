import messaging from "@react-native-firebase/messaging"
import { PermissionsAndroid, Platform, Linking } from "react-native"

// trigger a native permission dialog requesting the user's permission.
export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().hasPermission()

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      // 권한이 이미 허용된 경우
      console.log("ios Authorization status: ", authStatus)
      return true
    } else {
      if (Platform.OS === "ios") {
        // iOS 에서 권한 요청 - 한번 거절되면 denied 반환
        const authStatus = await messaging().requestPermission()
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL

        console.log("authStatus", authStatus)

        if (enabled) return enabled

        if (authStatus === messaging.AuthorizationStatus.DENIED) {
          Linking.openSettings()
        }

        return enabled
      } else if (Platform.OS === "android") {
        // API level 32 and below, always return true
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: "Mafoo App Notification Permission",
              message:
                "Mafoo App needs Notification permission " +
                "so you can take real-time news.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the notification")
            return true
          } else {
            console.log("Notificaiton permission denied")
            return false
          }
        } catch (err) {
          console.warn(err)
          return false
        }
      } else {
        // 기타 플랫폼 (Web)
        return false
      }
    }
  } catch (err) {
    console.error("Notification permission error:", err)
    return false
  }
}

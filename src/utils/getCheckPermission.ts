import { PermissionsAndroid, Platform } from "react-native"

/** media 접근 권한 */
export const requestAndroidPermissions = async () => {
  if (Platform.OS !== "android") return true

  try {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, // Android 13+
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO, // Android 13+
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, // Android 12 이하
    ])

    return Object.values(result).every(
      (status) => status === PermissionsAndroid.RESULTS.GRANTED
    )
  } catch (error) {
    console.error("권한 요청 오류:", error)
    return false
  }
}

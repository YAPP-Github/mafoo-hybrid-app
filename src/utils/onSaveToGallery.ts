import { Alert, Platform } from "react-native"
import { hasAndroidPermission } from "./getCheckPermission"
import { CameraRoll } from "@react-native-camera-roll/camera-roll"
import RNFS from "react-native-fs"

export const onSaveGallery = async (uri: string, fileName: string) => {
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    Alert.alert("Access Denied", "권한을 허용해주세요.")
    return
  }

  // 확장자 추가
  const path = `${RNFS.CachesDirectoryPath}/${fileName}.jpg`

  // uri to local string
  const result = await RNFS.downloadFile({ fromUrl: uri, toFile: path }).promise

  if (result.statusCode === 200) {
    await CameraRoll.save(`file://${path}`, { type: "photo" })
      .then((onfulfilled) => {
        console.log("onfulfilled", onfulfilled)
        Alert.alert("Success", "갤러리에 저장되었습니다.")
      })
      .catch((error) => {
        Alert.alert(`${error.message}`, "사진 저장 실패했습니다.")
        console.log(error.message)
      })
  }
}

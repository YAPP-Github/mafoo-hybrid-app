import { Alert, Linking, Platform } from "react-native"
import { hasAndroidPermission } from "./getCheckPermission"
import { CameraRoll } from "@react-native-camera-roll/camera-roll"
import RNFS from "react-native-fs"

export const onSaveGallery = async (uri: string, fileName: string) => {
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    Alert.alert(
      "권한이 필요합니다",
      "설정에서 이미지와 비디오 파일 접근 권한을 허용해주세요.",
      [
        {
          text: "설정으로 이동",
          onPress: () => {
            // 설정 페이지로 이동
            Linking.openSettings()
          },
        },
        {
          text: "취소",
          style: "cancel",
        },
      ]
    )
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

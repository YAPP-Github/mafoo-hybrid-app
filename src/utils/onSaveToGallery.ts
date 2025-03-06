import { Alert, Platform } from "react-native"
import { requestAndroidPermissions } from "./getCheckPermission"
import { CameraRoll } from "@react-native-camera-roll/camera-roll"
import RNFS from "react-native-fs"

export const onSaveGallery = async (uri: string, fileName: string) => {
  if (Platform.OS === "android" && !requestAndroidPermissions()) {
    Alert.alert(
      "권한이 필요합니다",
      "설정에서 이미지와 비디오 파일 접근 권한을 허용해주세요.",
      [
        {
          text: "허용",
          onPress: () => {
            requestAndroidPermissions()
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

  const isVideo = fileName === "recap"

  const path = isVideo
    ? `${RNFS.CachesDirectoryPath}/${fileName}.mp4`
    : `${RNFS.CachesDirectoryPath}/${fileName}.jpg`

  const result = await RNFS.downloadFile({ fromUrl: uri, toFile: path }).promise

  if (result.statusCode === 200) {
    await CameraRoll.save(`file://${path}`, {
      type: isVideo ? "video" : "photo",
    })
      .then((onfulfilled) => {
        console.log("onfulfilled", onfulfilled)
        Alert.alert("Success", "갤러리에 저장되었습니다.")
      })
      .catch((error) => {
        Alert.alert(`${error.message}`, "저장 실패했습니다.")
        console.log(error.message)
      })
  }
}

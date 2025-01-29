import { postQrCode } from "@/api/photo"
import React, { useEffect, useState } from "react"
import { Alert, Text, Vibration, View } from "react-native"
import { Camera, CameraType } from "react-native-camera-kit"
import { OnReadCodeData } from "react-native-camera-kit/dist/CameraProps"

const ScannerPage = ({ navigation }: any) => {
  const [scaned, setScaned] = useState(true)

  const onBarCodeRead = async (event: OnReadCodeData) => {
    if (!scaned) {
      return
    }
    setScaned(false)
    console.log(event.nativeEvent.codeStringValue)
    Vibration.vibrate()
    const response = await postQrCode(event.nativeEvent.codeStringValue)
    console.log(response)
    Alert.alert("QR Code", event.nativeEvent.codeStringValue, [
      { text: "OK", onPress: () => setScaned(true) },
    ])
  }

  useEffect(() => {
    setScaned(true)
  }, [])

  return (
    <View className="flex-1">
      {/* 오버레이 영역 */}
      <View className="absolute top-0 bottom-0 left-0 right-0 z-10">
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
          className="flex-row items-end justify-center flex-1">
          <Text className="font-semibold text-center text-white mb-14 text-title1">
            {"QR코드를 스캔해\n인생네컷을 저장해요"}
          </Text>
        </View>
        <View className="flex-row h-48">
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
            className="flex-1"
          />
          <View className="items-center justify-center w-48 h-48 bg-transparent border-4 border-green-600" />
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
            }}
            className="flex-1"
          />
        </View>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
          className="flex-row items-start justify-center flex-1">
          <Text className="mt-12 text-center text-white font-regular text-body2">
            지원하지 않는 브랜드라면 웹사이트를 열어드려요.
          </Text>
        </View>
      </View>
      {/* 카메라 */}
      <Camera
        className="flex-1"
        cameraType={CameraType.Back}
        zoomMode="on"
        focusMode="on"
        scanBarcode
        onReadCode={onBarCodeRead}
      />
    </View>
  )
}

export default ScannerPage

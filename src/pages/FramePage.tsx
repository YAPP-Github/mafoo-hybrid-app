import {
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native"
import { useCallback, useRef } from "react"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { photo } from "@/dummy"
import { recapColorLinearGradient } from "@/styles/variants"
import LinearGradient from "react-native-linear-gradient"
import RedSvgFrame from "@/assets/frame/redFrame.svg"
import ViewShot, { captureRef } from "react-native-view-shot"
import { useNavigation } from "@react-navigation/native"

const nativeProp = Platform.OS === "ios" ? "source" : "src"

const FramePage = () => {
  const viewRef = useRef<any>()
  const imageRef = useRef<any>()

  const onCapture = useCallback(async () => {
    for (let index = 0; index < photo.length; index++) {
      imageRef.current?.setNativeProps({
        [nativeProp]: [photo[index].photoUrl],
      })

      await new Promise((resolve) => setTimeout(resolve, 100))

      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.8,
      })
      // console.log("uri", uri)
    }
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Header />
      <View className="flex-1 bg-black text-sumone-white mt-[10px]">
        <ViewShot
          ref={viewRef}
          style={{
            flex: 1,
            borderRadius: 24,
          }}>
          {/* 배경 Gradient */}
          <LinearGradient
            className="rounded-[24px] flex-1 items-center justify-center"
            {...recapColorLinearGradient.HEART}>
            {/* Frame */}
            <RedSvgFrame className="absolute flex-1 z-10" />
            <View className="z-10 flex-col">
              <View className="flex-row items-center justify-center">
                <MFText
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 25,
                    letterSpacing: 0.36,
                  }}
                  className="text-sumone-white mr-[4px]">
                  @수연님의
                </MFText>
                <Icon name="mafooLogo" color="white" size={64} />
              </View>
            </View>
            <Image
              // TODO: resizeMode: 기존 크기 유지 OR 프레임 크기 유지
              ref={imageRef}
              resizeMode="center"
              key={photo[0].photoId}
              width={300}
              height={500}
              source={{ uri: photo[0].photoUrl }}
              className=""
            />
          </LinearGradient>
        </ViewShot>
        <View className="w-full h-[108px] flex-row gap-[12px] mt-[12px] px-[24px]">
          <TouchableOpacity
            onPress={() => {
              onCapture()
            }}
            className="flex-row h-14 flex-1 items-center justify-center rounded-[100px] bg-gray-800 text-white">
            <MFText
              weight="SemiBold"
              className="text-body1 mr-[6px] text-sumone-white">
              이 프레임으로 만들게요
            </MFText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default FramePage

const Header = () => {
  const navigation = useNavigation()

  return (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="altArrowLeftOutline" size={28} />
      </TouchableOpacity>
      <MFText weight="SemiBold" className="flex-row text-white">
        프레임 선택
      </MFText>
      <MFText className="w-[28px]" />
    </View>
  )
}

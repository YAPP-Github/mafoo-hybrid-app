import { useRef } from "react"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { recapColorLinearGradient } from "@/styles/variants"
import { SafeAreaView, TouchableOpacity, View } from "react-native"
import Video, { VideoRef } from "react-native-video"
import LinearGradient from "react-native-linear-gradient"

// VideoPlayer Page
const RecapPage = () => {
  const videoRef = useRef<VideoRef>(null)

  const onBuffer = () => console.log("onBuffer")

  const onError = () => console.log("onError")

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 bg-black text-sumone-white mt-[10px]">
        {/* Video Container */}
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 24,
          }}>
          <View className="z-10 flex-col">
            <Video
              source={
                {
                  // uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                }
              }
              ref={videoRef}
              onBuffer={onBuffer} // callback when remote video is buffering
              onError={onError} // callback when video cannot be loaded
            />
          </View>
        </View>
        <View className="w-full h-[108px] flex-row gap-[12px] mt-[12px] px-[24px]">
          <TouchableOpacity
            onPress={() => {}}
            className="flex-row h-14 flex-1 items-center justify-center gap-[6px] rounded-[100px] bg-gray-800 px-6 text-white">
            <Icon name="downloadBold" size={28} color="white" />
            <MFText
              weight="SemiBold"
              className="text-body1 mr-[6px] text-sumone-white">
              다운로드
            </MFText>
          </TouchableOpacity>
          <LinearGradient
            {...recapColorLinearGradient.INSTA}
            className="rounded-[100px] h-14">
            <TouchableOpacity
              onPress={() => {}}
              className="flex-row flex-1 items-center justify-center gap-[6px] px-6 text-white">
              <Icon name="insta" size={28} color="white" />
              <MFText
                weight="SemiBold"
                className="text-body1 mr-[6px] text-sumone-white">
                인스타 공유
              </MFText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RecapPage

import { useRef } from "react"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { recapColorLinearGradient } from "@/styles/variants"
import { SafeAreaView, TouchableOpacity, View } from "react-native"
import Video, { VideoRef } from "react-native-video"
import LinearGradient from "react-native-linear-gradient"
import RecapVideoSample from "../assets/recapSampleVideo.mp4"

interface RecapPageProps {
  route: {
    params: {
      recapUrl: string
    }
  }
}

// VideoPlayer Page
const RecapPage = ({ route }: RecapPageProps) => {
  const videoRef = useRef<VideoRef>(null)

  const recapUrl = route?.params?.recapUrl ?? null

  const onBuffer = () => {
    console.log("onBuffer")
  }

  const onError = (e: any) => console.log("onError ee", console.error(e))

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 bg-black text-sumone-white mt-[10px]">
        {/* Video Container */}
        <View className="flex-1 bg-white rounded-[24px] z-10">
          <View className="flex-col flex-1 z-5 rounded-[24px]">
            <Video
              source={
                recapUrl && recapUrl?.length > 0
                  ? {
                      uri: route?.params?.recapUrl,
                      headers: { Pragma: "no-cache" },
                    }
                  : require("../assets/recapSampleVideo.mp4")
              }
              ref={videoRef}
              onBuffer={onBuffer} // callback when remote video is buffering
              onLoad={(e) => console.log("onLoad", e)}
              onError={onError} // callback when video cannot be loaded
              resizeMode="cover"
              repeat
              style={{ flex: 1, borderRadius: 24 }}
            />
          </View>
        </View>
        <View className="w-full h-[108px] flex-row gap-[12px] mt-[12px] px-[24px]">
          <TouchableOpacity
            onPress={() => {}}
            className="flex-row h-14 flex-1 items-center justify-center rounded-[100px] bg-gray-800 text-white">
            <Icon name="downloadBold" size={28} color="white" />
            <MFText
              weight="SemiBold"
              className="text-body1 text-sumone-white ml-[6px]">
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

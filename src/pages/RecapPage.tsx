import { useRef } from "react"
import { Alert, View, TouchableOpacity } from "react-native"
import Video, { VideoRef } from "react-native-video"
import Svg, { Defs, Rect, Mask } from "react-native-svg"
import LinearGradient from "react-native-linear-gradient"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { recapColorLinearGradient } from "@/styles/variants"
import { onSaveGallery } from "@/utils/onSaveToGallery"
import PageContainer from "@/common/PageContainer"
import { useNavigation } from "@react-navigation/native"

export interface RecapPageProps {
  route: {
    params: {
      recapUrl: string
    }
  }
}

const RecapPage = ({ route }: RecapPageProps) => {
  const videoRef = useRef<VideoRef>(null)

  const navigation = useNavigation()

  const recapUrl = route?.params?.recapUrl ?? null

  const onBuffer = () => console.log("onBuffer")
  const onError = (e: any) => console.log("onError", console.error(e))

  return (
    <PageContainer statusBarColor="#000000" homeIndicatorColor="#000000">
      <View className="relative flex-1 bg-black">
        <View className="relative flex-1 w-full items-center justify-center">
          <Video
            source={
              recapUrl
                ? { uri: recapUrl, headers: { Pragma: "no-cache" } }
                : require("../assets/recapSampleVideo.mp4")
            }
            ref={videoRef}
            onBuffer={onBuffer}
            onError={onError}
            resizeMode="cover"
            repeat
            className="w-full h-full rounded-[24px] overflow-hidden"
          />
          {/* <View className="absolute top-[14px] left-[14px] w-[36px] h-[36px]">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}>
              <Icon
                name="closeCircleBold"
                size={36}
                className="absolute text-black/20"
              />
            </TouchableOpacity>
          </View> */}
          <Svg className="absolute inset-0 w-full h-full">
            <Defs>
              <Mask id="roundedRectMask">
                <Rect width="100%" height="100%" fill="white" />
                <Rect
                  x="5%"
                  y="5%"
                  width="90%"
                  height="90%"
                  rx="24"
                  ry="24"
                  fill="black"
                />
              </Mask>
            </Defs>
          </Svg>
        </View>

        {recapUrl && (
          <View className="w-full h-[108px] flex-row mt-[12px] px-[24px]">
            <DownloadButton url={recapUrl} />
            <InstagramShareButton url={recapUrl} />
          </View>
        )}
      </View>
    </PageContainer>
  )
}

export default RecapPage

const DownloadButton = ({ url }: { url: string }) => (
  <TouchableOpacity
    onPress={() => onSaveGallery(url, "recap")}
    className="flex-row h-14 flex-1 items-center justify-center rounded-[100px] bg-gray-800 text-white">
    <Icon name="downloadBold" size={28} color="white" />
    <MFText weight="SemiBold" className="text-body1 text-sumone-white ml-[6px]">
      다운로드
    </MFText>
  </TouchableOpacity>
)

const InstagramShareButton = ({ url }: { url: string }) => (
  <LinearGradient
    {...recapColorLinearGradient.INSTA}
    className="rounded-[100px] h-14 ml-[12px]">
    <TouchableOpacity
      onPress={() => Alert.alert("준비중", "준비중입니다...")}
      className="flex-row flex-1 items-center justify-center gap-[6px] px-6 text-white">
      <Icon name="insta" size={28} color="white" />
      <MFText
        weight="SemiBold"
        className="text-body1 mr-[6px] text-sumone-white">
        인스타 공유
      </MFText>
    </TouchableOpacity>
  </LinearGradient>
)

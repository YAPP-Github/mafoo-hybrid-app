import {
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native"
import { useCallback, useEffect, useRef, useState } from "react"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { photo } from "@/dummy"
import { recapColorLinearGradient } from "@/styles/variants"
import LinearGradient from "react-native-linear-gradient"
import HEART from "@/assets/frame/HEART.svg"
import BUILDING from "@/assets/frame/BUILDING.svg"
import FIRE from "@/assets/frame/FIRE.svg"
import SMILE_FACE from "@/assets/frame/SMILE_FACE.svg"
import BASKETBALL from "@/assets/frame/BASKETBALL.svg"
import STARFALL from "@/assets/frame/STARFALL.svg"

import ViewShot, { captureRef } from "react-native-view-shot"
import { useNavigation } from "@react-navigation/native"
import VideoLoading from "@/album/_component/VideoLoading"
import { AlbumType } from "@/album/types"

const nativeProp = Platform.OS === "ios" ? "source" : "src"

export type FramePageProps = {
  route?: {
    params: {
      albumInfo: any
    }
  }
}

const FramePage = ({ route }: FramePageProps) => {
  const { albumInfo } = route?.params || {}
  const [isRecapOpen, setIsRecapOpen] = useState(false)
  const [frame, setFrame] = useState<AlbumType>("HEART")
  const viewRef = useRef<any>()
  const imageRef = useRef<any>()

  useEffect(() => {
    setFrame(albumInfo.type)
  }, [])

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
      console.log("uri", uri)
    }
  }, [])

  const closeRecapModal = () => {
    setIsRecapOpen(false)
  }

  // useEffect(() => {
  //   if (isRecapOpen) {
  //     // generateRecap(albumInfo.albumId).then(
  //     //   (data) => {
  //     //     console.log(data.recapUrl)
  //     //     setVideoUrl(data.recapUrl)
  //     //   },
  //     //   (error) => {
  //     //     console.error(error)
  //     //     setIsRecapOpen(false)
  //     //   }
  //     // )
  //   }
  // }, [isRecapOpen])

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
            {...recapColorLinearGradient[frame]}>
            {/* Frame */}
            {frame === "HEART" && <HEART className="absolute flex-1 z-10" />}
            {frame === "BUILDING" && (
              <BUILDING className="absolute flex-1 z-10" />
            )}
            {frame === "STARFALL" && (
              <STARFALL className="absolute flex-1 z-10" />
            )}
            {frame === "FIRE" && <FIRE className="absolute flex-1 z-10" />}
            {frame === "SMILE_FACE" && (
              <SMILE_FACE className="absolute flex-1 z-10" />
            )}
            {frame === "BASKETBALL" && (
              <BASKETBALL className="absolute flex-1 z-10" />
            )}

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
        <View className="flex-row justify-between p-[20px]">
          {["HEART", "FIRE", "BASKETBALL", "BUILDING", "STARFALL"].map(
            (item, index) => (
              <TouchableOpacity
                key={`${item}-${index}`}
                onPress={() => setFrame(item as AlbumType)}>
                <LinearGradient
                  key={item}
                  className="rounded-[24px] w-[45px] h-[45px]"
                  {...recapColorLinearGradient[item as AlbumType]}
                />
              </TouchableOpacity>
            )
          )}
        </View>
        <View className="w-full h-[108px] flex-row gap-[12px] mt-[12px] px-[24px]">
          <TouchableOpacity
            onPress={() => {
              onCapture()
              setIsRecapOpen(true)
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
      <VideoLoading
        visible={isRecapOpen}
        type={albumInfo.type}
        closeRecapModal={closeRecapModal}
      />
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

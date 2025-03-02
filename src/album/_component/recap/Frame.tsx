import { useEffect, useRef, useState } from "react"
import { recapColorLinearGradient } from "@/styles/variants"
import { Image, Text, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import ViewShot, { captureRef } from "react-native-view-shot"

import HEART from "@/assets/frame/HEART.svg"
import BUILDING from "@/assets/frame/BUILDING.svg"
import FIRE from "@/assets/frame/FIRE.svg"
import SMILE_FACE from "@/assets/frame/SMILE_FACE.svg"
import BASKETBALL from "@/assets/frame/BASKETBALL.svg"
import STARFALL from "@/assets/frame/STARFALL.svg"
import MFText from "@/common/MFText"
import Icon from "@/common/Icon"
import { AlbumType } from "@/album/types"
import { usePhotoInfoStore } from "@/store/photo"
import { getPresignedUrls } from "@/api/presignedUrl"
import { authorizedFetcher } from "@/api/photo"
import { getAccessToken } from "@/store/auth/util"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../DraggableAlbum"
import Svg, { Path, SvgXml } from "react-native-svg"
import { ICON_COLOR_STYLE_HEX, ICON_NAME } from "@/constants"
import { colors } from "@/constants/colors"

export interface FrameType {
  userName: string
  type: AlbumType
  setUpload: (data: boolean) => void
  albumId: string
  albumName: string
}

const Frame = ({
  userName,
  type,
  setUpload,
  albumId: albumIdProps,
  albumName,
}: FrameType) => {
  const viewRef = useRef<any>()
  const imageRef = useRef<any>()
  const { photos: photoInfo } = usePhotoInfoStore()

  const [currentPhoto, setCurrentPhoto] = useState(photoInfo[0]?.photoUrl)

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const handleRecapFramedPhoto = async (dataUrls: string[]) => {
    const presignedResult = await getPresignedUrls(photoInfo, albumIdProps)
    if (!presignedResult) {
      console.error("Failed to get presigned URLs")
      // navigation.push(`/pickphoto?${searchParams.toString()}`)
      return
    }

    const [albumId, urls] = presignedResult

    try {
      const uploadPromises = dataUrls.map(async (dataUrl, index) => {
        /** base64 to blob */
        const blob = await fetch(dataUrl).then((res) => res.blob())
        const file = new File([blob], `frame_${index + 1}.jpeg`, {
          type: "image/jpeg",
          lastModified: Date.now(),
        })

        const presignedUrl = urls[index]
        const accessToken = await getAccessToken()

        if (!accessToken) {
          throw new Error("토큰이 없습니다")
        }

        return fetch(presignedUrl, {
          method: "PUT",
          body: file,
        }).then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to upload frame ${index + 1}`)
          }
          return res
        })
      })

      await Promise.all(uploadPromises)

      // presigned URL에서 query string 제거 후 새 URL 생성
      const newUrls = urls.map((url: string) => {
        return url.split("?")[0]
      })

      console.log("albumId", albumId) // 01JN93QRHN09EDE284WVWBZP87
      console.log("newUrls", newUrls)

      // recap 생성 API 호출
      const { recapUrl } = await authorizedFetcher
        .post(
          `/recaps`,
          {
            albumId: albumId,
            fileUrls: newUrls,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res)
        .catch((err) => {
          console.error("Error calling recap API:", err)
          throw err
        })
      console.log("recapUrl", recapUrl)

      // navigation.replace("Recap", { recapUrl: recapUrl })
    } catch (err) {
      console.error("Error during recap processing:", err)
      setUpload(false)

      navigation.replace("Recap", { recapUrl: "" }) // TODO: 삭제
    }
  }

  const onCaptureBackground = async () => {
    const dataUrls: string[] = []

    for (let index = 0; index < photoInfo.length; index++) {
      // imageRef.current?.setNativeProps({
      //   source: [photos[index].photoUrl],
      // })

      setCurrentPhoto(photoInfo[index].photoUrl)

      await new Promise((resolve) => setTimeout(resolve, 700))

      const uri = await captureRef(viewRef, {
        format: "jpg",
        quality: 0.8,
        result: "base64",
      })
      dataUrls.push(`data:image/jpeg;base64,${uri}`)
      // console.log(`data:image/jpeg;base64,${uri}`)
    }
    handleRecapFramedPhoto(dataUrls)
  }

  useEffect(() => {
    onCaptureBackground()
  }, [])

  const FRAME_LAYOUT = "absolute top-0 left-0 flex-1 w-[393px] h-[680px]"

  return (
    <ViewShot
      ref={viewRef}
      style={{
        flex: 1,
        position: "absolute",
        width: 393,
        height: 680,
        zIndex: -50, // -50
        top: 0,
        left: 0,
      }}>
      {/* LinearGradient 배경 */}
      <LinearGradient
        className="absolute top-0 left-0 items-center justify-center w-[393px] h-[680px]"
        {...recapColorLinearGradient[type]}>
        <Image
          ref={imageRef}
          resizeMode="contain"
          key={currentPhoto}
          width={300}
          height={500}
          source={{ uri: currentPhoto }}
        />
        {/* Frame */}
        {type === "HEART" && <HEART className={FRAME_LAYOUT} />}
        {type === "BUILDING" && <BUILDING className={FRAME_LAYOUT} />}
        {type === "STARFALL" && <STARFALL className={FRAME_LAYOUT} />}
        {type === "FIRE" && <FIRE className={FRAME_LAYOUT} />}
        {type === "SMILE_FACE" && <SMILE_FACE className={FRAME_LAYOUT} />}
        {type === "BASKETBALL" && <BASKETBALL className={FRAME_LAYOUT} />}
        <View className="flex-col absolute top-[46px]">
          <View className="flex-col items-center justify-center">
            <MFText
              style={{
                fontSize: 18,
                fontWeight: 600,
                lineHeight: 25,
                letterSpacing: 0.36,
              }}
              className="text-sumone-white mr-[4px]">
              @{userName}님의
            </MFText>
            <Text
              style={{
                fontFamily: "SBAggroOTF-Medium",
                fontWeight: "400",
                color: "white",
                fontSize: 28,
                lineHeight: 36.4,
              }}>
              HIGHLIGHT
            </Text>
          </View>
        </View>
        <View className="flex-row items-center px-[16px] py-[8px] absolute top-[604px] left-[46px] rounded-full border border-white bg-white/80">
          <Icon
            name={ICON_NAME[type]}
            color={ICON_COLOR_STYLE_HEX[type]}
            size={28}
          />
          <Text
            style={{
              fontFamily: "SBAggroOTF-Medium",
              fontWeight: "400",
              color: colors.gray[800],
              fontSize: 18,
              lineHeight: 25.2,
            }}>
            {albumName}
          </Text>
        </View>
      </LinearGradient>
    </ViewShot>
  )
}

export default Frame

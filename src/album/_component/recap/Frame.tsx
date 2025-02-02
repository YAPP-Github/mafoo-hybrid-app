import { recapColorLinearGradient } from "@/styles/variants"
import { Image, Platform, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import ViewShot, { captureRef } from "react-native-view-shot"
import AsyncStorage from "@react-native-async-storage/async-storage"

import HEART from "@/assets/frame/HEART.svg"
import BUILDING from "@/assets/frame/BUILDING.svg"
import FIRE from "@/assets/frame/FIRE.svg"
import SMILE_FACE from "@/assets/frame/SMILE_FACE.svg"
import BASKETBALL from "@/assets/frame/BASKETBALL.svg"
import STARFALL from "@/assets/frame/STARFALL.svg"
import { useEffect, useRef } from "react"
import MFText from "@/common/MFText"
import { photo } from "@/dummy"
import Icon from "@/common/Icon"
import { AlbumType } from "@/album/types"
import { ObjectedParams } from "@/types/user"
import { usePhotoStore } from "@/store/photo"
import { authorizedFetcher, getPresignedUrls } from "@/api/presignedUrl"

export interface FrameType {
  type: AlbumType
  userData: ObjectedParams
  setUpload: (data: boolean) => void
}

const Frame = ({ type, userData, setUpload }: FrameType) => {
  const viewRef = useRef<any>()
  const imageRef = useRef<any>()
  const { photos } = usePhotoStore()

  const getAlbumIdFromAsyncStorage = async () => {
    const res = await AsyncStorage.getItem("albumId")
    return res || ""
  }

  const handleRecapFramedPhoto = async (dataUrls: string[]) => {
    // presigned URLs 가져오기
    console.time("리캡 이미지 presigned url 발급")

    const albumIdFromAsyncStorage = await getAlbumIdFromAsyncStorage()
    if (!albumIdFromAsyncStorage)
      return console.log("Fail to fetch albumId from AsyncStorage")

    const presignedResult = await getPresignedUrls(
      photos,
      albumIdFromAsyncStorage
    )
    if (!presignedResult) {
      console.error("Failed to get presigned URLs")
      // navigation.push(`/pickphoto?${searchParams.toString()}`)
      return
    }
    console.timeEnd("리캡 이미지 presigned url 발급")

    const [albumId, urls] = presignedResult
    console.log("Presigned URLs: ", urls)

    // dataUrls (프레임된 이미지들) 업로드
    try {
      console.time("이미지 PUT")
      const uploadPromises = dataUrls.map(async (dataUrl, index) => {
        const blob = await fetch(dataUrl).then((res) => res.blob())

        const file = new File([blob], `frame_${index + 1}.jpeg`, {
          type: "image/jpeg",
          lastModified: Date.now(),
        })

        const presignedUrl = urls[index]

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

      console.timeEnd("이미지 PUT")
      // presigned URL에서 query string 제거 후 새 URL 생성
      const newUrls = urls.map((url: string) => {
        return url.split("?")[0]
      })

      console.time("리캡 생성 요청")
      // recap API 호출
      const { recapUrl } = await authorizedFetcher
        .post(
          `/${albumId}/recap`,
          JSON.stringify({
            userId: userData.coupleId + userData.nickName,
            fileUrls: newUrls,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.json())
        .catch((err) => {
          console.error("Error calling recap API:", err)
          throw err
        })

      console.log("recapUrl", recapUrl)
      console.timeEnd("리캡 생성 요청")

      // Recao page에 Url로 전달
      // navigation.push(`result?${searchParams.toString()}&recapUrl=${recapUrl}`)
    } catch (err) {
      console.error("Error during recap processing:", err)
      setUpload(false)
    }
  }

  const onCaptureBackground = async () => {
    const dataUrls: string[] = []

    for (let index = 0; index < photo.length; index++) {
      imageRef.current?.setNativeProps({
        source: [photo[index].photoUrl],
      })

      await new Promise((resolve) => setTimeout(resolve, 100))

      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 0.8,
        result: "base64", // base64 인코딩
      })
      dataUrls.push(`data:image/jpeg;base64,${uri}`)
    }

    // handleRecapFramedPhoto(dataUrls)
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
        zIndex: -50,
        top: 0,
        left: 0,
      }}>
      <LinearGradient
        className="absolute top-0 left-0 items-center justify-center w-[393px] h-[680px]"
        {...recapColorLinearGradient[type]}>
        {type === "HEART" && <HEART className={FRAME_LAYOUT} />}
        {type === "BUILDING" && <BUILDING className={FRAME_LAYOUT} />}
        {type === "STARFALL" && <STARFALL className={FRAME_LAYOUT} />}
        {type === "FIRE" && <FIRE className={FRAME_LAYOUT} />}
        {type === "SMILE_FACE" && <SMILE_FACE className={FRAME_LAYOUT} />}
        {type === "BASKETBALL" && <BASKETBALL className={FRAME_LAYOUT} />}
        <View className="flex-col">
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
  )
}

export default Frame

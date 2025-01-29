import React, { memo, useEffect, useMemo, useRef, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import Canvas from "./Canvas" // React Native Canvas 구현
import { useNavigation } from "@react-navigation/native"
import { photo as photos } from "@/dummy"
// import { usePhotoStore } from "../store/photoStore"
// import SumoneButton from "../components/SumoneButton"
// import { getPresignedUrls, postOriginalPhoto } from "../api"
// import Carousel from "../components/Carousel"
// import HeartIcon from "../assets/HeartIcon"
import SumoneLoader from "../assets/SumoneLoader.gif"
// import { fetchAd } from "../api"
import MFText from "@/common/MFText"

interface FrameProps {
  locale: string
  userData: {
    top: number
    bottom: number
    partnerNickName: string
  }
  dict: Record<string, any>
  loader: Record<string, any>
  albumId: string
}

const Frame: React.FC<FrameProps> = ({
  locale,
  userData,
  dict,
  loader,
  albumId,
}) => {
  const navigation = useNavigation()
  // const { photos } = usePhotoStore()
  const canvasRef = useRef(null)
  const [frameType, setFrameType] = useState<number>(1)
  const [imageIdx, setImageIdx] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isAdLoaded, setIsAdLoaded] = useState(false)

  const uploadPhotosAndCreateAlbum = async () => {
    try {
      // await postOriginalPhoto(photos, albumId)
    } catch (err) {
      // console.error("Failed to upload photos or create album:", err)
    }
  }

  useEffect(() => {
    // if (photos.length === 0) {
    //   navigation.navigate("PickPhoto", {})
    // } else {
    //   uploadPhotosAndCreateAlbum()
    // }
  }, [photos])

  useEffect(() => {
    if (locale !== "ko") {
      //   fetchAd()
      //     .then(() => setIsAdLoaded(true))
      //     .catch((err) => console.error(err))
    }
  }, [locale])

  const handleSelectFrame = async () => {
    setIsLoading(true)
    try {
      // Generate framed images and upload them
      const dataUrls = await generateFramedImages()
      await handleRecapFramedPhoto(dataUrls)
    } catch (err) {
      console.error("Error during recap processing:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const generateFramedImages = async () => {
    // Placeholder: Generate framed images
    return []
  }

  const handleRecapFramedPhoto = async (dataUrls: string[]) => {
    // try {
    //   const presignedResult = await getPresignedUrls(photos, albumId)
    //   if (!presignedResult) {
    //     console.error("Failed to get presigned URLs")
    //     navigation.navigate("PickPhoto", {})
    //     return
    //   }
    //   const [albumId, urls] = presignedResult
    //   await Promise.all(
    //     dataUrls.map(async (dataUrl, index) => {
    //       const presignedUrl = urls[index]
    //       // Upload image logic here
    //     })
    //   )
    //   const recapUrl = "generated_recap_url_placeholder" // Placeholder
    //   navigation.navigate("Result", { recapUrl })
    // } catch (err) {
    //   console.error("Error during recap processing:", err)
    // }
  }

  const headerTitleComponent = useMemo(
    () => (
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{dict.select_frame}</Text>
      </View>
    ),
    [dict.select_frame]
  )

  return (
    <View
      style={[
        styles.container,
        { paddingTop: userData.top, paddingBottom: userData.bottom },
      ]}>
      <View style={styles.header}>{headerTitleComponent}</View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View ref={canvasRef} style={styles.canvasWrapper}>
          {photos.length > 0 && (
            <Canvas
              frameType={frameType}
              images={photos}
              imageIdx={imageIdx}
              setImageIdx={setImageIdx}
            />
          )}
        </View>
        <View style={styles.frameSelectorWrapper}>
          {Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setFrameType(index + 1)}
              style={[
                styles.frameButton,
                frameType === index + 1 && styles.selectedFrame,
              ]}>
              <Text>{`Frame ${index + 1}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* <SumoneButton
          text={dict.make_with_this_frame}
          onPress={handleSelectFrame}
          isLoading={isLoading}
        /> */}
        <TouchableOpacity onPress={handleSelectFrame}>
          <MFText>버튼</MFText>
        </TouchableOpacity>
      </ScrollView>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ff9092" />
          <Text>
            {locale === "ko" ? "잠시만 기다려 주세요..." : "Please wait..."}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  canvasWrapper: {
    width: "100%",
    height: 300,
    marginBottom: 16,
  },
  frameSelectorWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  frameButton: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 8,
  },
  selectedFrame: {
    borderColor: "blue",
    borderWidth: 2,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
})

export default memo(Frame)

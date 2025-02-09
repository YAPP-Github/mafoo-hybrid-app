import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

import DayHeartIcon from "@/assets/DayHeartIcon"
import MafooLogo from "@/assets/mafooLogo"
import SumoneLogo from "@/assets/SumoneLogo"
// import Character from "./Character"
//import { AlbumType, ObjectedParams } from "@/types/user"

const CanvasPrepData = [
  { id: 1, mainColor: "#F64435" },
  { id: 2, mainColor: "#5B7F38" },
  { id: 3, mainColor: "#F64435" },
  { id: 4, mainColor: "#5B7F38" },
  { id: 5, mainColor: "#444E5C", subColor: "#FBF3EE" },
]

const frameSrcs = [
  require("@/assets/frame/puppy.webp"),
  require("@/assets/frame/penguin.webp"),
  require("@/assets/frame/cat.webp"),
  require("@/assets/frame/panda.webp"),
  require("@/assets/frame/egg.webp"),
] as const

interface CanvasProps {
  frameType: number
  images: { uri: string }[]
  canvasSize: { width: number; height: number }
  imageIdx: number
  setImageIdx: React.Dispatch<React.SetStateAction<number>>
  userData: any // ObjectedParams
  dict: Record<string, any>
}

const Canvas: React.FC<CanvasProps> = ({
  frameType,
  images,
  canvasSize,
  imageIdx,
  setImageIdx,
  userData,
  dict,
}) => {
  const { mainColor, subColor } = CanvasPrepData[frameType - 1]
  const [isFrameStackLoaded, setIsFrameStackLoaded] = useState(false)

  const photoSrc = useMemo(() => images[imageIdx].uri, [images, imageIdx])

  const handleClickBackground = useCallback(() => {
    setImageIdx((prev) => (prev + 1) % images.length)
  }, [images])

  const onFrameStackLoad = useCallback(() => {
    setIsFrameStackLoaded(true)
  }, [])

  const xPadding = (canvasSize.height * 46) / 680
  const topIndex = (canvasSize.height * 110) / 543

  return (
    <View className="relative flex-1 items-center">
      <FrameStack
        frameType={frameType}
        handleClickBackground={handleClickBackground}
        onFrameStackLoad={onFrameStackLoad}
      />

      {/* 상단 Title */}
      <View
        style={[
          styles.titleContainer,
          { marginTop: canvasSize.height * 0.015 },
        ]}>
        <View className="flex-row items-center gap-2">
          <Text
            style={[
              styles.text,
              { color: frameType === 5 ? mainColor : "#ffffff" },
            ]}>
            {dict.to_name.before}@{userData.partnerNickName}
            {dict.to_name.after}
          </Text>
          <MafooLogo
            width={62}
            fill={frameType === 5 ? mainColor : "#ffffff"}
          />
        </View>
        <SumoneLogo
          width={canvasSize.width / 3}
          height={30}
          fill={frameType === 5 ? mainColor : "#ffffff"}
        />
      </View>

      {images.length > 0 && (
        <View
          style={[
            styles.photoContainer,
            {
              backgroundColor: frameType === 5 ? subColor : mainColor,
              top: topIndex - 10,
              width: (canvasSize.height * 240) / 543 + 10,
              height: (canvasSize.height * 354) / 543 + 20,
              opacity: isFrameStackLoaded ? 1 : 0,
            },
          ]}>
          <Image
            source={{ uri: photoSrc }}
            style={styles.photo}
            resizeMode="contain"
          />
        </View>
      )}

      {/* <Character frameType={frameType} canvasSize={canvasSize} dict={dict} /> */}

      <View
        style={[styles.dayCounter, { left: xPadding, bottom: xPadding * 0.8 }]}>
        <DayHeartIcon width={24} height={24} />
        <Text style={styles.dayText}>
          {dict.days.before}
          {userData.dDay}
          {dict.days.after}
        </Text>
      </View>
    </View>
  )
}

const FrameStack: React.FC<{
  frameType: number
  handleClickBackground: () => void
  onFrameStackLoad: () => void
}> = ({ frameType, handleClickBackground, onFrameStackLoad }) => {
  const loadedCountRef = useRef(frameSrcs.length)

  const onLoad = () => {
    loadedCountRef.current--
    if (!loadedCountRef.current) {
      onFrameStackLoad()
    }
  }

  return (
    <View className="absolute inset-0">
      {frameSrcs.map((src, idx) => (
        <TouchableOpacity
          key={idx}
          activeOpacity={1}
          onPress={handleClickBackground}>
          <Image
            source={src}
            style={[
              styles.frameElement,
              { opacity: frameType === idx + 1 ? 1 : 0 },
            ]}
            onLoad={onLoad}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    alignItems: "center",
    zIndex: 30,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  photoContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 16,
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  dayCounter: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 4,
  },
  frameElement: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 20,
    borderRadius: 16,
  },
})

export default Canvas

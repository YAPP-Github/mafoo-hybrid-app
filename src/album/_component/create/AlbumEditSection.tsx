import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

import AlbumItem from "../AlbumItem"
import SquareButton from "@/common/SquareButton"
import AlbumTypeSelectTab from "./AlbumTypeSelectTab"

import { AlbumType, AlbumValue } from "../../types"
// import { usePostAlbum } from "../hooks/useAlbum"

interface AlbumEditSectionProps {
  albumValue?: AlbumValue
}

const DEFAULT_ALBUM_VALUE: AlbumValue = {
  name: "",
  type: "HEART",
  photoCount: 0,
  isNew: false,
  isSelected: false,
  isEditable: true,
}

export function AlbumEditSection({
  albumValue: albumValueInit = DEFAULT_ALBUM_VALUE,
}: AlbumEditSectionProps) {
  const [value, setValue] = useState(albumValueInit)
  const { type } = value
  //const { postAlbum } = usePostAlbum()

  const handleType = (type: AlbumType) => {
    const nextValue = { ...value, type }
    setValue(nextValue)
  }

  const handleValue = (v: AlbumValue) => {
    setValue(v)
  }

  const handleSubmit = async () => {
    const { name, type } = value
    // postAlbum({ name, type, photoId: null }) // Replace `photoId` with appropriate value
  }

  return (
    <>
      {/* AlbumItem */}
      <View style={styles.albumItemContainer}>
        <AlbumItem value={value} handleValue={handleValue} />
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <AlbumTypeSelectTab type={type} handleType={handleType} />
        <SquareButton
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={!value.name.length}>
          <Text style={styles.submitButtonText}>다음으로</Text>
        </SquareButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  albumItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 24, // TailwindCSS의 pt-6
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxWidth: 430,
    alignItems: "center",
    backgroundColor: "#FFFFFF", // 배경색 추가
  },
  submitButton: {
    marginBottom: 44, // TailwindCSS의 mb-11
    marginTop: 12, // TailwindCSS의 mt-3
    // width: "calc(100% - 48px)", // TailwindCSS의 w-[calc(100%-3rem)]
    backgroundColor: "#4CAF50", // 버튼 배경색 (예: 녹색)
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})

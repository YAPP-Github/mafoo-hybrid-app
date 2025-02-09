import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

import AlbumItem from "../AlbumItem"
import SquareButton from "@/common/SquareButton"
//import SquareButton from "../../../common/SquareButton"
import AlbumTypeSelectTab from "./AlbumTypeSelectTab"

import { AlbumType, AlbumValue } from "../../types"
import MFText from "../../../common/MFText"

import { usePostAlbum } from "@/hooks/usePostAlbum"

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
  const { postAlbum } = usePostAlbum()

  const handleType = (type: AlbumType) => {
    const nextValue = { ...value, type }
    setValue(nextValue)
  }

  const handleValue = (v: AlbumValue) => {
    setValue(v)
  }

  const handleSubmit = async () => {
    const { name, type } = value
    console.log(name, type)
    postAlbum({ name, type, photoId: null })
  }

  return (
    <>
      <View style={styles.albumItemContainer}>
        <AlbumItem value={value} handleValue={handleValue} />
      </View>
      <View style={styles.descContainer}>
        <MFText className="text-body1 text-gray-500">
          한 번 정한 앨범 이름은 바꾸기 어려워요.
        </MFText>
      </View>
      <View style={styles.footerContainer}>
        <AlbumTypeSelectTab type={type} handleType={handleType} />
        <View style={styles.buttonContainer}>
          <SquareButton
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={!value.name.length}>
            <MFText style={styles.submitButtonText}>다음으로</MFText>
          </SquareButton>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  albumItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 8,
  },
  descContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  footerContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxWidth: 430,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#F0F2F4",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },

  submitButton: {
    alignItems: "center",
    marginBottom: 44,
    marginTop: 12,
    width: "100%",
    backgroundColor: "#F0F2F4", // TODO: grey 100
    borderRadius: 8,
    paddingVertical: 12,
  },
  submitButtonText: {
    color: "#B1B7BE",
    fontSize: 16,
    fontWeight: "bold",
  },
})

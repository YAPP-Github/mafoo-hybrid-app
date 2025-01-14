import React from "react"
import { View, Text } from "react-native"
import Albums from "../album/_component/Albums"
import NewAlbumButton from "../album/_component/NewAlbumButton"

const AlbumsPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text className="tp-header2-semibold w-full p-4 py-[14px]">내 앨범</Text>
      <Albums />
      {/* TODO: draggable 추가 */}
      <NewAlbumButton />
      {/* 하단 GNB */}
      {/* <BottomBar variant="album" /> */}
    </View>
  )
}

export default AlbumsPage

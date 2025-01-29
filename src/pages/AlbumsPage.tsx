import React from "react"
import { View, StyleSheet, SafeAreaView } from "react-native"
import Albums from "../album/_component/Albums"
import NewAlbumButton from "../album/_component/NewAlbumButton"
import MafooLogo from "@/assets/mafooNewLogo.svg"
import HeaderBell from "@/assets/headerBell.svg"
import BottomBar from "@/common/BottomBar"

const AlbumsPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <MafooLogo width={112} height={36} color="#2D3541" />
          <HeaderBell width={32} height={32} color="#B1B7BE" />
        </View>
        <Albums />
        {/* TODO: draggable 추가 */}
        <NewAlbumButton />
        <BottomBar variant="album" />
      </View>
    </SafeAreaView>
  )
}

export default AlbumsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
  },
})

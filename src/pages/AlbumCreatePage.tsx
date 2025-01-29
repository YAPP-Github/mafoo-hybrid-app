import React from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { AlbumEditSection } from "../album/_component/create/AlbumEditSection"
import { Header } from "@/album/_component/create/Header"
import MFText from "@/common/MFText"

const AlbumCreatePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MFText weight="SemiBold" className="text-header2 p-[24px]">
        새로운 앨범을 만들어주세요
      </MFText>
      <AlbumEditSection />
    </SafeAreaView>
  )
}

export default AlbumCreatePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
})

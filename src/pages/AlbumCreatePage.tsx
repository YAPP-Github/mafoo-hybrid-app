import React from "react"
import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { AlbumEditSection } from "../album/_component/create/AlbumEditSection"
// import Header from "./_components/Header"

const AlbumCreatePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
      <Text style={styles.title}>새로운 앨범을 만들어주세요</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "600",
    padding: 24,
    color: "#000000",
  },
})

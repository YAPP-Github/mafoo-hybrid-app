import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import MFText from "@/common/MFText"
import NewAlbum from "@/assets/newAlbum.svg"
import { colors } from "@/constants/colors"

export type RootStackParamList = {
  AlbumCreate: undefined
}

const NewAlbumButton = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const handlePress = () => {
    navigation.navigate("AlbumCreate")
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityLabel="새 앨범 만들기"
      style={styles.link}>
      <View style={styles.buttonContainer}>
        <MFText weight="SemiBold" className="text-body1 text-sumone-white">
          새 앨범 만들기
        </MFText>
        <NewAlbum size={20} color="white" />
      </View>
    </TouchableOpacity>
  )
}

export default NewAlbumButton

const styles = StyleSheet.create({
  link: {
    position: "absolute",
    bottom: 114,
    left: "50%",
    transform: [{ translateX: -79 }],
    // iOS shadow 설정
    shadowColor: "rgba(101, 125, 159, 1)", // 그림자 색상
    shadowOffset: { width: 0, height: 16 }, // X, Y 방향 그림자 위치
    shadowOpacity: 0.12, // 그림자 투명도
    shadowRadius: 20, // 그림자 흐림 정도
    // android shadow 설정
    elevation: 4,
    zIndex: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.gray[800],
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 9999,
  },
})

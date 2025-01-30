import { useEffect, useState } from "react"
import { View, StyleSheet, Modal, TouchableOpacity, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { recapColorLinearGradient } from "@/styles/variants"
import { AlbumType } from "@/album/types"
import MFText from "@/common/MFText"
import Icon from "@/common/Icon"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

interface VideoLoadingProps {
  type: AlbumType
  visible: boolean
  closeRecapModal: () => void
}

export type RootStackParams = {
  Recap: {} | undefined
}

const VideoLoading = ({
  type,
  visible,
  closeRecapModal,
}: VideoLoadingProps) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

  // TODO: 3초 뒤 Recap 페이지로 이동 (테스트 후 삭제)
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("Recap")
  //     closeRecapModal()
  //   }, 3000)
  // }, [])

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        activeOpacity={0.45}
        style={{ opacity: 0.45 }}
        className="flex-1 bg-gray-700 px-[21px]"
        // onPress={closeRecapModal}
      />
      <View
        className="absolute left-[50%] top-[50%]"
        onLayout={(event) => {
          // 컴포넌트 크기 기준 레이아웃 계산
          const { width, height } = event.nativeEvent.layout
          setOffset({ x: -width / 2, y: -height / 2 })
        }}
        style={{
          transform: [{ translateX: offset.x }, { translateY: offset.y }],
        }}>
        <LinearGradient
          className="rounded-[24px]"
          {...recapColorLinearGradient[type]}>
          <View
            style={[
              styles.card,
              {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 16 },
                shadowOpacity: 0.12,
                shadowRadius: 20,
              },
            ]}>
            <View className="w-full items-end pt-[16px] px-[12px]">
              <TouchableOpacity onPress={closeRecapModal}>
                <Icon
                  name="closeCircleBold"
                  size={36}
                  color="text-gray-300"
                  // className="mix-blend-multiply"
                />
              </TouchableOpacity>
            </View>
            <Image
              style={{ width: 169, height: 169, marginTop: -50 }}
              className="mb-2"
              source={require("@/assets/reel.gif")}
              resizeMode="contain"
            />
            <MFText
              weight="SemiBold"
              className="text-title1 text-center text-sumone-white mt-[-28px]">
              {"앨범 속 추억을\n리캡으로 만드는 중이에요.."}
            </MFText>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  )
}

export default VideoLoading

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    height: 224,
    width: 345,
  },
})

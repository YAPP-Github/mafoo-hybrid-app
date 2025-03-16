import { View, Modal, TouchableOpacity } from "react-native"
import HeaderBell from "@/assets/headerBell.svg"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { colors } from "@/constants/colors"
import { useState } from "react"
import SquareButton from "@/common/SquareButton"
import { requestUserPermission } from "@/utils/requestPermission"
import { RootStackParamList } from "@/types/routeParams"
import { firebase } from "@react-native-firebase/messaging"
import { useGetProfile } from "@/profile/hooks/useProfile"
import MFText from "@/common/MFText"
import LinearGradient from "react-native-linear-gradient"
import Icon from "@/common/Icon"
import { RedDot } from "@/album/_component/notification"
import { usePostFcmToken } from "@/hooks/usePostFcmToken"
import { useQueryClient } from "@tanstack/react-query"
import { PROFILE } from "@/constants/queryString"

export interface ConsentModalProps {
  visible: boolean
  closeConsentModal: () => void
}
const ConsentModal = ({ visible, closeConsentModal }: ConsentModalProps) => {
  const [offset, setOffset] = useState({ x: 0 })

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const { profile } = useGetProfile()

  const onSuccess = () => {
    closeConsentModal()
    navigation.navigate("Notification")
  }

  const queryClient = useQueryClient()

  const { mutate } = usePostFcmToken(onSuccess)

  const onPress = async () => {
    try {
      const granted = await requestUserPermission()
      // console.log("granted", granted)

      if (granted) {
        const fcmToken = await firebase.messaging().getToken()

        if (fcmToken && profile?.memberId) {
          mutate({
            memberId: profile?.memberId!,
            fcmToken: fcmToken,
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        activeOpacity={0.45}
        style={{ opacity: 0.45 }}
        className="flex-1 bg-gray-700"
        onPress={closeConsentModal}
      />
      <View
        className="absolute left-[50%] bottom-[21px] w-[350px] h-[446px] rounded-[24px]"
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout
          setOffset({ x: -width / 2 })
        }}
        style={{
          transform: [{ translateX: offset.x }],
        }}>
        <LinearGradient
          colors={["#fff", "#E9F6FE"]}
          locations={[0.1939, 1]}
          className="flex-1 flex-col items-center rounded-[24px] px-[16px] py-[24px]">
          {/** 알림 동의 */}
          <View className="flex-col items-center">
            <View className="relative">
              <HeaderBell width={36} height={36} color={colors.gray[800]} />
              <RedDot />
            </View>
            <MFText
              weight="SemiBold"
              className="text-title1 mt-[8px] text-center">
              {`함께 만드는 마푸 앨범!\n알림으로 더 가까이 소통해요`}
            </MFText>
            <MFText
              weight="SemiBold"
              className="text-body1 text-gray-600 mt-[8px]">
              꼭 필요할 때만 보내드릴게요.
            </MFText>
          </View>
          <View className="mt-[57px] w-[290px] h-[105px] rounded-[20px] bg-gray-100" />
          <View
            className="mt-[-114px] px-[16px] py-[14px] rounded-[24px] w-full border border-white bg-white"
            style={{ shadowOpacity: 0.05 }}>
            <View className="flex-row items-center">
              <Icon name="mafooSantaCharacter" size={24} height={24} />
              <MFText className="text-body2 text-gray-500 ml-[8px]">
                마푸
              </MFText>
            </View>
            <MFText
              weight="SemiBold"
              className="text-body1 text-gray-700 mt-[4px]">
              ‘부산여행 추억’ 앨범을 공유받았어요
            </MFText>
            <MFText className="text-body2 text-gray-500 mt-[2px]">
              앨범 공유를 수락하시겠어요?
            </MFText>
          </View>
          <View className="relative flex-1 w-full">
            <SquareButton
              className="absolute bottom-0 bg-gray-900 w-full"
              onPress={onPress}>
              <MFText weight="SemiBold" className="text-white text-body1">
                한번 받아볼게요
              </MFText>
            </SquareButton>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  )
}

export default ConsentModal

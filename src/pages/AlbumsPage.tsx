import { View, StyleSheet, TouchableOpacity } from "react-native"
import Albums from "@/album/_component/Albums"
import NewAlbumButton from "@/album/_component/NewAlbumButton"
import BottomBar from "@/common/BottomBar"
import MafooLogo from "@/assets/mafooNewLogo.svg"
import HeaderBell from "@/assets/headerBell.svg"
import PageContainer from "@/common/PageContainer"
import { colors } from "@/constants/colors"
import { useState } from "react"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { useGetFcmToken } from "@/hooks/useFcmToken"
import ConsentModal from "@/album/_component/notification/ConsentModal"
import SquareButton from "@/common/SquareButton"
import {
  SenarioNotification,
  sendSenarioNotification,
} from "@/api/notification"
import MFText from "@/common/MFText"
import { RedDot } from "@/album/_component/notification"
import { useGetNotification } from "@/hooks/useNotification"
import { useQueryClient } from "@tanstack/react-query"
import { useDeleteFcmToken } from "@/hooks/useDeleteFcmToken"
import { NOTIFICATIONS } from "@/constants/queryString"

const AlbumsPage = ({ navigation }: any) => {
  const [openConsent, setOpenConsent] = useState(false)

  const queryClient = useQueryClient()

  const { profile } = useGetProfile()

  const { tokenList } = useGetFcmToken(profile?.memberId)

  const onPress = () => {
    /** 이미 등록된 토큰이 있는 경우, 알림함 진입 */
    if (tokenList.length) navigation.navigate("Notification")
    else setOpenConsent(true)
  }

  const onTest = async () => {
    const body: SenarioNotification = {
      notificationType: "NEW_MEMBER",
      receiverMemberIds: ["01JM79B1YRDQJE96TC7ZQBSR8C"],
      variables: {
        name: "다른 유저 이름 님이 공유앨범 이름에 n장의 사진을 올렸어요",
      },
    }
    try {
      const data = await sendSenarioNotification(body)

      console.log("senario", data)

      await queryClient.invalidateQueries({
        queryKey: [...NOTIFICATIONS.GET_NOTIFICATIONS],
      })
    } catch (e) {
      console.error(e)
    }
  }

  const { mutate: deleteMutate } = useDeleteFcmToken(
    "01JM79B1YRDQJE96TC7ZQBSR8C"
  )

  const { notifications } = useGetNotification(profile?.memberId)

  return (
    <PageContainer headerProps={{ title: "Albums" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <MafooLogo width={112} height={36} color="#2D3541" />

          <TouchableOpacity onPress={onPress} className="relative">
            <HeaderBell width={32} height={32} color={colors.gray[400]} />
            {notifications?.filter((n) => !n.isRead)?.length > 0 && <RedDot />}
          </TouchableOpacity>
        </View>
        <View className="flex-row">
          <SquareButton variant="solid" size="large" onPress={onTest}>
            <MFText>알림 발송</MFText>
          </SquareButton>
          <SquareButton
            variant="solid"
            size="large"
            onPress={() => deleteMutate()}>
            <MFText>토큰 삭제</MFText>
          </SquareButton>
        </View>
        <Albums />
        <NewAlbumButton />
        <BottomBar variant="album" />
      </View>
      <ConsentModal
        visible={openConsent}
        closeConsentModal={() => setOpenConsent(false)}
      />
    </PageContainer>
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

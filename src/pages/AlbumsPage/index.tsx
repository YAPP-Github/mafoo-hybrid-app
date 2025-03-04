import { View, TouchableOpacity } from "react-native"
import Albums from "@/album/_component/Albums"
import NewAlbumButton from "@/album/_component/NewAlbumButton"
import BottomBar from "@/common/BottomBar"
import MafooLogo from "@/assets/mafooNewLogo.svg"
import HeaderBell from "@/assets/headerBell.svg"
import PageContainer from "@/common/PageContainer"
import { colors } from "@/constants/colors"
import { useState } from "react"
import { useGetProfile } from "@/profile/hooks/useProfile"
import ConsentModal from "@/album/_component/notification/ConsentModal"
import { RedDot } from "@/album/_component/notification"
import { useGetNotification } from "@/hooks/useNotification"
// import { useQueryClient } from "@tanstack/react-query"
// import { useDeleteFcmToken } from "@/hooks/useDeleteFcmToken"
// import { NOTIFICATIONS } from "@/constants/queryString"

const AlbumsPage = ({ navigation }: any) => {
  const [openConsent, setOpenConsent] = useState(false)

  // const queryClient = useQueryClient()
  const { profile } = useGetProfile()

  //  const { mutate: deleteMutate } = useDeleteFcmToken(profile?.memberId)
  const { notifications } = useGetNotification(profile?.memberId)

  const onPress = () => {
    /** 이미 등록된 토큰이 있는 경우, 알림함 진입 */
    if (profile?.fcmToken) navigation.navigate("Notification")
    else setOpenConsent(true)
  }

  // const onTest = async () => {
  //   const body: SenarioNotification = {
  //     notificationType: "NEW_MEMBER",
  //     receiverMemberIds: [profile?.memberId ?? "01JM79B1YRDQJE96TC7ZQBSR8C"],
  //     variables: {
  //       name: "다른 유저 이름 님이 공유앨범 이름에 n장의 사진을 올렸어요",
  //     },
  //   }
  //   try {
  //     const data = await sendSenarioNotification(body)
  //     console.log("senario", data)
  //     await queryClient.invalidateQueries({
  //       queryKey: [...NOTIFICATIONS.GET_NOTIFICATIONS],
  //     })
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // const deleteToken = async () => {
  //   deleteMutate()
  // }
  return (
    <>
      <PageContainer statusBarColor="#ffffff" homeIndicatorColor="#ffffff">
        <View className="flex-1 bg-white">
          {/* header */}
          <View className="flex-row w-full h-[56px] pt-[14px] py-[14px] px-[16px] justify-between">
            <MafooLogo width={112} height={36} color="#2D3541" />
            <TouchableOpacity onPress={onPress} className="relative">
              <HeaderBell width={32} height={32} color={colors.gray[400]} />
              {notifications?.filter((n) => !n.isRead)?.length > 0 && (
                <RedDot />
              )}
            </TouchableOpacity>
          </View>
          {/* <View className="flex-row">
            <SquareButton variant="solid" size="large" onPress={onTest}>
              <MFText>알림 발송</MFText>
            </SquareButton>
            <SquareButton variant="solid" size="large" onPress={deleteToken}>
              <MFText>토큰 삭제</MFText>
            </SquareButton>
          </View> */}
          <Albums />
          <NewAlbumButton />

          <ConsentModal
            visible={openConsent}
            closeConsentModal={() => setOpenConsent(false)}
          />
        </View>
        <BottomBar variant="album" />
      </PageContainer>
    </>
  )
}

export default AlbumsPage

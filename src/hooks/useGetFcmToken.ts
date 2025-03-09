import { usePostFcmToken } from "./usePostFcmToken"
import { requestUserPermission } from "@/utils/requestPermission"
import { firebase } from "@react-native-firebase/messaging"
import { getMyProfile } from "@/api/signIn"
import { useUpdateFcmToken } from "./useUpdateFcmToken"

export const useGetFcmToken = (onSuccess?: () => void) => {
  const { mutate: postMutate } = usePostFcmToken(onSuccess)
  const { mutate: putMutate } = useUpdateFcmToken(onSuccess)

  const getToken = async () => {
    try {
      /** 알림 권한 획득 여부 확인 */
      const granted = await requestUserPermission()
      console.log("granted", granted)

      if (granted) {
        /** 기발급된 토큰이 있는지 확인 */
        const profile = await getMyProfile()
        await firebase.messaging().deleteToken()
        const fcmToken = await firebase.messaging().getToken()

        if (!fcmToken) {
          throw new Error(`[firebase.messaging] fcm 토큰 발급 실패`)
        }

        if (profile?.fcmToken) {
          console.log("발급된 토큰 있음 PUT 업데이트", profile?.fcmToken)
          /** PUT 업데이트 */
          putMutate({
            memberId: profile?.memberId!,
            fcmToken: fcmToken,
          })
        } else {
          console.log("발급된 토큰 없음 POST 업데이트", profile?.fcmToken)
          /** 신규 토큰 발급 POST 업데이트 */
          postMutate({
            memberId: profile?.memberId!,
            fcmToken: fcmToken,
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  return { getToken }
}

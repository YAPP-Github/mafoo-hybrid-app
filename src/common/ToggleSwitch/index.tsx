import { forwardRef } from "react"
import { View, Switch } from "react-native"
import { useState } from "react"
import { styled } from "nativewind"
import { colors } from "@/constants/colors"
import { useDeleteFcmToken } from "@/hooks/useDeleteFcmToken"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { requestUserPermission } from "@/utils/requestPermission"
import { firebase } from "@react-native-firebase/messaging"
import { usePostFcmToken } from "@/hooks/usePostFcmToken"

export interface ToggleSwitchProps {
  /** 비활성 여부 */
  disabled?: boolean
  /* 초기 checked 상태 */
  defaultChecked?: boolean
}

const StyledSwitch = styled(Switch)

/** 토글 스위치 */
const ToggleSwitch = forwardRef<boolean, ToggleSwitchProps>(
  ({ disabled = false, defaultChecked }, ref) => {
    const [isEnabled, setIsEnabled] = useState(defaultChecked)

    const { profile } = useGetProfile()
    const { mutate: deleteMutate } = useDeleteFcmToken(profile?.memberId ?? "")
    const { mutate: postMutate } = usePostFcmToken()

    const handleToggle = (value: boolean) => {
      if (ref && typeof ref !== "function") {
        ref.current = null
      }

      if (value) requestPermission()
      else deleteMutate()

      setIsEnabled(value)
    }

    const requestPermission = async () => {
      try {
        const granted = await requestUserPermission()
        console.log("granted", granted)

        if (granted) {
          const fcmToken = await firebase.messaging().getToken()
          if (fcmToken) {
            console.log("fcmToken")
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

    return (
      <View className="flex items-center">
        <StyledSwitch
          trackColor={{ false: colors.gray[300], true: colors.gray[800] }}
          thumbColor={colors.white}
          onValueChange={handleToggle}
          value={isEnabled}
          disabled={disabled}
          className="w-[51px] h-[31px]"
        />
      </View>
    )
  }
)

export { ToggleSwitch }

import { View } from "react-native"
import Icon from "./Icon"
import SquareButton from "./SquareButton"
import MFText from "./MFText"
import { removeAccessToken, removeRefreshToken } from "@/store/auth/util"
import { AuthRef } from "@/store/auth/AuthProvider"

interface FallbackProps {
  error: Error
  resetError: () => void
}

const Fallback = ({ error, resetError }: FallbackProps) => {
  console.log("fallback", error)

  const onLogout = async () => {
    Promise.all([removeAccessToken(), removeRefreshToken()])
      .then(async () => {
        AuthRef.current?.signOut()
      })
      .catch((e) => {
        console.log("failed to sign out", e)
      })
  }

  return (
    <View className="flex-1 flex-col justify-center items-center">
      <View className="grow" />
      <View className="grow items-center">
        <MFText
          weight="SemiBold"
          className="text-center text-header2 text-gray-500">
          앗! 마푸를 불러오지 못했어요
        </MFText>
        <MFText
          weight="SemiBold"
          className="text-center text-header2 text-gray-800">
          다시 시도해볼까요?
        </MFText>
        <Icon
          name="errorLogo"
          className="w-[210px] h-[133px] mt-[32px]"
          size={210}
          height={133}
        />
        <MFText className="mt-[32px] text-body1 text-red-500">
          {error?.toString()}
        </MFText>
      </View>
      <View className="grow relative w-full">
        <View className="absolute left-0 bottom-0 flex-row justify-center px-[23px] pb-[40px]">
          <SquareButton
            className="bg-green-200 text-green-700 grow"
            onPress={onLogout}>
            <MFText weight="SemiBold" className="text-body1 text-green-700">
              로그아웃하기
            </MFText>
          </SquareButton>
          <SquareButton onPress={resetError} className="grow ml-[10px]">
            <MFText weight="SemiBold" className="text-body1 text-white">
              새로고침하기
            </MFText>
          </SquareButton>
        </View>
      </View>
    </View>
  )
}

export default Fallback

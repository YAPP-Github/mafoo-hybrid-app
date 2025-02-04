import { View, Text, Image, Button, Pressable } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MainpageImgSrc from "./_assets/MainpageImage.png"
import PageContainer from "@/common/PageContainer"
// import Icon from "@/common/Icon"
import { login } from "@react-native-seoul/kakao-login"
import Icon from "@/common/Icon"
import { useAuth } from "@/store/auth/AuthProvider"
import { setRefreshToken } from "@/store/auth/util"
import appleAuth from "@invertase/react-native-apple-authentication"
import { mafooAppleLogin, mafooKakaoLogin } from "@/api/signIn"
import { Platform } from "react-native"
import { createFetcher } from "@/api/myfetch"

const LoginButton = ({ type }: { type: "kakao" | "apple" }) => {
  const { signIn } = useAuth()

  const kakaoLogin = async () => {
    try {
      const token = await login()
      if (token) {
        console.log("kakao login success", token)
        try {
          const response = await mafooKakaoLogin(token.accessToken)
          console.log(response)
          signIn(response.accessToken)
          setRefreshToken(response.refreshToken)
        } catch (err) {
          console.error("local kakao login err", err)
        }
      }
    } catch (err) {
      console.error("kakao login err", err)
    }
  }

  const appleLogin = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    })
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    )

    // use credentialState response to ensure the user is authenticated
    if (
      credentialState === appleAuth.State.AUTHORIZED &&
      appleAuthRequestResponse.identityToken
    ) {
      // user is authenticated
      console.log("apple login success", appleAuthRequestResponse)
      try {
        const response = await mafooAppleLogin(
          appleAuthRequestResponse.identityToken
        )
        console.log(response)
        signIn(response.accessToken)
        setRefreshToken(response.refreshToken)
      } catch (err) {
        console.error("apple login error", err)
      }
    }
  }

  const loginButtonMap = {
    kakao: {
      buttonColor: "bg-kakao-600",
      buttonText: "카카오로 3초만에 계속하기",
      textColor: "text-gray-1000",
      logo: <Icon name="kakaoLogo" size={24} />,
      onLogin: () => kakaoLogin(),
    },
    apple: {
      buttonColor: "bg-gray-900",
      buttonText: "애플 로그인으로 계속하기",
      textColor: "text-white",
      logo: <Icon name="appleLogo" size={24} />,
      onLogin: () => appleLogin(),
    },
  }

  return (
    <Pressable
      style={{ gap: 6 }}
      className={`flex items-center flex-row justify-center w-full py-4 rounded-xl ${loginButtonMap[type].buttonColor}`}
      onPress={loginButtonMap[type].onLogin}>
      {/* TODO: Icon */}
      {loginButtonMap[type].logo}
      <Text
        className={`font-semibold text-body ${loginButtonMap[type].textColor}`}>
        {loginButtonMap[type].buttonText}
      </Text>
    </Pressable>
  )
}

const HomePage = ({ navigation }: any) => {
  const testAPI = async () => {
    const authorizedFetcher = createFetcher("user/v1")
    await authorizedFetcher.get("/me").then((res) => {
      console.log(res)
    })
  }
  return (
    <PageContainer statusBarColor="#fff" isCustomHeader={false}>
      <LinearGradient
        colors={["#fff", "#FFF8DF", "#FFD1E9", "#fff"]}
        locations={[0.0692, 0.1577, 0.5672, 0.834]}
        className="flex flex-1 px-6">
        <View className="flex items-center justify-between w-full h-full pt-12 pb-6">
          <View style={{ gap: 12 }} className="flex flex-col items-center">
            <Text className="text-title2 font-regular">
              함께 쌓고 연결되는 공유앨범
            </Text>
            <Icon name="mafooLogo2025" size={220} height={57} />
          </View>
          {/* TODO: Icon issue 해결 후 logo svg 삽입 */}

          <Image source={MainpageImgSrc} className="fixed" />

          <View style={{ gap: 16 }} className="flex flex-col w-full">
            <LoginButton type="kakao" />
            {Platform.OS === "ios" && <LoginButton type="apple" />}
            <Button title="test123" onPress={testAPI} />
          </View>
        </View>
      </LinearGradient>
    </PageContainer>
  )
}

export default HomePage

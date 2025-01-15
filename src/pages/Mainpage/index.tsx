import React from "react"
import { View, Text, Image, Button, Pressable } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MainpageImgSrc from "./_assets/MainpageImage.png"
import PageContainer from "@/common/PageContainer"
import Icon from "@/common/Icon"
import { login, logout } from "@react-native-seoul/kakao-login"

const LoginButton = ({ type }: { type: "kakao" | "apple" }) => {
  const kakaoLogin = () => {
    console.log("kakao login")
    signInWithKakao()
  }

  const appleLogin = () => {
    console.log("apple login")
    signOutWithKakao()
  }

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login()
      console.log(token)
    } catch (err) {
      console.error("login err", err)
    }
  }

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout()
      console.log(message)
    } catch (err) {
      console.error("signOut error", err)
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
      className={`flex items-center justify-center w-full py-4 rounded-xl ${loginButtonMap[type].buttonColor}`}
      onPress={loginButtonMap[type].onLogin}>
      {/* TODO: Icon */}
      {/* {loginButtonMap[type].logo} */}
      <Text
        className={`font-semibold text-body ${loginButtonMap[type].textColor}`}>
        {loginButtonMap[type].buttonText}
      </Text>
    </Pressable>
  )
}

const HomePage = ({ navigation }: any) => {
  return (
    <PageContainer statusBarColor="#fff" isCustomHeader={false}>
      <LinearGradient
        colors={["#fff", "#FFF8DF", "#FFD1E9", "#fff"]}
        locations={[0.0692, 0.1577, 0.5672, 0.834]}
        className="flex flex-1 px-6">
        <View className="flex items-center justify-between w-full h-full pt-12 pb-6">
          <Text className="text-title2 font-regular">
            함께 쌓고 연결되는 공유앨범
          </Text>
          {/* TODO: Icon issue 해결 후 logo svg 삽입 */}
          {/* <Icon name="mafooLogo2025" size={180} /> */}

          <Image source={MainpageImgSrc} className="fixed" />

          <View style={{ gap: 16 }} className="flex flex-col w-full">
            <LoginButton type="kakao" />
            <LoginButton type="apple" />
          </View>
        </View>
      </LinearGradient>
    </PageContainer>
  )
}

export default HomePage

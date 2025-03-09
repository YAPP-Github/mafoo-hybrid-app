import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { useAuth } from "../auth/AuthProvider"
import ForegroundEvent from "@/providers/ForegroundEvent"
import { createRef, useEffect } from "react"
import { View, ActivityIndicator } from "react-native"
import { ProtectedRoutes, UnprotectedRoutes } from "./constants"
import Toast from "react-native-toast-message"
import { toastConfig } from "@/styles/toastConfig"
import { getAccessToken } from "../auth/util"
import { useLinking } from "@/hooks/useLinking"
import BackgroundAndQuitEvent from "@/providers/BackgroundAndQuitEvent"
import { useGetFcmToken } from "@/hooks/useGetFcmToken"

const navigationRef = createRef<NavigationContainerRef<any>>()

const MafooRouter = () => {
  const Stack = createStackNavigator()
  const { status, signIn, signOut } = useAuth()
  const { getToken } = useGetFcmToken()
  const isSignedIn = status === "signIn"

  console.log("mafoo router status", status)

  /** 로그인되어 있을 경우, 알림 권한 확인 후 FCM 토큰 발급 */
  useEffect(() => {
    if (isSignedIn) {
      console.log("isSignedIn 이미 로그인되어 있음, fcm 토큰 발급하러감")
      getToken()
    }
  }, [isSignedIn])

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await getAccessToken()
        if (!token) {
          throw new Error("No token")
        }
        signIn(token)
      } catch (e) {
        console.log("failed to restore token, will signout", e)
        signOut()
      }
    }
    restoreSession()
  }, [status, signIn, signOut])

  useEffect(() => {
    if (!isSignedIn && navigationRef.current) {
      navigationRef.current.navigate("Home")
    }
  }, [isSignedIn])

  const Linking = useLinking()

  // 대신 early return하지 않고 로딩 UI를 보여줍니다.
  if (status === "idle") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <>
      <NavigationContainer ref={navigationRef} linking={Linking}>
        <ForegroundEvent />
        <BackgroundAndQuitEvent />
        <Stack.Navigator initialRouteName={isSignedIn ? "Album" : "Home"}>
          {(isSignedIn ? ProtectedRoutes : UnprotectedRoutes).map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={{
                ...route.options,
                title: route.name,
                headerShown: false,
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  )
}

export default MafooRouter

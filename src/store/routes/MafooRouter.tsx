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

const navigationRef = createRef<NavigationContainerRef<any>>()

const MafooRouter = () => {
  const Stack = createStackNavigator()

  const { status } = useAuth()
  const isSignedIn = status === "signIn"

  if (__DEV__) {
    console.log("[MafooRouter] status", status)
  }

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
                ...route?.options,
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

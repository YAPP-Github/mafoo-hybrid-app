import React, { NavigationContainer } from "@react-navigation/native"

import { createStackNavigator } from "@react-navigation/stack"
import { AuthProvider } from "../auth"
import { useAuth } from "../auth/AuthProvider"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ProtectedRoutes, UnprotectedRoutes } from "./constants"

const MafooRouter = () => {
  const Stack = createStackNavigator()
  const { status, signIn, signOut } = useAuth()

  const isSignedIn = status === "signIn"

  useEffect(() => {
    const restoreSession = async () => {
      let token

      try {
        token = await AsyncStorage.getItem("token")
        if (!token) {
          throw new Error("No token")
        }
        signIn(token)
      } catch (e) {
        // failed to restore token
        signOut()
      }
    }

    restoreSession()
  }, [signIn, signOut])

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isSignedIn ? "album" : "home"}>
          {(isSignedIn ? ProtectedRoutes : UnprotectedRoutes).map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

export default MafooRouter

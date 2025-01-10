import React, { Fragment, useEffect } from "react"
import { SafeAreaView } from "react-native"

import SplashScreen from "react-native-splash-screen"

import MafooRouter from "./src/store/routes/MafooRouter"
import DeprecatedWebView from "./src/store/routes/DeprecatedWebView"

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <MafooRouter />
        {/* 기존 Webview deprecated */}
        {/* <DeprecatedWebView /> */}
      </SafeAreaView>
    </Fragment>
  )
}

export default App

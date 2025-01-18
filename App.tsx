import React, { Fragment, useEffect } from "react"
import { SafeAreaView } from "react-native"

import SplashScreen from "react-native-splash-screen"

import MafooRouter from "./src/store/routes/MafooRouter"
import QueryProviders from "./src/common/QueryProviders"

// import DeprecatedWebView from "./src/store/routes/DeprecatedWebView"

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Fragment>
      <QueryProviders>
        <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <MafooRouter />
          {/* 기존 Webview deprecated */}
          {/* <DeprecatedWebView /> */}
        </SafeAreaView>
      </QueryProviders>
    </Fragment>
  )
}

export default App

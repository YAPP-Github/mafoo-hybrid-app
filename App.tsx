import React, { Fragment, useEffect } from "react"
import { View } from "react-native"

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
        <MafooRouter />
        <View className="flex-1">
          <MafooRouter />
          {/* 기존 Webview deprecated */}
          {/* <DeprecatedWebView /> */}
        </View>
      </QueryProviders>
    </Fragment>
  )
}

export default App

import React, { Fragment, useEffect } from "react"
import { View } from "react-native"

import SplashScreen from "react-native-splash-screen"
import MafooRouter from "./src/store/routes/MafooRouter"
import QueryProviders from "./src/common/QueryProviders"
import { AuthProvider } from "@/store/auth"

// import DeprecatedWebView from "./src/store/routes/DeprecatedWebView"

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Fragment>
      <QueryProviders>
        <AuthProvider>
          <MafooRouter />
        </AuthProvider>
        {/* 기존 Webview deprecated */}
        {/* <DeprecatedWebView /> */}
      </QueryProviders>
    </Fragment>
  )
}

export default App

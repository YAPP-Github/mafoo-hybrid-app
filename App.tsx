import { Fragment, useEffect } from "react"

import SplashScreen from "react-native-splash-screen"
import MafooRouter from "./src/store/routes/MafooRouter"
import QueryProviders from "./src/common/QueryProviders"
import ForegroundMessage from "@/providers/ForegroundMessage"

// import DeprecatedWebView from "./src/store/routes/DeprecatedWebView"

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <Fragment>
      <QueryProviders>
        <ForegroundMessage />
        <MafooRouter />
        {/* 기존 Webview deprecated */}
        {/* <DeprecatedWebView /> */}
      </QueryProviders>
    </Fragment>
  )
}

export default App

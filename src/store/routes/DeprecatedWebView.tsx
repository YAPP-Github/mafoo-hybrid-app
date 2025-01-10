import { useEffect, useRef, useState } from "react"
import { BackHandler, Dimensions, Platform } from "react-native"
import DeviceInfo from "react-native-device-info"
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const DeprecatedWebView = () => {
  const webViewRef = useRef<WebView | null>(null)
  const [isLoaded, setLoaded] = useState(false)
  const [navState, setNavState] = useState<WebViewNavigation>()

  const isAndroid = Platform.OS === "android"
  const isIOS = Platform.OS === "ios"

  const userAgent = `MafooApp/${DeviceInfo.getVersion()} (${
    isAndroid ? "Android" : "iPhone"
  }/${DeviceInfo.getSystemVersion()})`

  useEffect(() => {
    if (isAndroid) {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress)
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress)
      }
    }
  })

  const onAndroidBackPress = () => {
    if (webViewRef && webViewRef.current && navState?.canGoBack === true) {
      webViewRef.current.goBack()
      return true
    }
    return false
  }

  const onMessage = async (event: WebViewMessageEvent) => {
    switch (event.nativeEvent.data) {
      case "kakaoLogin":
        console.log("kakaoLogin")
        break
      case "appleLogin":
        console.log("appleLogin")
        break
      default:
        console.log(event.nativeEvent.data)
        break
    }
  }

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={["*"]}
      source={{
        uri: "https://app.mafoo.kr/",
        headers: {
          "X-APP-AGENT": userAgent,
        },
      }}
      style={{
        flexGrow: 1,
        width: windowWidth,
        height: windowHeight,
      }}
      startInLoadingState={true}
      onLoadEnd={() => {
        setLoaded(true)
      }}
      onMessage={onMessage}
      javaScriptCanOpenWindowsAutomatically={true}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      mediaCapturePermissionGrantType={"grant"}
      onNavigationStateChange={setNavState}
    />
  )
}

export default DeprecatedWebView

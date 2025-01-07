import React, { Fragment, useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { WebView, WebViewMessageEvent, WebViewNavigation } from "react-native-webview";
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App(): React.JSX.Element {
  const isAndroid = Platform.OS === 'android';
  const isIOS = Platform.OS === 'ios';
  const webViewRef = React.useRef<WebView | null>(null);
  const [isLoaded, setLoaded] = useState(false);
  const [navState, setNavState] = useState<WebViewNavigation>();

  const userAgent = `MafooApp/${DeviceInfo.getVersion()} (${
    isAndroid ? 'Android' : 'iPhone'
  }/${DeviceInfo.getSystemVersion()})`;

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hide();
    }
  }, [isLoaded]);

  const onAndroidBackPress = () => {
    if (webViewRef && webViewRef.current && navState?.canGoBack === true) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  const onMessage = async (event: WebViewMessageEvent) => {
    switch (event.nativeEvent.data) {
      case 'kakaoLogin':
        console.log('kakaoLogin');
        break;
      case 'appleLogin':
        console.log('appleLogin');
        break;
      default:
        console.log(event.nativeEvent.data);
        break;
    }
  };

  useEffect(() => {
    if (isAndroid) {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      };
    }
  });
  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <WebView
            ref={webViewRef}
            originWhitelist={['*']}
            source={{
              uri: 'https://app.mafoo.kr/',
              headers: {
                'X-APP-AGENT': userAgent,
              },
            }}
            style={styles.webView}
            startInLoadingState={true}
            onLoadEnd={() => {
              setLoaded(true);
            }}
            onMessage={onMessage}
            javaScriptCanOpenWindowsAutomatically={true}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            mediaCapturePermissionGrantType={'grant'}
            onNavigationStateChange={setNavState}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    backgroundColor: 'blue',
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  },
  webView: {
    flexGrow: 1,
    width: windowWidth,
    height: windowHeight,
  },
  loadingView: {
    flexGrow: 1,
    backgroundColor: '#28CB87',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

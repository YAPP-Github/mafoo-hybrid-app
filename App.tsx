import React, {useEffect} from 'react';
import MafooLogo from './assets/images/mafoo_logo.png';
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import { WebView, WebViewMessageEvent } from "react-native-webview";
import DeviceInfo from 'react-native-device-info';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const isAndroid = Platform.OS === 'android';
  const webViewRef = React.useRef<WebView | null>(null);

  const userAgent = `MafooApp/${DeviceInfo.getVersion()} (${
    isAndroid ? 'Android' : 'iPhone'
  }/${DeviceInfo.getSystemVersion()})`;

  const onAndroidBackPress = () => {
    if (webViewRef && webViewRef.current) {
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
        break
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
    <SafeAreaView style={styles.background}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <View style={styles.viewWrapper}>
        <WebView
          ref={webViewRef}
          source={{uri: 'http://localhost:3000'}}
          style={styles.webView}
          startInLoadingState={true}
          renderLoading={() => {
            return (
              <View style={styles.loadingView}>
                <Image style={{width: 252, height: 87}} source={MafooLogo} />
              </View>
            );
          }}
          userAgent={userAgent}
          onMessage={onMessage}
        />
      </View>
    </SafeAreaView>
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

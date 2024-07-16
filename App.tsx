/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import MafooLogo from './assets/images/mafoo_logo.png';
import {
  BackHandler,
  Dimensions, Image, Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const isAndroid = Platform.OS === 'android';
  const webViewRef = React.useRef<WebView | null>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const onAndroidBackPress = () => {
    if (webViewRef && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.viewWrapper}>
        <WebView
            ref={webViewRef}
          source={{uri: 'https://mafoo.kr/'}}
          style={styles.webView}
          startInLoadingState={true}
          renderLoading={() =>{
            return <View style={styles.loadingView}>
              <Image style={{width: 252, height: 87}} source={MafooLogo} />
            </View>
          }}
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

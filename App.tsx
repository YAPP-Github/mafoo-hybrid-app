import React, {Fragment, useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {
  WebView,
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AlbumPage from './src/pages/AlbumsPage';
import AlbumDetailPage from './src/pages/AlbumDetailPage';
import SharedFriendPage from './src/pages/SharedFriendPage';
import AddFriendPage from './src/pages/AddFriendPage';
import AlbumCreatePage from './src/pages/AlbumCreatePage';
import ProfilePage from './src/pages/ProfilePage';
import IntroductionPage from './src/pages/IntroductionPage';
import KeywordPage from './src/pages/KeywordPage';
import ScannerPage from './src/pages/ScannerPage';
import ScannerSelectAlbumPage from './src/pages/ScannerSelectAlbumPage';
import SumonePage from './src/pages/SumonePage';
import HomePage from './src/pages/HomePage';

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

  const Stack = createStackNavigator();

  useEffect(() => {
    SplashScreen.hide();
    if (isLoaded) {
      //SplashScreen.hide();
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

  // TODO: 파라미터 수정
  const MafooRoutes = [
    {
      name: 'home',
      component: HomePage,
    },
    {
      name: 'album',
      component: AlbumPage,
    },
    {
      name: 'album/:id',
      component: AlbumDetailPage,
    },
    {
      name: 'album/friend',
      component: SharedFriendPage,
    },
    {
      name: 'album/friend/add',
      component: AddFriendPage,
    },
    {
      name: 'album/create',
      component: AlbumCreatePage,
    },
    {
      name: 'profile',
      component: ProfilePage,
    },
    {
      name: 'introduction',
      component: IntroductionPage,
    },
    {
      name: 'introduction/keyword',
      component: KeywordPage,
    },
    {
      name: 'scanner',
      component: ScannerPage,
    },
    {
      name: 'scanner/select-album',
      component: ScannerSelectAlbumPage,
    },
    {
      name: 'sumone',
      component: SumonePage,
    },
  ];
  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="album">
            {MafooRoutes.map(routes => (
              <Stack.Screen name={routes.name} component={routes.component} />
            ))}
            {/* <WebView
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
          /> */}
          </Stack.Navigator>
        </NavigationContainer>
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

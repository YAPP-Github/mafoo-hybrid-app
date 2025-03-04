#import "RNFBMessagingModule.h"
#import "AppDelegate.h"

#import <Firebase.h> // iOS Firebase SDK credential
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"
#import <RNKakaoLogins.h>  // 카카오 로그인 추가

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // add the following to the top of the method
  [FIRApp configure];

  self.moduleName = @"MafooApp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.

  // Headless costom props: iOS background 실행 시 React Component mount 방지
  self.initialProps = [RNFBMessagingModule addCustomPropsToUserProps:nil withLaunchOptions:launchOptions];

  
  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];

  return YES;
}

// 카카오 로그인 URL 핸들링 추가
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  if ([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl:url];
  }
  
  return NO;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

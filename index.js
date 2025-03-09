import { AppRegistry } from "react-native"
import App from "./App"
import messaging from "@react-native-firebase/messaging"
import { name as appName } from "./app.json"

// Register background handler
// It must not attempt to updaet any UI (via state)
// you can however perform network requests, update local storage.
// remoteMessage contains all the custom data via the data property.
// if remoteMessage payload conatins a notification property, the device will have displayed a
// notification to the user.

/** Switching off warning logs for v21 */
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage)
})

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }

  // Render the app component on foregound launch.
  return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)

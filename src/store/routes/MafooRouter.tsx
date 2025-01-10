import { NavigationContainer } from "@react-navigation/native"
import HomePage from "../../pages/HomePage"
import AlbumPage from "../../pages/AlbumsPage"
import AlbumDetailPage from "../../pages/AlbumDetailPage"
import SharedFriendPage from "../../pages/SharedFriendPage"
import AddFriendPage from "../../pages/AddFriendPage"
import AlbumCreatePage from "../../pages/AlbumCreatePage"
import ProfilePage from "../../pages/ProfilePage"
import IntroductionPage from "../../pages/IntroductionPage"
import KeywordPage from "../../pages/KeywordPage"
import ScannerPage from "../../pages/ScannerPage"
import ScannerSelectAlbumPage from "../../pages/ScannerSelectAlbumPage"
import SumonePage from "../../pages/SumonePage"
import { createStackNavigator } from "@react-navigation/stack"

const MafooRoutes = [
  {
    name: "home",
    component: HomePage,
  },
  {
    name: "album",
    component: AlbumPage,
  },
  {
    name: "album/:id",
    component: AlbumDetailPage,
  },
  {
    name: "album/friend",
    component: SharedFriendPage,
  },
  {
    name: "album/friend/add",
    component: AddFriendPage,
  },
  {
    name: "album/create",
    component: AlbumCreatePage,
  },
  {
    name: "profile",
    component: ProfilePage,
  },
  {
    name: "introduction",
    component: IntroductionPage,
  },
  {
    name: "introduction/keyword",
    component: KeywordPage,
  },
  {
    name: "scanner",
    component: ScannerPage,
  },
  {
    name: "scanner/select-album",
    component: ScannerSelectAlbumPage,
  },
  {
    name: "sumone",
    component: SumonePage,
  },
]

const MafooRouter = () => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="album">
        {MafooRoutes.map((routes) => (
          <Stack.Screen
            key={routes.name}
            name={routes.name}
            component={routes.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MafooRouter

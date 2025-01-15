import HomePage from "../../pages/Mainpage"
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

export type RootStackParamList = {
  home: undefined
  album: undefined
  "album/:id": { id: string }
  "album/friend": undefined
  "album/friend/add": undefined
  "album/create": undefined
  profile: undefined
  introduction: undefined
  "introduction/keyword": undefined
  scanner: undefined
  "scanner/select-album": undefined
  sumone: undefined
}

type Route = {
  name: keyof RootStackParamList
  component: React.ComponentType
}

export const UnprotectedRoutes: Route[] = [
  {
    name: "home",
    component: HomePage,
  },
]

// ProtectedRoutes definition
export const ProtectedRoutes: Route[] = [
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

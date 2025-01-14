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

// TODO: 토큰 부착 후 Unprotected Screen 제거
export const UnprotectedRoutes = [
  {
    name: "home",
    options: {
      headerShown: false,
    },
    component: HomePage,
  },
  {
    name: "album",
    options: {
      headerShown: false,
    },
    component: AlbumPage,
  },
  {
    name: "AlbumDetail",
    options: {
      headerShown: false,
      // {/** Page 별 Custom Header */ */}
      // headerTitle: (props: any) => <AlbumDetailHeader {...props} />,
    },
    component: AlbumDetailPage,
  },
  {
    name: "AlbumCreate",
    options: {},
    component: AlbumCreatePage,
  },
  {
    name: "AddFriend",
    options: {
      headerShown: false,
    },
    component: AddFriendPage,
  },
  {
    name: "SharedFriend",
    options: {},
    component: SharedFriendPage,
  },
]

export const ProtectedRoutes = [
  {
    name: "album",
    options: {},
    component: AlbumPage,
  },
  {
    name: "AlbumDetail",
    options: {},
    component: AlbumDetailPage,
  },
  {
    name: "SharedFriend",
    options: {},
    component: SharedFriendPage,
  },
  {
    name: "AddFriend",
    options: {},
    component: AddFriendPage,
  },
  {
    name: "album/create",
    options: {},
    component: AlbumCreatePage,
  },
  {
    name: "profile",
    options: {},
    component: ProfilePage,
  },
  {
    name: "introduction",
    options: {},
    component: IntroductionPage,
  },
  {
    name: "introduction/keyword",
    options: {},
    component: KeywordPage,
  },
  {
    name: "scanner",
    options: {},
    component: ScannerPage,
  },
  {
    name: "scanner/select-album",
    options: {},
    component: ScannerSelectAlbumPage,
  },
  {
    name: "sumone",
    options: {},
    component: SumonePage,
  },
]

import HomePage from "@/pages/Mainpage"
import AlbumPage from "@/pages/AlbumsPage"
import AlbumDetailPage from "@/pages/AlbumDetailPage"
import SharedFriendPage from "@/pages/SharedFriendPage"
import AddFriendPage from "@/pages/AddFriendPage"
import AlbumCreatePage from "@/pages/AlbumCreatePage"
import ProfilePage from "@/pages/ProfilePage"
import IntroductionPage from "@/pages/IntroductionPage"
import KeywordPage from "@/pages/KeywordPage"
import ScannerPage from "@/pages/ScannerPage"
import ScannerSelectAlbumPage from "@/pages/ScannerSelectAlbumPage"
import SumonePage from "@/pages/SumonePage"
import RecapPage from "@/pages/RecapPage"

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
    name: "Album",
    options: {
      headerShown: false,
    },
    component: AlbumPage,
  },
  {
    name: "AlbumDetail",
    options: {
      headerShown: false,
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
  {
    name: "scanner",
    component: ScannerPage,
  },
  {
    name: "Recap",
    options: {},
    component: RecapPage,
  },
  {
    name: "Profile",
    options: {},
    component: ProfilePage,
  },
]

// ProtectedRoutes definition
export const ProtectedRoutes = [
  {
    name: "Album",
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
    name: "Profile",
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
  {
    name: "Recap",
    options: {},
    component: RecapPage,
  },
]

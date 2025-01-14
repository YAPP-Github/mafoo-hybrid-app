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

export const UnprotectedRoutes = [
  {
    name: "home",
    component: HomePage,
  },
]

export const ProtectedRoutes = [
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

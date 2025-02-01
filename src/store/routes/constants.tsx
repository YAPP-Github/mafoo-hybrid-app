import React from "react"

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

// TODO: 토큰 부착 후 Unprotected Screen 제거
export const UnprotectedRoutes = [
  {
    name: "home",
    options: {
      headerShown: false,
    },
    components: HomePage,
  },
  {
    name: "album",
    options: {},
    component: AlbumPage,
  },
  {
    name: "AlbumDetail",
    options: {
      // {/** Page 별 Custom Header */ */}
      // headerTitle: (props: any) => <AlbumDetailHeader {...props} />,
    },
    components: AlbumDetailPage,
  },
  {
    name: "AlbumCreate",

    component: AlbumCreatePage,
  },
  {
    name: "AddFriend",
    options: {},
    component: AddFriendPage,
  },
  {
    name: "SharedFriend",
    options: {},
    components: SharedFriendPage,
  },
  {
    name: "scanner",
    components: ScannerPage,
  },
]

// ProtectedRoutes definition
export const ProtectedRoutes = [
  {
    name: "album",
    options: {},
    components: AlbumPage,
  },
  {
    name: "AlbumDetail",
    options: {},
    components: AlbumDetailPage,
  },
  {
    name: "SharedFriend",
    options: {},
    components: SharedFriendPage,
  },
  {
    name: "AddFriend",
    options: {},
    components: AddFriendPage,
  },
  {
    name: "album/create",
    options: {},
    components: AlbumCreatePage,
  },
  {
    name: "profile",
    options: {},
    components: ProfilePage,
  },
  {
    name: "introduction",
    options: {},
    components: IntroductionPage,
  },
  {
    name: "introduction/keyword",
    options: {},
    components: KeywordPage,
  },
  {
    name: "scanner",
    options: {},
    components: ScannerPage,
  },
  {
    name: "scanner/select-album",
    options: {},
    components: ScannerSelectAlbumPage,
  },
  {
    name: "sumone",
    options: {},
    components: SumonePage,
  },
]

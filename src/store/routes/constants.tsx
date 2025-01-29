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
import RecapPage from "@/pages/RecapPage"
import FramePage from "@/pages/FramePage"

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
    options: {
      headerShown: false,
    },
    components: AlbumPage,
  },
  {
    name: "AlbumDetail",
    options: {
      headerShown: false,
    },
    components: AlbumDetailPage,
  },
  {
    name: "AlbumCreate",
    options: {},
    components: AlbumCreatePage,
  },
  {
    name: "AddFriend",
    options: {
      headerShown: false,
    },
    components: AddFriendPage,
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
  {
    name: "Recap",
    options: {},
    component: RecapPage,
  },
  {
    name: "Frame",
    options: {},
    component: FramePage,
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
  {
    name: "Recap",
    options: {},
    component: RecapPage,
  },
  {
    name: "Frame",
    options: {},
    component: FramePage,
  },
]

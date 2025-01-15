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
    children: () => <HomePage />,
  },
  {
    name: "album",
    options: {
      headerShown: false,
    },
    children: () => <AlbumPage />,
  },
  {
    name: "AlbumDetail",
    options: {
      headerShown: false,
    },
    children: () => <AlbumDetailPage />,
  },
  {
    name: "AlbumCreate",
    options: {},
    children: () => <AlbumCreatePage />,
  },
  {
    name: "AddFriend",
    options: {
      headerShown: false,
    },
    children: () => <AddFriendPage />,
  },
  {
    name: "SharedFriend",
    options: {},
    children: () => <SharedFriendPage />,
  },
]

// ProtectedRoutes definition
export const ProtectedRoutes = [
  {
    name: "album",
    options: {},
    children: () => <AlbumPage />,
  },
  {
    name: "AlbumDetail",
    options: {},
    children: () => <AlbumDetailPage />,
  },
  {
    name: "SharedFriend",
    options: {},
    children: () => <SharedFriendPage />,
  },
  {
    name: "AddFriend",
    options: {},
    children: () => <AddFriendPage />,
  },
  {
    name: "album/create",
    options: {},
    children: () => <AlbumCreatePage />,
  },
  {
    name: "profile",
    options: {},
    children: () => <ProfilePage />,
  },
  {
    name: "introduction",
    options: {},
    children: () => <IntroductionPage />,
  },
  {
    name: "introduction/keyword",
    options: {},
    children: () => <KeywordPage />,
  },
  {
    name: "scanner",
    options: {},
    children: () => <ScannerPage />,
  },
  {
    name: "scanner/select-album",
    options: {},
    children: () => <ScannerSelectAlbumPage />,
  },
  {
    name: "sumone",
    options: {},
    children: () => <SumonePage />,
  },
]

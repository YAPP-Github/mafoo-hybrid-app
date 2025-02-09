import HomePage from "@/pages/Mainpage"
import AlbumPage from "@/pages/AlbumsPage"
import AlbumDetailPage from "@/pages/AlbumDetailPage"
import SharedFriendPage from "@/pages/SharedFriendPage"
import AddFriendPage from "@/pages/AddFriendPage"
import AlbumCreatePage from "@/pages/AlbumCreatePage"
import ProfilePage from "@/pages/Profile"
import ScannerPage from "@/pages/ScannerPage"
import RecapPage from "@/pages/RecapPage"

export const UnprotectedRoutes = [
  {
    name: "Home",
    options: {},
    component: HomePage,
  },
]

// ProtectedRoutes definition
export const ProtectedRoutes = [
  ...UnprotectedRoutes,
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
    name: "AlbumCreate",
    options: {},
    component: AlbumCreatePage,
  },
  {
    name: "Profile",
    options: {},
    component: ProfilePage,
  },
  // {
  //   name: "Introduction",
  //   options: {},
  //   component: IntroductionPage,
  // },
  // {
  //   name: "introduction/keyword",
  //   options: {},
  //   component: KeywordPage,
  // },
  {
    name: "Scanner",
    options: {},
    component: ScannerPage,
  },
  // {
  //   name: "SelectAlbum",
  //   options: {},
  //   component: ScannerSelectAlbumPage,
  // },
  // {
  //   name: "Sumone",
  //   options: {},
  //   component: SumonePage,
  // },
  {
    name: "Recap",
    options: {},
    component: RecapPage,
  },
]

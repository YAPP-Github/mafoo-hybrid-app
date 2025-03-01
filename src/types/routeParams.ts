import { AlbumInfo } from "@/album/types"

export type RootStackParamList = {
  AddFriend: { albumId: string } | undefined
  SharedFriend: { albumId: string } | undefined
  Recap?: { albumId: string } | undefined
  Frame?: { albumInfo: AlbumInfo }
  Album: undefined
  Notification: undefined
  Home: undefined
  AlbumCreate: undefined
  Profile: undefined | {}
  AlbumDetail: { albumId: string } | undefined
}

export const NAVIGATION_PAGE = [
  "AddFriend",
  "SharedFriend",
  "Recap",
  "Frame",
  "Album",
  "Notification",
  "Home",
  "AlbumCreate",
  "Profile",
  "AlbumDetail",
]

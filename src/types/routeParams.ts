import { AlbumInfo } from "@/album/types"

export type RootStackParamList = {
  AddFriend: { albumId: string } | undefined
  SharedFriend: { albumId: string } | undefined
  Recap?: { albumId: string } | undefined
  Frame?: { albumInfo: AlbumInfo }
  Album: undefined
  Notification: undefined
}

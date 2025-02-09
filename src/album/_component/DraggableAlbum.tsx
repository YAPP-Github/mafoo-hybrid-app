import { useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigation } from "@react-navigation/native"

import {
  GetBulkAlbumResponse,
  deleteSharedMember,
  updateSharedMemberStatus,
} from "@/api/photo"
import { usePatchAlbumMove } from "@/hooks/useAlbum"
import AlbumItem from "./AlbumItem"
import WaitingAlbumItem from "./WaitingAlbumItem"
import { StackNavigationProp } from "@react-navigation/stack"
import { ShareStatus } from "@/api/photo"

interface AlbumItemProps {
  album: GetBulkAlbumResponse
  index: number
  moveAlbum?: (dragIndex: number, hoverIndex: number) => void // TODO: Required로 변경
  showNewRing: boolean
}
const ItemType = "ALBUM"

export type RootStackParamList = {
  AlbumDetail: { albumId: string } | undefined
}

const DraggableAlbum = ({ album, showNewRing }: AlbumItemProps) => {
  const queryClient = useQueryClient()
  const { patchAlbumMove } = usePatchAlbumMove()
  const isDisplayable = !album.shareStatus || album.shareStatus !== "REJECTED"
  const isShared = !album.shareStatus || album.shareStatus === "ACCEPTED"
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [isSelected, setIsSelected] = useState("")

  const onTapAccept = () => {
    if (album.sharedMemberId) {
      updateSharedMemberStatus(album.sharedMemberId, ShareStatus.ACCEPTED).then(
        () => {
          queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
        }
      )
    }
  }

  const onTapReject = () => {
    if (!album.sharedMemberId) {
      return
    }

    Alert.alert("앨범 공유 거절", "정말 앨범 공유를 거절할까요?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "거절하기",
        onPress: () => {
          deleteSharedMember(album.sharedMemberId!).then(() => {
            queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
          })
        },
        style: "destructive",
      },
    ])
  }

  const value = {
    ...album,
    photoCount: Number(album.photoCount),
    isNew: true,
    isSelected: album.albumId === isSelected,
    isEditable: false,
  }

  const onClick = () => {
    if (isDisplayable && isShared) {
      setIsSelected(album.albumId)
      navigation.navigate("AlbumDetail", { albumId: album.albumId })
    }
  }

  return (
    <TouchableOpacity onPress={onClick}>
      {isShared ? (
        <AlbumItem value={value} handleValue={() => null} />
      ) : (
        <WaitingAlbumItem
          showNewRing={showNewRing}
          value={value}
          onAccept={onTapAccept}
          onReject={onTapReject}
        />
      )}
    </TouchableOpacity>
  )
}

export default DraggableAlbum

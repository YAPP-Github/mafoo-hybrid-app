import React, { useState } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigation } from "@react-navigation/native"

import { deleteSharedMember, updateSharedMemberStatus } from "../../api/photo"
import { usePatchAlbumMove } from "../hooks/useAlbum"
import AlbumItem from "./AlbumItem"
import WaitingAlbumItem from "./WaitingAlbumItem"
import { StackNavigationProp } from "@react-navigation/stack"

interface AlbumItemProps {
  album: any // GetBulkAlbumResponse
  index: number
  moveAlbum?: (dragIndex: number, hoverIndex: number) => void // TODO: Required로 변경
}
const ItemType = "ALBUM"

export type RootStackParamList = {
  AlbumDetail: { albumId: string } | undefined
}

const DraggableAlbum = ({ album }: AlbumItemProps) => {
  const queryClient = useQueryClient()
  const { patchAlbumMove } = usePatchAlbumMove()
  const isDisplayable = !album.shareStatus || album.shareStatus !== "REJECTED"
  const isShared = !album.shareStatus || album.shareStatus === "ACCEPTED"
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const [isSelected, setIsSelected] = useState("")

  const onTapAccept = () => {
    if (album.sharedMemberId) {
      //   updateSharedMemberStatus(album.sharedMemberId, ShareStatus.ACCEPTED).then(
      //     () => {
      //       queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
      //     }
      //   )
      // }
    }
  }

  const onTapReject = () => {
    if (album.sharedMemberId) {
      deleteSharedMember(album.sharedMemberId).then(() => {
        queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
      })
    }
  }

  const value = {
    ...album,
    photoCount: Number(album.photoCount),
    isNew: false,
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
    <TouchableOpacity onPress={onClick} style={styles.container}>
      {isShared ? (
        <AlbumItem value={value} handleValue={() => null} />
      ) : (
        <WaitingAlbumItem
          value={value}
          onAccept={onTapAccept}
          onReject={onTapReject}
        />
      )}
    </TouchableOpacity>
  )
}

export default DraggableAlbum

// TODO: {`aspect-[164/150] w-[calc((100%-1rem)/2)] rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}> */}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
  },
})

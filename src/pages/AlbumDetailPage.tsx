"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

// import {
//   AlbumMenuAction,
//   AlbumMenuDialog,
// } from "@/app/album/[id]/_component/AlbumMenuDialog"
// import { Dialog } from "@/app/album/[id]/_component/Dialog"
import {
  deleteAlbum,
  deleteSharedMember,
  getAlbum,
  GetSharedAlbumResponse,
  PermissionLevel,
  SharedMember,
} from "../api/photo"
// import { useGetProfile } from "@/app/profile/hooks/useProfile"
//import Icon from "@/common/Icon"
import { albumDetailStickyHeaderVariants as headerVariants } from "../styles/variants"
import { cn } from "../utils"
import { AlbumPhotos } from "../album/_component/AlbumPhotos"
import AlbumDetailHeader from "../album/_component/AlbumDetailHeader"
import {
  albumInfo as albumInfoDummy,
  sharedMembersPreview as sharedMembersPreviewDummy,
} from "../dummy"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import MFText from "../common/MFText"

export type RootStackParamList = {
  AddFriend: { albumId: string } | undefined
  SharedFriend: { albumId: string } | undefined
}

export type AlbumDetailPageProps = {
  route: {
    params: {
      albumId: string
    }
  }
}

const AlbumDetailPage = ({ route }: AlbumDetailPageProps) => {
  const { albumId: id } = route.params

  const [albumInfo, setAlbumInfo] = useState<any>() // GetSharedAlbumResponse
  // const profile = useGetProfile()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false)
  const [isQuitModalShown, setIsQuitModalShown] = useState(false)
  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    const initAlbum = async () => {
      // const data = await getAlbum(id)
      // if (data) {
      //   setAlbumInfo(data)
      // }
      setAlbumInfo(albumInfoDummy)
    }
    initAlbum()
  }, [id])

  if (!albumInfo) return

  const sharedMembers = albumInfo?.sharedMembers || []
  const ownerShared: SharedMember = {
    sharedMemberId: albumInfo.ownerMemberId ?? "",
    memberId: albumInfo.ownerMemberId ?? "",
    albumId: albumInfo.albumId ?? "",
    profileImageUrl: albumInfo.ownerProfileImageUrl ?? "",
    permissionLevel: PermissionLevel.OWNER,
    shareStatus: "SHARED",
    name: albumInfo.ownerName ?? "",
    serialNumber: "0000",
  }
  const isOwner = true
  //albumInfo.ownerMemberId === profile.profile?.memberId
  // const me = sharedMembers.find(
  //   (member) => member.memberId === profile.profile?.memberId
  // )

  // const myPermission = isOwner ? PermissionLevel.OWNER : me?.permissionLevel
  const myPermission = "OWNER"

  // const sharedMembersPreview = [ownerShared, ...sharedMembers.slice(0, 5)]

  const handleDeleteAlbum = async () => {
    //  await deleteAlbum(albumInfo.albumId)
    //  await queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
    // router.push("/album")
  }

  const handleQuitAlbum = async () => {
    //   if (me) {
    //     await deleteSharedMember(me.sharedMemberId)
    //     await queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
    //  //   router.push("/album")
    //   }
  }

  const deleteDialogProps = {
    title: "앨범을 삭제할까요?", //`'${albumInfo.name}' 앨범을 삭제할까요?`,
    desc: "모든 사진도 함께 삭제되며, 복구할 수 없어요",
    confirmBtnContext: "앨범 삭제",
    onClose: () => {
      setIsDeleteModalShown(false)
    },
    onConfirm: handleDeleteAlbum,
  }

  const quitDialogProps = {
    title: "앨범에서 나갈까요?", //`'${albumInfo.name}' 앨범에서 나갈까요?`,
    desc: "앨범 내의 사진은 그대로 유지되어요",
    confirmBtnContext: "앨범 나가기",
    onClose: () => {
      setIsQuitModalShown(false)
    },
    onConfirm: handleQuitAlbum,
  }

  const onTapMenuAction = (action: any) => {
    // AlbumMenuAction
    // setIsMenuVisible(false)
    // switch (action) {
    //   case AlbumMenuAction.DELETE:
    //     setIsDeleteModalShown(true)
    //     break
    //   case AlbumMenuAction.QUIT:
    //     setIsQuitModalShown(true)
    //     break
    //   default:
    // }
  }

  const typeToBackgroundColor: Record<string, string> = {
    HEART: "bg-red-200",
    FIRE: "bg-butter-200",
    BASKETBALL: "bg-green-200",
    BUILDING: "bg-skyblue-200",
    STARFALL: "bg-purple-200",
    SMILE_FACE: "bg-pink-200",
  }

  const backgroundColorClass = albumInfo?.type
    ? typeToBackgroundColor[albumInfo.type]
    : "bg-gray-200"

  //     <View>
  //   <SVGImg width="70%" height="70%" fill="blue" color="red" />
  // </View>
  return (
    <>
      <StatusBar
        className={`${cn(
          headerVariants({ type: albumInfo.type })
        )}`}></StatusBar>
      <View
        className={`flex flex-1 ${cn(
          headerVariants({ type: albumInfo.type })
        )}`}>
        <AlbumDetailHeader
          albumInfo={albumInfo}
          className={`sticky top-0 z-20 ${backgroundColorClass}`}
          onTapMenu={() => setIsMenuVisible(true)}
        />
        {/* {isDeleteModalShown && <Dialog {...deleteDialogProps} />}
        {isQuitModalShown && <Dialog {...quitDialogProps} />}
        {myPermission && (
          <AlbumMenuDialog
            isVisible={isMenuVisible}
            myPermission={myPermission}
            onTapBackdrop={() => setIsMenuVisible(false)}
            onTapAction={onTapMenuAction}
          />
        )} */}
        {/* <div
          className={cn(
            headerVariants({ type: albumInfo.type }),
            "flex flex-row justify-center"
          )}>
          <span className="tp-title1-semibold text-gradient-purple my-3 bg-clip-text text-center">
            함께 찍은 친구랑
            <br />
            앨범을 공유해보세요
          </span>
        </div> */}

        <View
          className={cn(
            headerVariants({ type: albumInfo.type }),
            "z-10 h-20 w-full px-4"
          )}>
          <ShareBar
            canAddFriend={
              myPermission == PermissionLevel.OWNER ||
              myPermission == PermissionLevel.FULL_ACCESS
            }
            onTapFindFriend={() =>
              navigation.navigate("AddFriend", { albumId: id })
            }
            onTapViewFriend={() =>
              navigation.navigate("SharedFriend", { albumId: id })
            }
            previewMembers={sharedMembersPreviewDummy as any} // TODO: 데이터 변경
          />
        </View>
        <View className="sticky z-10 flex w-full flex-row justify-between bg-white rounded-tl-3xl rounded-tr-3xl">
          <View className="flex flex-col px-6 pb-2 pt-6 w-full">
            <MFText className="text-body2 text-gray-500 pb-[8px]">
              함께 찍은 추억
            </MFText>
            <MFText weight="SemiBold" className="text-header1 text-gray-800">
              {albumInfo.photoCount}장
            </MFText>
          </View>
        </View>
        {/*myPermission*/}
        <AlbumPhotos albumInfo={albumInfo} myPermission={undefined} />
      </View>
    </>
  )
}

interface ShareBarProps {
  onTapFindFriend: () => void
  onTapViewFriend?: () => void
  previewMembers: SharedMember[]
  canAddFriend: boolean
}

const ShareBar: React.FC<ShareBarProps> = ({
  onTapFindFriend,
  onTapViewFriend,
  previewMembers,
  canAddFriend,
}) => {
  return (
    <View className="tp-title2-semibold flex-row items-center justify-between rounded-2xl bg-white p-4 py-[16px] text-gray-700 shadow-sm">
      <View className="flex-row items-center space-x-2">
        {previewMembers.length === 1 ? (
          <View className="my-1 flex-row items-center space-x-2">
            <MFText weight="SemiBold" className="text-title2 text-gray-700">
              친구랑 앨범 공유하기
            </MFText>
          </View>
        ) : (
          <View className="flex-row -space-x-4 h-11">
            {previewMembers?.map((member, idx) => (
              <Image
                key={member.memberId}
                source={{ uri: member.profileImageUrl }}
                className="h-11 w-11 rounded-full border-2 border-white"
                style={{ zIndex: 10 + (5 - idx) }}
              />
            ))}
          </View>
        )}
      </View>
      {/* {previewMembers.length > 1 && onTapViewFriend && ( */}
      <View className="flex-row space-x-2">
        {previewMembers && onTapViewFriend && (
          <TouchableOpacity
            onPress={onTapViewFriend}
            className="rounded-md bg-gray-100 px-3 py-2 active:bg-gray-200">
            <Text className="tp-caption1-semibold text-gray-600">
              친구들 보기
            </Text>
          </TouchableOpacity>
        )}
        {canAddFriend && (
          <TouchableOpacity
            onPress={onTapFindFriend}
            className="rounded-md bg-gray-100 px-3 py-2 active:bg-gray-200">
            <Text className="tp-caption1-semibold text-gray-600">
              친구 찾기
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default AlbumDetailPage

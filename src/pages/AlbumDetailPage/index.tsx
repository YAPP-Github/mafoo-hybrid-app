import { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useQueryClient } from "@tanstack/react-query"
import {
  PermissionLevel,
  SharedMember,
  deleteAlbum,
  deleteSharedMember,
} from "@/api/photo"
import Icon from "@/common/Icon"
import { albumDetailStickyHeaderVariants as headerVariants } from "@/styles/variants"
import { cn } from "@/utils"
import { AlbumPhotos } from "@/album/_component/AlbumPhotos"
import AlbumDetailHeader from "@/album/_component/AlbumDetailHeader"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import MFText from "@/common/MFText"
import { Dialog } from "@/album/_component/Dialog"
import AlbumMenuDialog, {
  AlbumMenuAction,
} from "@/album/_component/AlbumMenuDialog"
import { CreateRecapButton } from "@/album/_component/recap/CreateRecap"
import Frame from "@/album/_component/recap/Frame"
import VideoLoading from "@/album/_component/VideoLoading"
import { useGetProfile } from "@/profile/hooks/useProfile"
import { useGetAlbum } from "@/hooks/usePhoto"
import { RootStackParamList } from "@/types/routeParams"
import PageContainer from "@/common/PageContainer"
import { COLOR_MAP } from "../ExportAlbumPage/constant"

export type AlbumDetailPageProps = {
  route: {
    params: {
      albumId: string
    }
  }
}

const AlbumDetailPage = ({ route }: AlbumDetailPageProps) => {
  const { albumId: id } = route.params

  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false)
  const [isQuitModalShown, setIsQuitModalShown] = useState(false)
  const [isRecapOpen, setIsRecapOpen] = useState(false)
  const [isCapture, setIsCapture] = useState(false)
  // 앨범 삭제 여부
  const [isDelete, setIsDelete] = useState(false)

  const queryClient = useQueryClient()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  // 호출하기 전에 먼저 삭제되었는지 여부 확인
  const { albums: albumInfo } = useGetAlbum(id, isDelete)
  const { profile } = useGetProfile()

  if (!albumInfo) {
    return
  }

  const sharedMembers = albumInfo.sharedMembers || []
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

  const isOwner = albumInfo.ownerMemberId === profile?.memberId
  const me = sharedMembers.find(
    (member) => member.memberId === profile?.memberId
  )
  const myPermission = isOwner ? PermissionLevel.OWNER : me?.permissionLevel
  const sharedMembersPreview = [ownerShared, ...sharedMembers.slice(0, 5)]

  const handleDeleteAlbum = async () => {
    await deleteAlbum(albumInfo.albumId)

    setIsDelete(true)

    // 앨범 목록 갱신 및 앨범 캐시 삭제
    queryClient.removeQueries({
      queryKey: ["getAlbum", albumInfo.albumId],
    })

    await queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
    navigation.navigate("Album")
    setIsDeleteModalShown(false)
  }

  const handleQuitAlbum = async () => {
    if (me) {
      await deleteSharedMember(me.sharedMemberId)
      await queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
      navigation.navigate("Album")
    }
  }

  const deleteDialogProps = {
    title: `${albumInfo.name} 앨범을 삭제할까요?`,
    desc: "모든 사진도 함께 삭제되며, 복구할 수 없어요",
    confirmBtnContext: "앨범 삭제",
    onClose: () => {
      setIsDeleteModalShown(false)
    },
    onConfirm: handleDeleteAlbum,
    visible: isDeleteModalShown,
  }

  const quitDialogProps = {
    title: `'${albumInfo.name}' 앨범에서 나갈까요?`,
    desc: "앨범 내의 사진은 그대로 유지되어요",
    confirmBtnContext: "앨범 나가기",
    onClose: () => {
      setIsQuitModalShown(false)
    },
    onConfirm: handleQuitAlbum,
    visible: isQuitModalShown,
  }

  const onTapMenuAction = (action: AlbumMenuAction) => {
    setIsMenuVisible(false)
    switch (action) {
      case AlbumMenuAction.DELETE:
        setIsDeleteModalShown(true)
        break
      case AlbumMenuAction.QUIT:
        setIsQuitModalShown(true)
        break
      default:
    }
  }

  const backgroundColorClass = albumInfo?.type
    ? COLOR_MAP[albumInfo.type].bg
    : "bg-gray-200"

  return (
    <PageContainer
      statusBarColor={COLOR_MAP[albumInfo.type].bg}
      homeIndicatorColor="#ffffff">
      <View className={`flex-1 ${headerVariants({ type: albumInfo.type })} `}>
        <AlbumDetailHeader
          albumInfo={albumInfo}
          className={`sticky top-0 z-20 ${backgroundColorClass}`}
          onTapMenu={() => setIsMenuVisible(true)}
        />
        {isDeleteModalShown && <Dialog {...deleteDialogProps} />}
        {isQuitModalShown && <Dialog {...quitDialogProps} />}
        {myPermission && (
          <AlbumMenuDialog
            albumId={id}
            isVisible={isMenuVisible}
            myPermission={myPermission}
            onTapBackdrop={() => {
              setIsMenuVisible(false)
            }}
            onTapAction={onTapMenuAction}
          />
        )}
        <View
          className={cn(
            headerVariants({ type: albumInfo.type }),
            "z-10 h-20 w-full px-4"
          )}>
          <ShareBar
            canAddFriend={
              myPermission === PermissionLevel.OWNER ||
              myPermission === PermissionLevel.FULL_ACCESS
            }
            onTapViewFriend={() =>
              navigation.navigate("SharedFriend", { albumId: id })
            }
            onTapFindFriend={() =>
              navigation.navigate("AddFriend", { albumId: id })
            }
            previewMembers={sharedMembersPreview}
          />
        </View>
        <View className={headerVariants({ type: albumInfo.type })}>
          <View className="sticky z-10 flex w-full flex-row justify-between bg-sumone-white rounded-tl-3xl rounded-tr-3xl">
            <View className="flex flex-col px-6 pb-2 pt-6 w-full">
              <MFText className="text-body2 text-gray-500 pb-[8px]">
                함께 찍은 추억
              </MFText>
              <View className="flex-row justify-between items-center">
                <MFText
                  weight="SemiBold"
                  className="text-header1 text-gray-800">
                  {albumInfo?.photoCount}장
                </MFText>
                {/* `보기만` 권한은 리캡 생성 불가 */}
                {myPermission !== PermissionLevel.VIEW_ACCESS &&
                  Number(albumInfo?.photoCount) >= 1 && (
                    <CreateRecapButton
                      type={albumInfo?.type || "HEART"}
                      onPress={() => {
                        setIsCapture(true)
                        setIsRecapOpen(true)
                      }}>
                      리캡 만들기
                    </CreateRecapButton>
                  )}
              </View>
            </View>
          </View>
        </View>
        {isCapture && (
          <Frame
            userName={profile?.name || "user"}
            type={albumInfo?.type || "HEART"}
            setUpload={setIsRecapOpen}
            albumId={id}
            albumName={albumInfo?.name}
          />
        )}
        <VideoLoading
          visible={isRecapOpen}
          type={albumInfo.type}
          closeRecapModal={() => setIsRecapOpen(false)}
        />
        <AlbumPhotos albumInfo={albumInfo} myPermission={myPermission} />
      </View>
    </PageContainer>
  )
}

interface ShareBarProps {
  onTapViewFriend?: () => void
  onTapFindFriend: () => void
  previewMembers: SharedMember[]
  canAddFriend: boolean
}

const ShareBar: React.FC<ShareBarProps> = ({
  onTapViewFriend,
  onTapFindFriend,
  previewMembers,
  canAddFriend,
}) => {
  return (
    <View className="tp-title2-semibold flex-row items-center justify-between rounded-2xl bg-sumone-white p-4 py-[16px] text-gray-700 shadow-sm">
      <View className="flex-row items-center space-x-2">
        {previewMembers.length === 1 ? (
          <View className="flex-row items-center my-1 space-x-2">
            <Icon name="message" size={28} color="#FFCF55" />
            <MFText weight="SemiBold" className="text-gray-700 text-title2">
              친구랑 앨범 공유하기
            </MFText>
          </View>
        ) : (
          <View className="flex-row h-11">
            {previewMembers.slice(0, 4)?.map((member, idx) => (
              <View
                key={`sharebar-${member.memberId}`}
                className="relative"
                style={{
                  zIndex: 10 + (5 - idx),
                  marginLeft: idx === 0 ? 0 : -10,
                  opacity:
                    previewMembers.length >= 5 ? (idx >= 3 ? 0.5 : 1) : 1,
                }}>
                <Image
                  key={member.memberId}
                  source={{ uri: member.profileImageUrl }}
                  className="border-2 border-white rounded-full h-11 w-11"
                />
                {member.shareStatus === "PENDING" && (
                  <View
                    style={{ zIndex: 11 + (5 - idx) }}
                    className="absolute top-0 left-0 z-50 flex items-center justify-center h-11 w-11">
                    <View className="flex items-center justify-center w-full h-full rounded-full opacity-50 bg-gray-1000">
                      <Text className="-mt-5 text-white text-[40px]">...</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
      <View className="flex-row space-x-2">
        {previewMembers.length > 1 && onTapViewFriend && (
          <TouchableOpacity
            onPress={onTapViewFriend}
            className="px-3 py-2 bg-gray-100 rounded-md active:bg-gray-200">
            <Text className="text-gray-600 tp-caption1-semibold">
              친구들 보기
            </Text>
          </TouchableOpacity>
        )}
        {canAddFriend && (
          <TouchableOpacity
            onPress={onTapFindFriend}
            className="px-3 py-2 bg-gray-100 rounded-md active:bg-gray-300">
            <MFText className="text-gray-600 text-caption1" weight="SemiBold">
              친구 찾기
            </MFText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default AlbumDetailPage

import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"

import {
  deleteSharedMember,
  getAlbum,
  GetSharedAlbumResponse,
  PermissionLevel,
  SharedMember,
  updateAlbumOwner,
  updateShareMemberPermissionLevel,
} from "../api/photo"
import { Header } from "../album/_component/friend/Header"
import SharedFriendElement from "../album/_component/friend/SharedFriendElement"
import { FriendMenuDialog } from "../album/_component/friend/FriendMenuDialog"
import PageContainer from "@/common/PageContainer"
import { colors } from "@/constants/colors"
import { useGetProfile } from "@/profile/hooks/useProfile"
import SharePermissionDialog from "@/common/SharePermissionDialog"
import Icon from "@/common/Icon"
// import Icon from "../common/Icon"

const SharedFriendPage = ({
  route,
}: {
  route: { params: { albumId: string } }
}) => {
  const { albumId: id } = route.params
  const [albumInfo, setAlbumInfo] = useState<GetSharedAlbumResponse | null>(
    null
  )
  const profile = useGetProfile()
  const [isEditPermissionDialogVisible, setIsEditPermissionDialogVisible] =
    useState(false)
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false)
  const [selectedMember, setSelectedMember] = useState<SharedMember | null>(
    null
  )

  const initAlbum = async () => {
    const data = await getAlbum(id)
    if (data) {
      setAlbumInfo(data)
    }
  }

  useEffect(() => {
    initAlbum()
  }, [id])

  const onTapKickFriend = async () => {
    if (selectedMember) {
      await deleteSharedMember(selectedMember.sharedMemberId).then(() =>
        initAlbum()
      )
    }
  }

  const saveMemberPermission = (permission: PermissionLevel) => {
    if (selectedMember) {
      setIsEditPermissionDialogVisible(false)
      if (permission === PermissionLevel.OWNER) {
        updateAlbumOwner(id, selectedMember.memberId).then(() => initAlbum())
      } else {
        updateShareMemberPermissionLevel(
          selectedMember.sharedMemberId,
          permission
        ).then(() => initAlbum())
      }
    }
  }

  const onTapEditPermission = () => {
    setIsEditDialogVisible(false)
    setIsEditPermissionDialogVisible(true)
  }

  if (!albumInfo) {
    return null
  }

  const isOwner = (albumInfo.ownerMemberId || "") === profile?.profile?.memberId
  const sharedMembers = albumInfo.sharedMembers || []

  return (
    <PageContainer statusBarColor={colors.white}>
      <Header friendCount={sharedMembers.length} />
      <SharePermissionDialog
        isOwnerMigrateVisible={selectedMember?.shareStatus !== "PENDING"}
        defaultPermissionLevel={
          selectedMember?.permissionLevel || PermissionLevel.FULL_ACCESS
        }
        imageUrl={selectedMember?.profileImageUrl || ""}
        name={selectedMember?.name || ""}
        isVisible={isEditPermissionDialogVisible}
        onExit={() => setIsEditPermissionDialogVisible(false)}
        onTapSave={saveMemberPermission}
        radioColor={colors.purple[600]}
      />
      <ScrollView className="flex-1 px-6">
        <View className="flex-row items-center gap-2 py-2">
          <Text className="text-gray-500">앨범장</Text>
          <Icon name="info" size={16} />
        </View>
        <SharedFriendElement
          imageUrl={albumInfo.ownerProfileImageUrl ?? ""}
          name={albumInfo.ownerName ?? ""}
          tag={`#${albumInfo.ownerSerialNumber ?? ""}`}
          isOwner
          isManageVisible={false}
          onTapShare={() => {}}
          isPending={false}
        />
        <View className="w-full h-4 my-4 bg-gray-50" />
        {sharedMembers.map((member) => (
          <SharedFriendElement
            key={member.memberId}
            imageUrl={member.profileImageUrl}
            name={member.name}
            tag={`#${member.serialNumber}`}
            isOwner={false}
            isManageVisible={isOwner}
            isPending={member.shareStatus === "PENDING"}
            onTapShare={() => {
              setSelectedMember(member)
              setIsEditDialogVisible(true)
            }}
          />
        ))}
      </ScrollView>
      <FriendMenuDialog
        isVisible={isEditDialogVisible}
        onTapBackdrop={() => setIsEditDialogVisible(false)}
        onTapKick={onTapKickFriend}
        onTapPermission={onTapEditPermission}
      />
    </PageContainer>
  )
}

export default SharedFriendPage

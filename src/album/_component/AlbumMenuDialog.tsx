import React, { useState } from "react"
import { Modal, View, Pressable, TouchableOpacity } from "react-native"
import { PermissionLevel } from "@/api/photo"
import Icon from "@/common/Icon"
import { styled } from "nativewind"
import MFText from "@/common/MFText"
import { createExport } from "@/api/album/export"
import { useNavigation } from "@react-navigation/native"

export enum AlbumMenuAction {
  QUIT = "QUIT",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

interface AlbumMenuDialogProps {
  albumId: string
  isVisible: boolean
  myPermission: PermissionLevel
  onTapBackdrop: () => void
  onTapAction: (action: AlbumMenuAction) => void
}

const StyledPressable = styled(Pressable)

const AlbumMenuDialog: React.FC<AlbumMenuDialogProps> = ({
  albumId,
  isVisible,
  myPermission,
  onTapBackdrop,
  onTapAction,
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const navigation = useNavigation()

  const handleExportAlbum = async () => {
    console.log("앨범 게시하기", albumId)
    await createExport(albumId)
      .then((res) => {
        console.log("앨범 게시하기 결과", res)
        navigation.navigate("ExportAlbum", { exportId: res.exportId })
      })
      .catch((err) => {
        console.log("앨범 게시하기 실패", err)
        // TODO: if){"code": "AE0005", "message": "같은 앨범에 대한 앨범 내보내기가 이미 존재합니다"}인경우 exportId 찾아서 추가 라우팅
      })
  }

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <TouchableOpacity
        className="flex-1 bg-gray-700"
        onPress={onTapBackdrop}
        activeOpacity={0.45}
        style={{ opacity: 0.45, paddingHorizontal: 21 }}
      />

      <View
        className="absolute left-[50%] bottom-[24px]"
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout
          setOffset({ x: -width / 2, y: -height / 2 })
        }}
        style={{
          transform: [{ translateX: offset.x }],
        }}>
        <MFText
          weight="SemiBold"
          className="text-body2 text-white left-[50%] mb-[8px]"
          style={{
            transform: [{ translateX: offset.x + 43 }],
          }}>
          💡친구 목록에서 권한을 넘겨야 나갈 수 있어요
        </MFText>
        <View className="w-[350px] py-[12px] px-[16px] bg-white rounded-2xl">
          <View className="flex flex-col">
            {/* 앨범 삭제하기 */}
            {myPermission === PermissionLevel.OWNER && (
              <>
                <StyledPressable
                  className="flex flex-row items-center justify-center gap-2 py-4"
                  onPress={() => onTapAction(AlbumMenuAction.DELETE)}>
                  <Icon name="trash" size={28} color="red-500" />
                  <MFText weight="SemiBold" className="text-red-500 text-body1">
                    앨범 삭제하기
                  </MFText>
                </StyledPressable>
                <View className="h-[1px] bg-gray-200" />
              </>
            )}
            {/* 친구 목록에서 권한 넘겨야 앨범에서 나가기 보임 */}
            {myPermission !== PermissionLevel.OWNER && (
              <>
                <View className="h-[1px] bg-gray-200" />
                <StyledPressable
                  className="flex flex-row items-center justify-center gap-2 py-4"
                  onPress={() => onTapAction(AlbumMenuAction.QUIT)}>
                  <Icon name="galleryIcon" size={28} color="gray-500" />
                  <MFText
                    weight="SemiBold"
                    className="text-gray-600 text-body1">
                    앨범에서 나가기
                  </MFText>
                </StyledPressable>
              </>
            )}
            {/* 앨범 수정하기 */}
            <View className="h-[1px] bg-gray-200" />
            <StyledPressable
              className="flex flex-row items-center justify-center gap-2 py-4"
              onPress={() => {}}>
              <Icon name="albumEditPencil" size={28} color="#606A78" />
              <MFText weight="SemiBold" className="text-gray-600 text-body1">
                앨범 수정하기
              </MFText>
            </StyledPressable>
            {/* FIXME: 앨범 게시하기 */}
            <View className="h-[1px] bg-gray-200" />
            <StyledPressable
              className="flex flex-row items-center justify-center gap-2 py-4"
              onPress={handleExportAlbum}>
              <Icon name="albumEditPencil" size={28} color="#606A78" />
              <MFText weight="SemiBold" className="text-gray-600 text-body1">
                앨범 게시하기
              </MFText>
            </StyledPressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AlbumMenuDialog

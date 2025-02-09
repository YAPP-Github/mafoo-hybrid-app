import React, { useEffect, useState } from "react"
import { View, Text, Image, Modal, TouchableOpacity } from "react-native"
import RadioGroup from "react-native-radio-buttons-group"
import { PermissionLevel } from "@/api/photo"
import { styled } from "nativewind"
import MFText from "./MFText"

const StyledTouchableOpacity = styled(TouchableOpacity)

const SharePermissionDialog = ({
  imageUrl,
  name,
  isVisible,
  isOwnerMigrateVisible,
  onExit,
  onTapSave,
  defaultPermissionLevel = PermissionLevel.FULL_ACCESS,
  radioColor,
}: {
  imageUrl: string
  name: string
  isVisible: boolean
  isOwnerMigrateVisible: boolean
  onExit: () => void
  onTapSave: (level: PermissionLevel) => void
  defaultPermissionLevel: PermissionLevel
  radioColor: string
}) => {
  const [permissionLevel, setPermissionLevel] = useState<PermissionLevel>(
    defaultPermissionLevel
  )

  useEffect(() => {
    setPermissionLevel(defaultPermissionLevel)
  }, [defaultPermissionLevel])

  const permissions = [
    {
      id: PermissionLevel.FULL_ACCESS,
      label: "전체 편집",
      value: PermissionLevel.FULL_ACCESS,
    },
    {
      id: PermissionLevel.DOWNLOAD_ACCESS,
      label: "다운로드만",
      value: PermissionLevel.DOWNLOAD_ACCESS,
    },
    {
      id: PermissionLevel.VIEW_ACCESS,
      label: "보기만",
      value: PermissionLevel.VIEW_ACCESS,
    },
  ]

  if (isOwnerMigrateVisible) {
    permissions.push({
      id: PermissionLevel.OWNER,
      label: "앨범장 넘기기",
      value: PermissionLevel.OWNER,
    })
  }

  const permissionsWithBorderColor = permissions.map((permission) => ({
    ...permission,
    color: radioColor,
    borderColor:
      permission.value === permissionLevel ? radioColor : "lightgray",
  }))

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View className="items-center justify-center flex-1 px-5 bg-gray-800/50">
        <View className="w-full p-5 bg-white rounded-2xl">
          {/* 이미지 및 타이틀 */}
          <View className="flex flex-col items-center gap-3">
            <Image
              source={{ uri: imageUrl }}
              className="w-24 h-24 rounded-full"
              resizeMode="cover"
            />
            <MFText weight="SemiBold" className="text-gray-800 text-title1">
              {name}님의 편집 권한
            </MFText>
          </View>

          <View className="my-4 h-[1.5px] w-full bg-gray-50" />

          {/* 권한 선택 */}
          <View className="flex flex-col">
            <RadioGroup
              radioButtons={permissionsWithBorderColor}
              onPress={(value) => setPermissionLevel(value as PermissionLevel)}
              selectedId={permissionLevel}
              containerStyle={{ alignItems: "flex-start" }}
            />
          </View>

          {/* 버튼 영역 */}
          <View className="flex-row justify-between gap-3 mt-5">
            <StyledTouchableOpacity
              className="items-center py-3 bg-gray-100 rounded-lg grow basis-1 active:bg-gray-200"
              onPress={onExit}>
              <MFText className="font-semibold text-gray-600">닫기</MFText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              style={{
                backgroundColor: radioColor,
              }}
              className="items-center py-3 rounded-lg grow basis-1 active:bg-gray-700"
              onPress={() => onTapSave(permissionLevel)}>
              <MFText className="font-semibold text-white">공유하기</MFText>
            </StyledTouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SharePermissionDialog

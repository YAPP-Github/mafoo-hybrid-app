import { Pressable, View } from "react-native"
import { PermissionLevel } from "../../../api/photo"
import Icon from "../../../common/Icon"
import MFText from "@/common/MFText"

export enum AlbumMenuAction {
  "QUIT" = "QUIT",
  "EDIT" = "EDIT",
  "DELETE" = "DELETE",
}

export const AlbumMenuDialog = ({
  isVisible,
  myPermission,
  onTapBackdrop,
  onTapAction,
}: {
  isVisible: boolean
  myPermission: PermissionLevel
  onTapBackdrop: () => void
  onTapAction: (action: AlbumMenuAction) => void
}) => {
  return (
    <>
      {isVisible && (
        <Pressable
          className="fixed left-0 bottom-0 z-[1000] flex items-end justify-center bg-gray-800/50 px-5 pb-5 transition-all duration-500"
          onPress={onTapBackdrop}>
          <View className="w-full p-2 px-5 bg-white rounded-2xl">
            <View className="flex flex-col">
              {/* TODO: 친구목록 확인 */}
              {myPermission === PermissionLevel.OWNER && (
                <>
                  <Pressable
                    className="flex flex-row items-center justify-center gap-1 py-4 shrink grow basis-0"
                    onPress={() => onTapAction(AlbumMenuAction.DELETE)}>
                    <View>
                      <Icon name="trash" size={28} color="red-500" />
                      <MFText
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#333",
                          marginLeft: 8,
                        }}
                        weight="SemiBold"
                        className="text-gray-1000 text-body1">
                        앨범 삭제하기
                      </MFText>
                    </View>
                  </Pressable>
                  <View className="bg-gray-200 divide-x w-[1px]" />
                </>
              )}

              {/* 수정하기는 다음 scope */}
              {/* {(myPermission == PermissionLevel.OWNER ||
                myPermission == PermissionLevel.FULL_ACCESS) && (
                <div
                  className="flex flex-row items-center justify-center gap-1 py-4 shrink grow basis-0"
                  onClick={() => onTapAction(AlbumMenuAction.EDIT)}>
                  <Icon name="pen" size={24} color="gray-500" />
                  <span className="text-gray-600 tp-body1-semibold">
                    앨범 수정하기
                  </span>
                </div>
              )} */}
              {myPermission !== PermissionLevel.OWNER && (
                <View className="bg-gray-200 divide-x w-[1px]" />
              )}
              {myPermission !== PermissionLevel.OWNER && (
                <Pressable
                  className="flex flex-row items-center justify-center gap-2 py-4 shrink grow basis-0"
                  onPress={() => onTapAction(AlbumMenuAction.QUIT)}>
                  <Icon name="galleryIcon" size={28} color="gray-500" />
                  <MFText className="text-gray-600 tp-body1-semibold">
                    앨범에서 나가기
                  </MFText>
                </Pressable>
              )}
            </View>
          </View>
        </Pressable>
      )}
    </>
  )
}

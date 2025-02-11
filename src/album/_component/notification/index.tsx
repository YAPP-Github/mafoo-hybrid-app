import { View } from "react-native"
import { AlbumType } from "@/album/types"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import SquareButton from "@/common/SquareButton"
import { ICON_COLOR_STYLE_HEX, ICON_NAME } from "@/constants"
import { NotificationsType } from "@/types/notifications"
import { cn } from "@/utils"
import { NOTIFICATIONS } from "@/types/notifications"

/**
 * @description
 * notificationType: 알림 종류 enum type
 * icon: 알림 종류별 icon
 * title: 알림 제목
 * body: 알림 본문
 * params: 알림별 요구되는 params, 알림별로 params 상이 (route, id, ...)
 * read: 읽음 여부
 * highlight: 시스템 노티로 알림함 진입 시, 가독성을 위한 하이라이트 처리
 */

export interface NotificationProps {
  notificationType: NotificationsType
  albumType: AlbumType // TODO: 기획 확정 후 타입 수정
  title: string
  body: string
  params: any // TODO: 랜딩 스킴 논의
  read: boolean
  highlight: boolean
  createdAt: string
}
const Notification = ({
  notificationType,
  albumType,
  title,
  body,
  params,
  read,
  highlight,
  createdAt,
}: NotificationProps) => {
  return (
    // TODO: gap: 8px 수정
    <View
      className={`${cn(
        read ? "bg-gray-50" : "bg-white",
        "flex-1 flex-row px-[12px] py-[8px] rounded-[10px] mt-[8px]"
      )}`}>
      <Icon
        name={ICON_NAME[albumType]}
        color={ICON_COLOR_STYLE_HEX[albumType]}
        size={24}
        className="mr-[8px]"
      />
      <View className="flex-1 flex-col justify-center mr-[8px]">
        {/** text-body1 lineHeight 적용 안되는 듯 */}
        <MFText
          ellipsizeMode="tail"
          numberOfLines={1}
          weight="SemiBold"
          className="text-body1 text-gray-700 h-[24px]">
          {title}
        </MFText>
        <MFText
          ellipsizeMode="tail"
          numberOfLines={2}
          className="text-body2 pt-[2px] text-gray-500">
          {body}
        </MFText>
        <MFText className="text-body2 pt-[6px] text-gray-400">
          {createdAt}
        </MFText>
      </View>
      <View className="relative">
        {notificationType === NOTIFICATIONS.ALBUM_ACCEPT && (
          <SquareButton size="small" theme="gray" variant="weak">
            <MFText weight="SemiBold" className="text-gray-600 text-body2">
              수락하기
            </MFText>
          </SquareButton>
        )}
        {!read && <RedDot className="" />}
      </View>
    </View>
  )
}

export default Notification

interface RedDotProps {
  className?: string
}
const RedDot = ({ className }: RedDotProps) => {
  return (
    <View
      className={`${cn(
        className,
        "absolute right-0 bg-red-600 w-[8px] h-[8px] rounded-full"
      )}`}
    />
  )
}

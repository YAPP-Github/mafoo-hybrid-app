import React, { useState } from "react"
import { View } from "react-native"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import SquareButton from "@/common/SquareButton"
import { ICON_COLOR_STYLE_HEX, ICON_NAME } from "@/constants"
import { NotificationsType } from "@/types/notifications"
import { cn } from "@/utils"
import { NOTIFICATIONS } from "@/types/notifications"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "@/types/routeParams"
import { useReadNotification } from "@/hooks/useReadNotification"
import { formatTime } from "@/utils/formatTime"
import { NotificationIconType } from "@/album/types"
import { getRouteParams } from "@/hooks/useForegroundEvent"
import { acceptSharedMemberStatus } from "@/api/photo"

// 알림함 목록 조회 notification response 와 동일
export interface NotificationProps extends params {
  title: string
  body: string
  isRead: boolean
  notificationId: string
  notificationType: NotificationsType
  receiverMemberId: string
  templateId: string
  icon: NotificationIconType | null
  createdAt: string
  updatedAt: string
}

const albumType = "HEART"

export type params = {
  /* buttonType, paramKey: 알림함에서는 없으면 null, 시스템 노티는 key가 없음 */
  buttonType: "INVITATION_ACCEPT" | null
  route: keyof RootStackParamList
  paramKey: string | null
}

const Notification = React.forwardRef(
  (
    {
      icon,
      title,
      body,
      isRead,
      createdAt,
      receiverMemberId,
      notificationId,
      route,
      buttonType,
      paramKey,
      notificationType,
    }: NotificationProps,
    ref
  ) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    // 개별 알림 읽음
    const { mutate } = useReadNotification(receiverMemberId, [notificationId])

    // 초기값을 isRead로 설정
    const [read, setRead] = useState(isRead)

    React.useImperativeHandle(
      ref,
      () => ({
        readAllNotification: () => {
          setRead(true)
        },
      }),
      [setRead]
    )

    const hasButton = buttonType === NOTIFICATIONS.INVITATION_ACCEPT
    //    const icon = icon ? icon

    // 읽었거나, 공유 사용자 생성 알림 제외
    const readAndMove = () => {
      if (hasButton && !isRead) return onTapAccept()

      if (!isRead) {
        setRead(true)
        mutate([notificationId])
      }
      navigation.navigate(route as any, getRouteParams({ route, paramKey }))
    }

    const onTapAccept = () => {
      /** paramKey: sharedMemberedId */
      if (paramKey) {
        acceptSharedMemberStatus(paramKey)
          .then(() => {
            setRead(true)
            mutate([notificationId])
            navigation.navigate("Album")
          })
          .catch((e) => console.error(e))
      }
    }

    const NotiIcon = !icon
      ? notificationType === "NEW_MEMBER"
        ? "CONGRATULATION"
        : "HEART"
      : icon

    return (
      <TouchableOpacity
        onPress={readAndMove}
        className="flex-1 flex-row items-center h-[100px]">
        <View
          className={`${cn(
            isRead ? "bg-gray-50" : "bg-white",
            "flex-1 flex-row px-[12px] py-[8px] rounded-[10px] mt-[8px] h-[90px]"
          )}`}>
          <Icon
            name={ICON_NAME[NotiIcon]}
            color={ICON_COLOR_STYLE_HEX[NotiIcon]}
            size={24}
            className="mr-[8px]"
          />
          <View className="flex-1 flex-col justify-center mr-[8px]">
            <MFText
              ellipsizeMode="tail"
              numberOfLines={2}
              weight="SemiBold"
              className="text-body1 text-gray-700">
              {title}
            </MFText>
            <MFText
              ellipsizeMode="tail"
              numberOfLines={2}
              className="text-body2 pt-[2px] text-gray-500">
              {body}
            </MFText>
            <MFText className="text-body2 pt-[6px] text-gray-400">
              {formatTime(createdAt)}
            </MFText>
          </View>
          <View className="relative">
            {/* 공유 앨범 초대 알림의 경우, 수락하기 버튼이 보임*/}
            {hasButton && (
              <SquareButton
                size="small"
                theme="gray"
                variant="weak"
                disabled={hasButton && isRead}
                onPress={onTapAccept}>
                <MFText weight="SemiBold" className="text-gray-600 text-body2">
                  수락하기
                </MFText>
              </SquareButton>
            )}
            {!isRead && <RedDot className="" />}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
)

export default Notification

export interface RedDotProps {
  className?: string
}
export const RedDot = ({ className }: RedDotProps) => {
  return (
    <View
      className={`${cn(
        className,
        "absolute right-0 bg-red-600 w-[8px] h-[8px] rounded-full"
      )}`}
    />
  )
}

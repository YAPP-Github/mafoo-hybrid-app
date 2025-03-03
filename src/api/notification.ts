/** 알림 관련 API */

import { NotificationsType } from "@/types/notifications"
import { createFetcher } from "./myfetch"
import { NotificationProps, params } from "@/album/_component/notification"

export interface NotificationUrl {
  thumbnailImageUrl: string
  url: string
}

// 알림함 수신
type LocalNotification = NotificationUrl &
  Notification & {
    notificationType: NotificationsType
  }

export interface Notification {
  notificationId: string
  templateId: string
  receiverMemberId: string
  title: string
  body: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface SenarioNotification {
  notificationType: NotificationsType
  receiverMemberIds: string[]
  variables: unknown
}

export interface NotificationIds {
  notificationIds: string[]
}

const authorizedFetcher = createFetcher("user/v1")

/** 알림 목록 조회 */
export const getNotificationList = async (
  memberId: string | undefined
): Promise<(NotificationProps & params)[]> => {
  const data = await authorizedFetcher.get(
    `/notifications?memberId=${memberId}`
  )
  return data
}

/** 시나리오 알림 전송 (NOTE: 테스트용, 추후 삭제) */
export const sendSenarioNotification = async (
  body: SenarioNotification
): Promise<Notification[]> => {
  const data = await authorizedFetcher.post(`/notifications`, body)
  return data
}

/** 알림 n건 삭제 */
export const deleteBulkNotifications = async (
  memberId: string | undefined,
  body: NotificationIds
): Promise<NotificationIds> => {
  const data = await authorizedFetcher.delete(
    `/notifications?memberId=${memberId}`,
    { data: body }
  )
  return data
}

/** 알림 읽음 여부 n건 수정 */
export const markNotificationsAsRead = async (
  memberId: string,
  notificationIds: string[]
): Promise<Notification[]> => {
  const data = await authorizedFetcher.patch(
    `/notifications?memberId=${memberId}`,
    {
      notificationIds: notificationIds,
    }
  )
  return data
}

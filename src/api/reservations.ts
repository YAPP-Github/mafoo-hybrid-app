/** 예약 관련 API */

import { createFetcher } from "./myfetch"

export interface ReservedNotification {
  templateId: string
  status: "ACTIVE"
  variableDomain: "NONE"
  variableType: "NONE"
  variableSort: "PHOTO_COUNT_MIN"
  receiverMemberIds: string[]
  sendAt: string
  sendRepeatInterval: number
}

const authorizedFetcher = createFetcher("user/v1/notifications")

/** 예약 수정 */
export const updateReservedNotification = async (
  memberId: string,
  reservationId: string
): Promise<ReservedNotification> => {
  const data = await authorizedFetcher.put(
    `/reservations/${reservationId}?memberId=${memberId}`
  )
  return data
}

/** 예약 삭제 */
export const deleteReservedNotification = async (
  memberId: string,
  reservationId: string
) => {
  const data = await authorizedFetcher.delete(
    `/reservations/${reservationId}?memberId=${memberId}`
  )
  return data
}

/** 예약 생성 */
export const createReservedNotifications = async (
  memberId: string
): Promise<ReservedNotification> => {
  const data = await authorizedFetcher.post(
    `/reservations?memberId=${memberId}`
  )
  return data
}

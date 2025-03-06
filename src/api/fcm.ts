/** FCM 토큰 관련 API */

import { createFetcher } from "./myfetch"

export interface FcmToken {
  fcmTokenId: string
  ownerMemberId: string
  token: string
  createdAt: string
  updatedAt: string
}

const authorizedFetcher = createFetcher("user/v1")

/** 토큰 목록 조회 */
export const getFcmTokenList = async (
  memberId: string | undefined
): Promise<FcmToken[]> => {
  const data = await authorizedFetcher.get(`/fcm-tokens?memberId=${memberId}`)
  return data
}

/** 토큰 수정 */
export const updateFcmToken = async (
  memberId: string,
  fcmToken: string
): Promise<FcmToken> => {
  const data = await authorizedFetcher.put(`/fcm-tokens?memberId=${memberId}`, {
    token: fcmToken,
  })
  return data
}

/** 토큰 생성 */
export const createFcmToken = async (
  memberId: string,
  fcmToken: string
): Promise<FcmToken> => {
  const data = await authorizedFetcher.post(
    `/fcm-tokens?memberId=${memberId}`,
    {
      token: fcmToken,
    }
  )
  return data
}

/** 토큰 삭제 - 마이페이지 알림 수신 거부 */
export const deleteFcmToken = async (memberId: string | undefined) => {
  const data = await authorizedFetcher.delete(
    `/fcm-tokens?memberId=${memberId}`
  )
  return data
}

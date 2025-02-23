/** 알림 종류별 ENUM 타입, 총 10개 */
export enum NOTIFICATIONS {
  NEW_MEMBER = "NEW_MEMBER", // 신규 가입
  NEW_RECAP = "NEW_RECAP", // 리캡 생성
  NEW_SHARED_MEMBER = "NEW_SHARED_MEMBER", // 공유 사용자 생성 (공유 앨범 초대)
  SHARED_MEMBER_INVITATION_ACCEPTED = "SHARED_MEMBER_INVITATION_ACCEPTED", // 공유 사용자 초대 수락
  REGULAR = "REGULAR", // 공유 사용자 사진 생성, 앨범 주간, 공유 사용자 생성 권유 (앨범 초대 권유), 앨범 생성 권유, 앨범 접속 권유, 공유 사용자 사진 생성 권유
}

/** 전체 알림 key */
export type NotificationsType = keyof typeof NOTIFICATIONS

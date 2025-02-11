/** 알림 종류별 ENUM 타입 */
export enum NOTIFICATIONS {
  ALBUM_ACCEPT = "ALBUM_ACCEPT",
  PHOTO_ADDED = "PHOTO_ADDED",
  VIEW_ACCESS = "VIEW_ACCESS",
  RECAP_COMPLETED = "RECAP_COMPLETED",
  EVENT = "EVENT",
}

/** 전체 알림 key */
export type NotificationsType = keyof typeof NOTIFICATIONS

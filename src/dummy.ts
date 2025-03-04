import { NotificationProps } from "./album/_component/notification"
import { GetBulkAlbumResponse } from "./api/photo"

export const photo = [
  {
    albumId: "01JGD6M3JNPQ0WHDX04AK4T4ED",
    brand: "EXTERNAL",
    photoId: "01JGD6MT2DYW1NMR8MR1GTZAF3",
    photoUrl:
      "https://kr.object.ncloudstorage.com/mafoo/01JGBX0P0W6ZSDB2PW9YHCDFH5/photo/0c8b66ec-9c59-4214-963c-b53f74d368b2.png",
    uri: "https://kr.object.ncloudstorage.com/mafoo/01JGBX0P0W6ZSDB2PW9YHCDFH5/photo/0c8b66ec-9c59-4214-963c-b53f74d368b2.png",
  },
  {
    photoId: "01JGD6G8RMJKRS7RFA609905NC",
    photoUrl:
      "https://kr.object.ncloudstorage.com/mafoo/01JGBX0P0W6ZSDB2PW9YHCDFH5/photo/17f7a2cf-691f-4f03-858c-f5cd9f5bc21b.png",
    brand: "EXTERNAL",
    albumId: "01JGBY0D3QR9TAPH7AP7V5CZ50",
  },
  {
    photoId: "01JGD6G8RMJKRS7RFA609905NC",
    photoUrl:
      "https://kr.object.ncloudstorage.com/mafoo/01JGBX0P0W6ZSDB2PW9YHCDFH5/photo/17f7a2cf-691f-4f03-858c-f5cd9f5bc21b.png",
    brand: "EXTERNAL",
    albumId: "01JGBY0D3QR9TAPH7AP7V5CZ50",
  },
]

export const sharedMembersPreview = [
  {
    memberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    name: "장효신",
    isDefaultName: false,
    profileImageUrl:
      "https://kr.object.ncloudstorage.com/mafoo/src/mafoo_profile_pink.png",
    serialNumber: "1353",
  },
]

export const multipleSharedMembersPreview = [
  {
    memberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    name: "장효신",
    isDefaultName: false,
    profileImageUrl:
      "https://kr.object.ncloudstorage.com/mafoo/src/mafoo_profile_pink.png",
    serialNumber: "1353",
  },
  {
    memberId: "01JGBX0P0W6ZSDB2PW9YHCDFH6",
    name: "test",
    isDefaultName: false,
    profileImageUrl:
      "https://kr.object.ncloudstorage.com/mafoo/src/mafoo_profile_yellow.png",
    serialNumber: "1354",
  },
  {
    memberId: "01JGBX0P0W6ZSDB2PW9YHCDFH6",
    name: "test2",
    isDefaultName: false,
    profileImageUrl:
      "https://kr.object.ncloudstorage.com/mafoo/src/mafoo_profile_blue.png",
    serialNumber: "1354",
    shareStatus: "PENDING",
  },
  {
    memberId: "01JGBX0P0W6ZSDB2PW9YHCDFH6",
    name: "test2",
    isDefaultName: false,
    profileImageUrl:
      "https://kr.object.ncloudstorage.com/mafoo/src/mafoo_profile_purple.png",
    serialNumber: "1354",
    shareStatus: "PENDING",
  },
  {
    memberId: "01JGBX0P0W6ZSDB2PW9YHCDFH6",
    name: "test2",
    isDefaultName: false,
    profileImageUrl:
      "https://kr.object.ncloudstorage.com/mafoo/src/mafoo_profile_purple.png",
    serialNumber: "1354",
    shareStatus: "PENDING",
  },
]

export const albumInfo = {
  albumId: "01JGD6M3JNPQ0WHDX04AK4T4ED",
  name: "24 Recap",
  ownerMemberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
  ownerName: "장효신",
  ownerProfileImageUrl:
    "https://kr.object.ncloudstorage.com/mafoo/src/mafoo_profile_pink.png",
  ownerSerialNumber: "1353",
  photoCount: "1",
  sharedMembers: [],
  type: "SMILE_FACE",
}

export const albumList = [
  {
    albumId: "01JGD6M3JNPQ0WHDX04AK4T4ED",
    name: "단짝이랑",
    type: "HEART",
    photoCount: "1",
    sharedMemberId: null,
    shareStatus: null,
    permissionLevel: null,
    ownerMemberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    ownerName: null,
    ownerProfileImageUrl: null,
    ownerSerialNumber: null,
    createdAt: "2024-12-31 01:52:25",
  },
  {
    albumId: "01JGBY1TD1GAGDFN5X4CWPPTFW",
    name: "야뿌들",
    type: "BUILDING",
    photoCount: "0",
    sharedMemberId: null,
    shareStatus: null,
    permissionLevel: null,
    ownerMemberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    ownerName: null,
    ownerProfileImageUrl: null,
    ownerSerialNumber: null,
    createdAt: "2024-12-30 14:03:23",
  },
  {
    albumId: "01JGBY1A2ZF5BASW6D24QDVT5W",
    name: "Recap",
    type: "FIRE",
    photoCount: "0",
    sharedMemberId: null,
    shareStatus: null,
    permissionLevel: null,
    ownerMemberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    ownerName: null,
    ownerProfileImageUrl: null,
    ownerSerialNumber: null,
    createdAt: "2024-12-30 14:03:06",
  },
  {
    albumId: "01JGBY0D3QR9TAPH7AP7V5CZ50",
    name: "농구팟",
    type: "BASKETBALL",
    photoCount: "1",
    sharedMemberId: null,
    shareStatus: null,
    permissionLevel: null,
    ownerMemberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    ownerName: null,
    ownerProfileImageUrl: null,
    ownerSerialNumber: null,
    createdAt: "2024-12-30 14:02:37",
  },
  {
    albumId: "01JGBY0D3QR9TAPH7AP7V5CZ51",
    name: "기념일",
    type: "STARFALL",
    photoCount: "1",
    sharedMemberId: null,
    shareStatus: null,
    permissionLevel: null,
    ownerMemberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    ownerName: null,
    ownerProfileImageUrl: null,
    ownerSerialNumber: null,
    createdAt: "2024-12-30 14:02:37",
  },
  {
    albumId: "01JGBY0D3QR9TAPH7AP7V5CZ52",
    name: "친구들이랑",
    type: "SMILE_FACE",
    photoCount: "1",
    sharedMemberId: null,
    shareStatus: null,
    permissionLevel: null,
    ownerMemberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    ownerName: null,
    ownerProfileImageUrl: null,
    ownerSerialNumber: null,
    createdAt: "2024-12-30 14:02:37",
  },
  {
    albumId: "01JGBY0D3QR9TAPH7AP7V5CZ53",
    name: "친구들이랑",
    type: "SMILE_FACE",
    photoCount: "1",
    sharedMemberId: null,
    shareStatus: null,
    permissionLevel: null,
    ownerMemberId: "01JGBX0P0W6ZSDB2PW9YHCDFH5",
    ownerName: null,
    ownerProfileImageUrl: null,
    ownerSerialNumber: null,
    createdAt: "2024-12-30 14:02:37",
  },
]

// /* props 제외 response 에서만 쓰이는 속성들 */
export type NotificationResponse = NotificationProps & {
  templateId: string
}

export const emptyNotifications: NotificationResponse[] = []

export const notifications: NotificationResponse[] = [
  {
    title: "‘단짝이랑’ 앨범에 새로운 사진이 추가됐어요!",
    body: "지금 바로 새로운 추억을 확인해보세요. 지금 바로 새로운 추억을 확인해보세요. 지금 바로 새로운 추억을 확인해보세요",
    createdAt: "방금",
    updatedAt: "방금",
    notificationType: "REGULAR",
    url: "",
    thumbnailImageUrl: "HEART",
    isRead: false,
    notificationId: "",
    templateId: "",
    receiverMemberId: "",
    // params: {
    //   route: "AlbumCreate",
    //   key: null,
    //   hasButton: false,
    // },
  },
  {
    title: "‘단짝이랑’ 앨범에 새로운 사진이 추가됐어요!",
    body: "지금 바로 새로운 추억을 확인해보세요.",
    createdAt: "방금",
    updatedAt: "방금",
    notificationType: "REGULAR",
    url: "",
    thumbnailImageUrl: "HEART",
    isRead: true,
    notificationId: "",
    templateId: "",
    receiverMemberId: "",
    // params: {
    //   route: "AlbumCreate",
    //   key: null,
    //   hasButton: false,
    // },
  },
  {
    title: "‘친구들이랑’ 앨범을 공유받았어요",
    body: "앨범 공유를 수락하시겠어요?",
    createdAt: "방금",
    updatedAt: "방금",
    notificationType: "NEW_SHARED_MEMBER",
    url: "",
    thumbnailImageUrl: "HEART",
    isRead: true,
    notificationId: "",
    templateId: "",
    receiverMemberId: "",
    // params: {
    //   route: "AlbumCreate",
    //   key: null,
    //   hasButton: true,
    // },
  },
  {
    title: "‘농구팟’ 앨범의 리캡이 완성됐어요!",
    body: "소중한 추억을 영상으로 확인해보세요.",
    createdAt: "방금",
    updatedAt: "방금",
    notificationType: "REGULAR",
    url: "",
    thumbnailImageUrl: "HEART",
    isRead: true,
    notificationId: "",
    templateId: "",
    receiverMemberId: "",
    // params: {
    //   route: "AlbumCreate",
    //   key: null,
    //   hasButton: false,
    // },
  },
]

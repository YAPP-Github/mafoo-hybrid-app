import { AlbumType } from "@/album/types"
import { IconTypes } from "@/common/Icon"
import { ListItemProps } from "@/pages/Profile/_components/ListItem"
import { AuthRef } from "@/store/auth/AuthProvider"
import { removeAccessToken, removeRefreshToken } from "@/store/auth/util"
import { Alert } from "react-native"

export const ICON_NAME: Record<AlbumType, IconTypes> & {
  CONGRATULATION: "congratulation"
} = {
  HEART: "heartAngleBold",
  FIRE: "fireBold",
  BASKETBALL: "basketballBold",
  BUILDING: "buildingsBold",
  STARFALL: "starFallMinimalisticBold",
  SMILE_FACE: "emojiFunnyCircleBold",
  CONGRATULATION: "congratulation",
} as const

export const ICON_COLOR_STYLE = {
  HEART: "red-500",
  FIRE: "orange-600",
  BASKETBALL: "green-700",
  BUILDING: "sky-blue-700",
  STARFALL: "purple-600",
  SMILE_FACE: "pink-600",
} as const

export const ICON_COLOR_STYLE_HEX = {
  HEART: "#F56965",
  FIRE: "#FF9B05",
  BASKETBALL: "#30B57D",
  BUILDING: "#146EC2",
  STARFALL: "#B862EB",
  SMILE_FACE: "#F966B2",
  CONGRATULATION: "#B862EB",
} as const

export const LIST_ITEM_INFO: ListItemProps[] = [
  {
    items: [
      {
        label: "1:1 문의",
        link: "https://forms.gle/kX9j7co6jLvbgWFr7",
        icon: "arrow",
      },
      {
        label: "서비스 이용약관",
        link: "https://chisel-promise-9ff.notion.site/7d80231fcdf040158d31e48e7cd570a2",
        icon: "arrow",
      },
      {
        label: "개인정보 처리방침",
        link: "https://chisel-promise-9ff.notion.site/7d80231fcdf040158d31e48e7cd570a2",
        icon: "arrow",
      },
      {
        label: "개발팀 소개",
        link: "https://chisel-promise-9ff.notion.site/112385a9a75b8094b784e868d6779c1c",
        icon: "arrow",
      },
    ],
  },
  {
    items: [
      {
        label: "알림 수신",
        icon: "switch",
      },
      {
        label: "로그아웃",
        icon: "arrow",
        action: () => {
          Alert.alert(
            "정말 로그아웃할까요?",
            "모든 사진이 보관되니 언제든 돌아와도 돼요.",
            [
              {
                text: "닫기",
                style: "cancel",
              },
              {
                text: "로그아웃",
                onPress: async () => {
                  Promise.all([removeAccessToken(), removeRefreshToken()])
                    .then(async () => {
                      AuthRef.current?.signOut()
                    })
                    .catch((e) => {
                      console.log("failed to sign out", e)
                    })
                },
              },
            ]
          )
        },
      },
      {
        label: "탈퇴하기",
        icon: "arrow",
        action: () => {
          Alert.alert(
            "정말 탈퇴하시겠어요?",
            "그동안 모았던 사진들이 모두 삭제돼요.",
            [
              {
                text: "닫기",
                style: "cancel",
              },
              {
                text: "탈퇴하기",
                onPress: () => {
                  // signOut()
                  console.log("sign out")
                },
              },
            ]
          )
        },
      },
    ],
  },
]

export const ACCESS_TOKEN_KEY = "connect.sid"

export const MAFOO_KEYWORDS = [
  "인생네컷",
  "포토이즘",
  "하루필름",
  "인생네컷 앨범",
  "인생네컷 정리",
  "인생네컷 보관",
  "즉석사진 앨범",
  "인생네컷 앨범 서비스",
  "앨범 서비스",
  "모바일 앨범",
]

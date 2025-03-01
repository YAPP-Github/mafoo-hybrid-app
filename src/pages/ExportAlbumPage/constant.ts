import { AlbumType } from "@/album/types"

export type ColorMapType = {
  [key in AlbumType]: {
    icon: string
    bg: string
    album: {
      bg: string
      text: string
    }
    bottomButton: {
      color: string[]
      position: number[]
    }
  }
}

export const COLOR_MAP: ColorMapType = {
  STARFALL: {
    icon: "#B862EB",
    bg: "#F2E8FB",
    album: {
      bg: "bg-purple-200",
      text: "text-purple-600",
    },
    bottomButton: {
      color: ["#DF9AFF", "#BAC5FF"],
      position: [0.037, 0.9484],
    },
  },
  HEART: {
    icon: "#F56965",
    bg: "#FDE6E5",
    album: {
      bg: "bg-red-200",
      text: "text-red-500",
    },
    bottomButton: {
      color: ["#FF9B9C", "#F89AFF"],
      position: [0.0226, 1],
    },
  },
  FIRE: {
    icon: "#FFB908",
    bg: "#FFF4D6",
    album: {
      bg: "bg-butter-200",
      text: "text-orange-600",
    },
    bottomButton: {
      color: ["#FFB864", "#F8E47A"],
      position: [0.0638, 0.9932],
    },
  },
  BUILDING: {
    icon: "#319BFF",
    bg: "#DEEEFF",
    album: {
      bg: "bg-sky-blue-200",
      text: "text-skyblue-700",
    },
    bottomButton: {
      color: ["#92AAFF", "#9FE7FC"],
      position: [0.037, 0.9484],
    },
  },
  BASKETBALL: {
    icon: "#4DCF97",
    bg: "#E5F5ED",
    album: {
      bg: "bg-green-200",
      text: "text-green-700",
    },
    bottomButton: {
      color: ["#6DE694", "#F7F286"],
      position: [0.0638, 0.9932],
    },
  },
  SMILE_FACE: {
    icon: "#F966B2",
    bg: "#FEE9F2",
    album: {
      bg: "bg-pink-200",
      text: "text-pink-600",
    },
    bottomButton: {
      color: ["#FF9DC7", "#FCE4A4"],
      position: [0.037, 0.9484],
    },
  },
}

import { cva } from "class-variance-authority"

export const albumDetailHeaderVariants = cva(
  "w-full h-14 p-4 py-[14px] flex justify-between items-center",
  {
    variants: {
      type: {
        HEART: "bg-red-200",
        FIRE: "bg-butter-200",
        BASKETBALL: "bg-green-200",
        BUILDING: "bg-blue-200",
        STARFALL: "bg-purple-200",
        SMILE_FACE: "bg-pink-200",
        false: "bg-transparent",
      },
    },
    defaultVariants: {
      type: false,
    },
  }
)

export const albumDetailStickyHeaderVariants = cva("w-full", {
  variants: {
    type: {
      HEART: "bg-red-200",
      FIRE: "bg-butter-200",
      BASKETBALL: "bg-green-200",
      BUILDING: "bg-blue-200",
      STARFALL: "bg-purple-200",
      SMILE_FACE: "bg-pink-200",
      false: "bg-transparent",
    },
  },
  defaultVariants: {
    type: false,
  },
})

export const colorIconVariants = cva(
  "flex-1 items-center justify-center rounded-full",
  {
    variants: {
      iconColor: {
        HEART: "bg-red-500",
        FIRE: "bg-orange-600",
        BASKETBALL: "bg-green-700",
        BUILDING: "bg-blue-700",
        STARFALL: "bg-purple-600",
        SMILE_FACE: "bg-pink-600",
      },
      size: {
        medium: "w-9 h-9",
        large: "w-[48px] h-[48px]",
      },
    },
    defaultVariants: {
      iconColor: "HEART",
      size: "medium",
    },
  }
)

export const albumItemVariants = cva(
  "w-[164px] h-[150px] rounded-2xl relative p-4",
  {
    variants: {
      type: {
        HEART: "bg-red-200",
        FIRE: "bg-butter-200",
        BASKETBALL: "bg-green-200",
        BUILDING: "bg-blue-200",
        STARFALL: "bg-purple-200",
        SMILE_FACE: "bg-pink-200",
      },

      isEditable: {
        true: "w-60 h-[219.51px] rounded-[23.41px]",
      },
    },
    defaultVariants: {
      type: "HEART",
    },
  }
)

export const photoCountVariants = cva("tp-caption1-regular", {
  variants: {
    type: {
      HEART: "text-red-500",
      FIRE: "text-orange-600",
      BASKETBALL: "text-green-700",
      BUILDING: "text-sky-blue-700",
      STARFALL: "text-purple-600",
      SMILE_FACE: "text-pink-600",
    },
  },
  defaultVariants: {
    type: "HEART",
  },
})

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[6px] whitespace-nowrap rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "text-white",
        weak: "",
      },
      theme: { green: "", red: "", gray: "" },
      size: {
        large: "h-14 px-6 text-body1",
        medium: "h-10 px-5 text-body2",
        small: "h-8 px-4 text-caption1",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        theme: "green",
        class: "bg-green-600 active:bg-green-700",
      },
      {
        variant: "solid",
        theme: "red",
        class: "bg-red-600 active:bg-red-700",
      },
      {
        variant: "weak",
        theme: "green",
        class: "bg-green-200 text-green-700 active:bg-green-300",
      },
      {
        variant: "weak",
        theme: "red",
        class: "bg-red-200 text-red-600 active:bg-red-300",
      },
      {
        variant: "weak",
        theme: "gray",
        class: "bg-gray-100 text-gray-600 active:bg-gray-200",
      },
      {
        variant: "solid",
        theme: "gray",
        class: "bg-gray-100 text-gray-600 active:bg-gray-200",
      },
    ],
    defaultVariants: {
      variant: "solid",
      theme: "green",
      size: "large",
    },
  }
)

export const badgeVariants = cva(
  "inline-flex items-center rounded-full py-1 px-[10px] text-white tp-caption1-semibold",
  {
    variants: {
      variant: {
        default: "bg-gradient-purple",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const bottomBarVariants = cva(
  "fixed flex-row max-w-[430px] bottom-0 left-0 z-[1] flex w-full justify-evenly rounded-t-2xl pb-8 pt-5 tp-caption1-regular transform-translate-x-1/2",
  {
    variants: {
      variant: {
        album: "bg-sumone-white text-gray-400",
        scanner: "bg-gray-900 text-gray-600",
        profile: "bg-sumone-white text-gray-400",
      },
    },
    defaultVariants: {
      variant: "scanner",
    },
  }
)

export const recapColorVariants = cva("", {
  variants: {
    type: {
      HEART: "bg-gradient-to-r from-[#FF9090] via-[#FFA2BE] to-[#FF8585]",
      FIRE: "bg-gradient-to-r from-[#FF8E75] via-[#FFC062] to-[#FFA654]",
      BASKETBALL: "bg-gradient-to-r from-[#38D934] via-[#72DCA3] to-[#46E4D1]",
      BUILDING: "bg-gradient-to-r from-[#7B80FF] via-[#88B3F4] to-[#44C7E4]",
      STARFALL: "bg-gradient-to-r from-[#C680FF] via-[#F09BF2] to-[#FF82C6]",
      SMILE_FACE: "bg-gradient-to-r from-[#FF7BBF] via-[#F488EF] to-[#FF79A9]",
      false: "bg-gradient-to-r from-[#C680FF] via-[#F09BF2] to-[#FF82C6]",
    },
  },
  defaultVariants: {
    type: false,
  },
})

export const recapColorLinearGradient = {
  HEART: {
    colors: ["#FF9B9C", "#F89AFF"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  FIRE: {
    colors: ["#FFB864", "#F8E47A"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  BASKETBALL: {
    colors: ["#6DE694", "#F7F286"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  BUILDING: {
    colors: ["#92AAFF", "#9FE7FC"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  STARFALL: {
    colors: ["#DF9AFF", "#BAC5FF"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  SMILE_FACE: {
    colors: ["#FF9DC7", "#FCE4A4"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  INSTA: {
    colors: ["#FFD735", "#FF6C5A", "#E848C8", "#4A8CF0"],
    start: { x: 1, y: 0 },
    end: { x: 0, y: 0 },
  },
  false: {
    colors: ["#C680FF", "#FF82C6"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
}

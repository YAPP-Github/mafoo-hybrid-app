import { IconProps } from "@/types/icon"

interface HighlighterProps extends IconProps {
  reversed?: boolean
}
const Highlighter = ({ width, height, fill, reversed }: HighlighterProps) => {
  return (
    <svg
      width={width || "45"}
      height={height || "89"}
      viewBox="0 0 45 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: reversed ? "scaleX(-1)" : "none",
        transformOrigin: "center",
      }}>
      <path
        d="M0.173187 37.9539C-0.267792 38.1195 0.266254 47.9119 0.318615 48.4101C0.510597 50.2442 0.502449 58.1423 2.88536 58.8038C4.76912 59.3287 8.4354 57.161 10.1981 56.5365C16.3742 54.3792 22.7305 52.8452 29.059 51.3054C32.4977 50.4337 36.0241 49.9499 39.5715 49.863C40.2254 49.8491 44.9667 50.1955 44.9772 49.9858C45.1005 47.3859 44.6887 44.5439 44.57 41.9383C44.5141 40.7125 44.8772 38.9178 44.1453 37.889C42.4279 35.4861 38.4766 35.537 35.9657 35.2486C28.7762 34.4329 3.87437 36.5717 0.173187 37.9539Z"
        fill={fill || "#FDD0E3"}
      />
      <path
        d="M11.7921 88.4891C19.1759 86.304 34.0213 74.2686 34.0213 73.7507C34.0213 72.8667 32.4925 67.7805 32.1201 67.3251C31.379 66.4203 24.7492 67.9322 23.396 68.2288C17.825 69.4465 8.34804 73.6441 5.15997 75.9775C4.30943 76.5997 10.3726 88.9097 11.7921 88.4891Z"
        fill={fill || "#FDD0E3"}
      />
      <path
        d="M13.3557 0.516592C12.0083 1.26968 5.42159 16.4738 5.8137 17.3486C6.29191 18.4156 11.0496 19.2058 11.9409 19.4526C16.8835 20.8336 21.9041 22.4128 26.7142 24.3627C27.8731 24.8331 31.4428 27.3356 32.6843 26.6428C33.8827 25.9754 34.7018 21.9772 35.1998 20.6795C35.6431 19.5233 36.8939 15.7335 36.6589 15.5481C34.4668 13.918 31.2427 11.6147 29.1483 9.8247C25.3575 6.57138 21.5865 4.33183 17.2082 2.15831C16.8277 1.97525 13.7129 0.317315 13.3557 0.516592Z"
        fill={fill || "#FDD0E3"}
      />
    </svg>
  )
}

export default Highlighter
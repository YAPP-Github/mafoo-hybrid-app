import { AlbumType } from "@/album/types"
import MFText from "@/common/MFText"
import { colors } from "@/constants/colors"
import { TextInput, View } from "react-native"

interface GuestWriteProps {
  type: AlbumType
  value: string
  setValue: (v: string) => void
  nickname: string
  setNickname: (v: string) => void
}

export const GUEST_WRITE_BG_COLOR = {
  HEART: "#FFEDEC",
  FIRE: "#FFFAE1",
  BASKETBALL: "#EEFAE1",
  BUILDING: "#ECF9FF",
  STARFALL: "#F2E8FB",
  SMILE_FACE: "#FFECF9",
}

const GuestWrite = ({
  type,
  value,
  setValue,
  nickname,
  setNickname,
}: GuestWriteProps) => {
  const handleChangeValue = (v: string) => {
    setValue(v)
  }
  return (
    <View
      style={{
        backgroundColor: GUEST_WRITE_BG_COLOR[type],
        maxHeight: 400,
        minWidth: "100%",
      }}
      className="flex flex-col justify-between w-full h-full p-8 shadow-lg rounded-3xl">
      <TextInput
        multiline
        numberOfLines={7}
        placeholderTextColor={colors.gray[300]}
        className="font-semibold break-words text-display2"
        placeholder="방명록을 작성해주세요"
        value={value}
        onChange={(e) => handleChangeValue(e.nativeEvent.text)}
      />
      <View className="flex flex-row items-center justify-between">
        <MFText weight="SemiBold" className="text-gray-700 text-title2">
          보낸 이
        </MFText>
        <TextInput
          value={nickname}
          onChange={(e) => setNickname(e.nativeEvent.text)}
          placeholderTextColor={colors.gray[300]}
          className="px-4 py-2 font-semibold bg-gray-100 rounded-lg text-title1"
          placeholder="내 별명"
        />
      </View>
    </View>
  )
}

export default GuestWrite

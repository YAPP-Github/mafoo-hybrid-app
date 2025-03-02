import { useState } from "react"
import { View } from "react-native"

import AlbumItem from "../AlbumItem"
import SquareButton from "@/common/SquareButton"
import AlbumTypeSelectTab from "./AlbumTypeSelectTab"
import { AlbumType, AlbumValue } from "@/album/types"
import MFText from "@/common/MFText"
import { usePostAlbum } from "@/hooks/usePostAlbum"

interface AlbumEditSectionProps {
  albumValue?: AlbumValue
}

const DEFAULT_ALBUM_VALUE: AlbumValue = {
  name: "",
  type: "HEART",
  photoCount: 0,
  isNew: false,
  isSelected: false,
  isEditable: true,
}

export function AlbumEditSection({
  albumValue: albumValueInit = DEFAULT_ALBUM_VALUE,
}: AlbumEditSectionProps) {
  const [value, setValue] = useState(albumValueInit)
  const { type } = value
  const { postAlbum } = usePostAlbum()

  const handleType = (type: AlbumType) => {
    const nextValue = { ...value, type }
    setValue(nextValue)
  }

  const handleValue = (v: AlbumValue) => {
    setValue(v)
  }

  const handleSubmit = async () => {
    const { name, type } = value
    console.log(name, type)
    postAlbum({ name, type, photoId: null })
  }

  return (
    <>
      <View className="justify-center items-center pt-[24px] pb-[8px]">
        <AlbumItem value={value} handleValue={handleValue} />
      </View>
      <View className="justify-center items-center p-[24px]">
        <MFText className="text-body1 text-gray-500">
          한 번 정한 앨범 이름은 바꾸기 어려워요.
        </MFText>
      </View>
      <View className="flex-1 absolute bottom-0 w-full max-w-[430px] items-center justify-center border-t border-[#F0F2F4]">
        <AlbumTypeSelectTab type={type} handleType={handleType} />
        <View className="w-full px-[24px]">
          <SquareButton
            className="items-center mb-[44px] mt-[12px] py-[12px] w-full bg-black rounded-lg disabled:bg-gray-100"
            onPress={handleSubmit}
            disabled={!value.name.length}>
            <MFText
              weight="SemiBold"
              className={`${
                !value.name.length ? "text-[#B1B7BE]" : "text-white"
              } text-body1`}>
              다음으로
            </MFText>
          </SquareButton>
        </View>
      </View>
    </>
  )
}

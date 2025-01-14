import React, { useState } from "react"
import { Text, TextInput, View, TouchableOpacity } from "react-native"
import { VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

import { AlbumValue } from "../types"
import { albumItemVariants, photoCountVariants } from "../../styles/variants"
// import Badge from "./Badge"
//import ColorIcon from "../../common/ColorIcon"

export interface AlbumItemProps extends VariantProps<typeof albumItemVariants> {
  value: AlbumValue
  handleValue: (v: AlbumValue) => void
  className?: string
}

const MAX_INPUT_LENGTH = 8

/**
 * AlbumItem Component
 * @param value Album 데이터를 나타내는 객체
 * @param handleValue Album 데이터를 갱신하는 함수
 * @param className 추가적인 스타일링 클래스
 */

const AlbumItem: React.FC<AlbumItemProps> = ({
  value,
  handleValue,
  className,
}) => {
  const {
    name: initialName,
    type,
    photoCount,
    isNew,
    isSelected,
    isEditable,
  } = value

  const [name, setName] = useState(initialName)

  const handleName = (text: string) => {
    let updatedName = text.slice(0, MAX_INPUT_LENGTH)

    const nextValue = {
      ...value,
      name: updatedName,
    }
    setName(updatedName)
    handleValue(nextValue)
  }

  return (
    <View
      className={twMerge(
        albumItemVariants({ type, isEditable }),
        !isEditable && "group",
        className
      )}>
      {isEditable ? (
        // Edit 모드
        <>
          <TextInput
            className="tp-header1-semibold w-full rounded-lg bg-gray-100 py-2 px-3 caret-gray-600"
            value={name}
            onChangeText={handleName}
            placeholder="새 앨범"
          />
          <Text className="tp-body2-regular mt-1 text-right text-gray-500">
            {name.length}/8자
          </Text>
        </>
      ) : (
        // View 모드
        <>
          <TouchableOpacity
            className={`absolute left-0 top-0 h-full w-full rounded-2xl ${
              isSelected ? "opacity-100" : "opacity-0"
            }`}
          />
          <Text className="tp-title2-semibold text-gray-800">{name}</Text>
          <Text className={photoCountVariants({ type })}>
            사진 {photoCount}장
          </Text>
          {/* {isNew && <Badge className="absolute -left-2 -top-2">New!</Badge>} */}
        </>
      )}
      {/* <ColorIcon
        iconColor={type}
        className="absolute bottom-4 right-4"
        size={isEditable ? "large" : "medium"}
      /> */}
    </View>
  )
}

export default AlbumItem
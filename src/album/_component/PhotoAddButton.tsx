import { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native" // React Navigation 사용
import { styled } from "nativewind"

import { AddImageDialog } from "./add/AddImageDialog"
import Icon from "@/common/Icon"

interface PhotoAddButtonProps {
  albumId: string
  onImageUploaded: () => void
}

const StyledTouchableOpacity = styled(TouchableOpacity)

export const PhotoAddButton: React.FC<PhotoAddButtonProps> = ({
  albumId,
  onImageUploaded,
}) => {
  const navigation = useNavigation()
  const [isAddDialogShow, setIsAddDialogShow] = useState(false)
  const [backDropShow, setBackDropShow] = useState(false)

  const onTapQrScan = () => {
    // navigation.navigate("Scanner", { albumId })
  }

  const onClickAdd = () => {
    setIsAddDialogShow(true)
    setBackDropShow(true)
  }

  const onCloseAddDialogOnly = () => {
    setIsAddDialogShow(false)
  }

  const onClossAddDialog = () => {
    setIsAddDialogShow(false)
    setBackDropShow(false)
  }

  const onTapBackdrop = () => {
    // setIsAddDialogShow(false)
    setBackDropShow(false)
  }

  return (
    <>
      <StyledTouchableOpacity
        onPress={onClickAdd}
        className="aspect-square w-full overflow-hidden rounded-xl">
        <View className="mb-3 flex aspect-square w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
          <Icon name="galleryAddOutline" size={56} color="#CBD0D6" />
        </View>
      </StyledTouchableOpacity>
      <AddImageDialog
        currentAlbumId={albumId}
        isAddDialogShow={isAddDialogShow}
        onTapQrScan={onTapQrScan}
        onTapBackdrop={onTapBackdrop}
        onImageUploaded={onImageUploaded}
        onClossAddDialog={onClossAddDialog}
        backDropShow={backDropShow}
        onCloseAddDialogOnly={onCloseAddDialogOnly}
      />
    </>
  )
}

export default PhotoAddButton

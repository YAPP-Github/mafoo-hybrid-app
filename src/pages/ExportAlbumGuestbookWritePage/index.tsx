import AlbumTypeSelectTab from "@/album/_component/create/AlbumTypeSelectTab"
import { AlbumType } from "@/album/types"
import { ExportNoteType, createExportNote } from "@/api/album/export"
import MFText from "@/common/MFText"
import PageContainer from "@/common/PageContainer"
import SquareButton from "@/common/SquareButton"
import { useState } from "react"
import { Pressable, View } from "react-native"
import GuestWrite from "./_components/GuestWrite"
import { colors } from "@/constants/colors"
import Icon from "@/common/Icon"

const DEFAULT_ALBUM_VALUE: ExportNoteType = {
  type: "HEART",
  nickname: "",
  content: "",
}

const ExportAlbumGuestbookWritePage = ({
  navigation,
  route,
}: {
  navigation: any
  route: { params: { exportId: string } }
}) => {
  const { exportId } = route.params

  const [value, setValue] = useState(DEFAULT_ALBUM_VALUE)
  const { type } = value

  const handleType = (t: AlbumType) => {
    const nextValue = { ...value, type: t }
    setValue(nextValue)
  }

  const handleValue = (v: string) => {
    const nextValue = { ...value, content: v }
    setValue(nextValue)
  }

  const handleNickname = (v: string) => {
    const nextValue = { ...value, nickname: v }
    setValue(nextValue)
  }

  const handleSubmit = async () => {
    console.log(value, exportId)
    await createExportNote(exportId, value)
      .then((res) => {
        console.log("submit 결과", res)
        navigation.navigate("ExportAlbumDetailPage", { exportId })
      })
      .catch((err) => {
        console.log("submit 에러", err)
      })
  }

  const isSubmitDisabled =
    !value.content.length || value.content.length < 3 || !value.nickname

  const handleClickClose = () => {
    navigation.goBack()
  }

  return (
    <PageContainer
      statusBarColor={colors.gray[50]}
      homeIndicatorColor={colors.white}>
      <View className="flex flex-col items-center flex-1 w-full h-full bg-gray-50">
        <View className="px-4 py-3.5 w-full flex items-center relative">
          <Pressable
            className="absolute left-4 top-3"
            onPress={handleClickClose}>
            <Icon name="closeIcon" size={28} />
          </Pressable>
          <MFText className="text-gray-800 text-title2" weight="SemiBold">
            방명록 쓰기
          </MFText>
        </View>
        <View
          style={{ gap: 24 }}
          className="flex flex-col items-center justify-center flex-1">
          <View className="px-6 pt-6">
            <GuestWrite
              type={type}
              value={value.content}
              setValue={handleValue}
              nickname={value.nickname}
              setNickname={handleNickname}
            />
          </View>

          <MFText className="text-gray-500 text-body1">
            방명록은 소중히 간직되어 삭제하기 어려워요 💌
          </MFText>
        </View>

        <View className="w-full items-center justify-center border-t border-t-[#F0F2F4] bg-white flex">
          <AlbumTypeSelectTab type={type} handleType={handleType} />
          <View className="w-full px-6">
            <SquareButton
              disabled={isSubmitDisabled}
              className="items-center w-full py-3 mt-3 bg-black rounded-lg disabled:bg-gray-100"
              onPress={handleSubmit}>
              <MFText
                className={`${
                  isSubmitDisabled ? "text-[#B1B7BE]" : "text-white"
                } text-body1`}
                weight="SemiBold">
                {isSubmitDisabled ? "최소 3자 이상 작성해주세요" : "작성 완료"}
              </MFText>
            </SquareButton>
          </View>
        </View>
      </View>
    </PageContainer>
  )
}

export default ExportAlbumGuestbookWritePage

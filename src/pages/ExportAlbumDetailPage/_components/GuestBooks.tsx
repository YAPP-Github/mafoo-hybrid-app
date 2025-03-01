import { ExportNoteType, getExportNote } from "@/api/album/export"
import Icon from "@/common/Icon"
import MFText from "@/common/MFText"
import { GUEST_WRITE_BG_COLOR } from "@/pages/ExportAlbumGuestbookWritePage/_components/GuestWrite"
import { useEffect, useState } from "react"
import { View } from "react-native"

interface GuestBooksProps {
  exportId: string
}

const GuestBooks = ({ exportId }: GuestBooksProps) => {
  const [guestNotes, setGuestNotes] = useState<ExportNoteType[]>([])

  const fetchGuestNotes = async () => {
    //TODO: fetch guest notes
    await getExportNote(exportId)
      .then((res) => {
        console.log(res)
        setGuestNotes(res)
      })
      .catch((err) => {
        console.log("fetchGuestNotes error", err)
      })
  }

  useEffect(() => {
    fetchGuestNotes()
  }, [exportId])

  return (
    <View className="flex flex-row flex-wrap px-8 pt-6">
      {guestNotes.length > 0 ? (
        guestNotes.map((note, index) => {
          return (
            <View
              key={index}
              className="flex flex-col justify-between w-1/3 p-2 mb-8 rounded-xl"
              style={{
                aspectRatio: "6/7",
                backgroundColor: GUEST_WRITE_BG_COLOR[note.type],
                transform: [{ rotate: index % 2 === 0 ? "-10deg" : "10deg" }],
              }}>
              <View className="items-center justify-center flex-1">
                <MFText className="text-[12px] font-bold text-center break-words">
                  {note.content}
                </MFText>
              </View>
              <View className="flex flex-row justify-between">
                <MFText>보낸 이</MFText>
                <View className="px-1.5 py-0.5 bg-gray-100">
                  <MFText className="text-[9px]" weight="SemiBold">
                    {note.nickname}
                  </MFText>
                </View>
              </View>
            </View>
          )
        })
      ) : (
        <View
          style={{ gap: 16 }}
          className="flex flex-col items-center justify-center w-full py-28">
          <Icon name="clipboardRemove" size={64} />
          <View style={{ gap: 4 }} className="flex flex-col items-center">
            <MFText className="text-gray-400 text-title1" weight="SemiBold">
              아직 방명록이 없어요
            </MFText>
            <MFText className="text-gray-400 text-body2" weight="Regular">
              처음으로 방명록을 작성해볼까요?
            </MFText>
          </View>
        </View>
      )}
    </View>
  )
}

export default GuestBooks

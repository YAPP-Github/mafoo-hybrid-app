import MFText from "@/common/MFText"
import { Pressable, SafeAreaView, StatusBar, View } from "react-native"
import { COLOR_MAP } from "../ExportAlbumPage/constant"
import { useEffect, useState } from "react"
import {
  ExportAlbumType,
  getExportAlbumData,
  likeExport,
  unlikeExport,
} from "@/api/album/export"
import { calculateContentStyle } from "@/utils/calculateContentStyle"
import Icon from "@/common/Icon"
import { ICON_NAME } from "@/constants"
import { colors } from "@/constants/colors"
import { AlbumPhotos } from "./_components/AlbumPhotos"
import GuestBooks from "./_components/GuestBooks"
import { useAuth } from "@/store/auth/AuthProvider"

const ExportAlbumDetailPage = ({
  navigation,
  route,
}: {
  navigation: any
  route: { params: { exportId: string } }
}) => {
  const { exportId } = route.params
  const { status } = useAuth()
  const [exportAlbumData, setExportAlbumData] = useState<ExportAlbumType>()

  const [currentTab, setCurrentTab] = useState<"photo" | "guestbook">("photo")

  useEffect(() => {
    const fetchInitialData = async () => {
      getExportAlbumData(exportId).then((res) => {
        setExportAlbumData(res)
      })
    }
    fetchInitialData()
  }, [exportId])

  if (!exportAlbumData) {
    return
  }

  const selectedColor = COLOR_MAP[exportAlbumData?.type]

  const handleClickGuestBookWrite = () => {
    navigation.navigate("ExportAlbumGuestbookWritePage", { exportId })
  }

  const handleClickShare = () => {
    // TODO: Share Logic with deeplink
    console.log("Share Logic")
  }

  const handleClickHeartClick = async () => {
    if (status !== "signIn") {
      // kick to login page
      navigation.navigate("Home")
      return
    } else {
      setExportAlbumData((prev) => {
        if (!prev) {
          return
        }
        return {
          ...prev,
          isMeLiked: !prev.isMeLiked,
          likeCount: prev.isMeLiked
            ? Number(prev.likeCount) - 1
            : Number(prev.likeCount) + 1,
        }
      })
    }
    if (exportAlbumData.isMeLiked) {
      await unlikeExport(exportId)
        .then(() => {
          console.log("unlike success")
        })
        .catch(() => {
          setExportAlbumData((prev) => {
            if (!prev) {
              return
            }
            return {
              ...prev,
              isMeLiked: !prev.isMeLiked,
              likeCount: prev.isMeLiked
                ? Number(prev.likeCount) - 1
                : Number(prev.likeCount) + 1,
            }
          })
        })
    } else {
      await likeExport(exportId)
        .then(() => {
          console.log("like success")
        })
        .catch(() => {
          setExportAlbumData((prev) => {
            if (!prev) {
              return
            }
            return {
              ...prev,
              isMeLiked: !prev.isMeLiked,
              likeCount: prev.isMeLiked
                ? Number(prev.likeCount) - 1
                : Number(prev.likeCount) + 1,
            }
          })
        })
    }
  }

  return (
    <View className="flex-1">
      <SafeAreaView
        style={{
          backgroundColor: COLOR_MAP[exportAlbumData.type].bg,
        }}>
        <StatusBar
          barStyle={calculateContentStyle(COLOR_MAP[exportAlbumData.type].bg)}
          backgroundColor={COLOR_MAP[exportAlbumData.type].bg}
        />
      </SafeAreaView>
      <View
        style={{
          backgroundColor: COLOR_MAP[exportAlbumData.type].bg,
        }}
        className="flex flex-1">
        <View className="flex flex-row justify-between px-4 py-3">
          <View style={{ gap: 4 }} className="flex flex-row items-center">
            <Icon
              name={ICON_NAME[exportAlbumData.type]}
              size={24}
              color={selectedColor.icon}
            />
            <MFText className="text-gray-800 text-header2" weight="SemiBold">
              {exportAlbumData.name}
            </MFText>
          </View>
          <Pressable onPress={handleClickShare}>
            <Icon name="shareIcon" size={32} />
          </Pressable>
        </View>
        <View
          style={{ gap: 8 }}
          className="flex-col items-center flex-1 w-full pt-4 pb-5 bg-white rounded-t-3xl">
          <View className="flex flex-row bg-gray-100 rounded-full p-1.5">
            <Pressable
              onPress={() => setCurrentTab("photo")}
              style={{
                backgroundColor:
                  currentTab === "photo" ? "#fff" : "transparent",
              }}
              className="py-1.5 px-5 rounded-full">
              <MFText
                className={`${
                  currentTab === "photo" ? "text-gray-800" : "text-gray-500"
                } text-body1`}
                weight="SemiBold">
                사진
              </MFText>
            </Pressable>
            <Pressable
              onPress={() => setCurrentTab("guestbook")}
              style={{
                backgroundColor:
                  currentTab === "guestbook" ? "#fff" : "transparent",
              }}
              className="py-1.5 px-5 rounded-full">
              <MFText
                className={`${
                  currentTab === "guestbook" ? "text-gray-800" : "text-gray-500"
                } text-body1`}
                weight="SemiBold">
                방명록
              </MFText>
            </Pressable>
          </View>
          <View
            style={{ gap: 8 }}
            className="flex flex-row items-center px-3 py-2">
            <View style={{ gap: 4 }} className="flex flex-row items-center">
              <Icon
                name="heartBoldMonoColor"
                size={24}
                color={colors.red[500]}
              />
              <MFText weight="SemiBold" className="text-gray-600 text-body2">
                {exportAlbumData.likeCount}
              </MFText>
            </View>
            <View className="h-[10] w-[1] bg-[#E1E4E8]" />
            {currentTab === "photo" ? (
              <View style={{ gap: 4 }} className="flex flex-row items-center">
                <Icon
                  name="galleryImageIcon"
                  size={24}
                  color={colors.red[500]}
                />
                <MFText weight="SemiBold" className="text-gray-600 text-body2">
                  {exportAlbumData.photoCount}장
                </MFText>
              </View>
            ) : (
              <View style={{ gap: 4 }} className="flex flex-row items-center">
                <Icon name="clipboardHeart" size={24} color={colors.red[500]} />
                <MFText weight="SemiBold" className="text-gray-600 text-body2">
                  {exportAlbumData.noteCount}장
                </MFText>
              </View>
            )}
          </View>
          <View className="flex flex-1 w-full">
            {currentTab === "photo" ? (
              <AlbumPhotos exportId={exportId} />
            ) : (
              <GuestBooks exportId={exportId} />
            )}
          </View>
          <View className="w-full px-6">
            <View
              style={{ gap: 8 }}
              className="absolute flex flex-row w-full p-3 mx-6 bg-white rounded-lg shadow-lg bottom-5">
              <Pressable
                onPress={handleClickHeartClick}
                className="p-2.5 rounded-xl"
                style={{
                  backgroundColor: exportAlbumData.isMeLiked
                    ? colors.red[100]
                    : colors.gray[100],
                }}>
                <Icon
                  name="heartBoldMonoColor"
                  size={28}
                  color={
                    exportAlbumData.isMeLiked
                      ? colors.red[500]
                      : colors.gray[300]
                  }
                />
              </Pressable>
              <Pressable
                onPress={handleClickGuestBookWrite}
                className="flex flex-row items-center justify-between flex-1 px-4 py-2 bg-gray-100 rounded-xl">
                <MFText className="text-gray-500 text-body2" weight="Regular">
                  방명록을 작성해주세요
                </MFText>
                <Icon name="filledPen" size={24} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ExportAlbumDetailPage

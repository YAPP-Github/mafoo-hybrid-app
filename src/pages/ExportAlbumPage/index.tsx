import {
  ExportAlbumType,
  getExportAlbumData,
  likeExport,
  unlikeExport,
} from "@/api/album/export"
import MafooLogo2025Icon from "@/assets/MafooLogo2025Icon"
import MFText from "@/common/MFText"
import PageContainer from "@/common/PageContainer"
import { useEffect, useState } from "react"
import { Image, Pressable, View } from "react-native"
import dummyData from "./dummy"
import LinearGradient from "react-native-linear-gradient"
import { COLOR_MAP } from "./constant"
import ColorIcon from "@/common/ColorIcon"
import Icon from "@/common/Icon"
import { ICON_NAME } from "@/constants"
import { colors } from "@/constants/colors"
import { useAuth } from "@/store/auth/AuthProvider"

// ICON_COLOR_STYLE_HEX
const ExportAlbumPage = ({
  navigation,
  route,
}: {
  navigation: any
  route: { params: { exportId: string } }
}) => {
  const { exportId } = route.params
  const [exportAlbumData, setExportAlbumData] = useState<ExportAlbumType>()
  const { status } = useAuth()

  useEffect(() => {
    // const fetchInitialData = async () => {
    //   getExportAlbumData(exportId).then((res) => {
    //     setExportAlbumData(res)
    //   })
    // }
    // fetchInitialData()

    setExportAlbumData(dummyData as ExportAlbumType) //TODO: change to fetchInitialData
  }, [exportId])

  if (!exportAlbumData) {
    return
  }

  const selectedColor = COLOR_MAP[exportAlbumData?.type]

  const handleClickBottomButton = () => {
    navigation.navigate("ExportAlbumDetailPage", { exportId })
  }

  const handleClickHeartClick = async () => {
    if (status !== "signIn") {
      // kick to login page
      console.log("kick to login page")
      // navigation.navigate("MainPage")
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
    } else {
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
    }
    // TODO: API call
  }

  return (
    <PageContainer>
      <LinearGradient
        colors={["#ffffff", selectedColor.bg]}
        locations={[0, 0.5]}
        className="flex flex-col items-center flex-1 pt-10">
        <View style={{ gap: 8 }} className="flex flex-col items-center">
          <MFText className="text-gray-600 text-title2" weight="Regular">
            함께 쌓고 연결되다
          </MFText>
          <MafooLogo2025Icon
            width={140}
            height={45}
            fill={selectedColor.icon}
          />
        </View>
        <View style={{ gap: 24 }} className="flex flex-col mt-14">
          <View
            style={{ width: 196, height: 180 }}
            className={`${selectedColor.album.bg} rounded-3xl flex p-5 flex-col border-2 border-white shadow-lg`}>
            <MFText className="text-title1" weight="SemiBold">
              {exportAlbumData.name}
            </MFText>
            <MFText
              className={`${selectedColor.album.text} text-body1`}
              weight="Medium">
              사진 {exportAlbumData.photoCount}장
            </MFText>
            <ColorIcon
              className="absolute bottom-4 right-4"
              iconColor={exportAlbumData.type}
              size="large"
            />
          </View>
          <View className="flex items-center">
            <View
              style={{ gap: 8 }}
              className="flex flex-row items-center px-3 py-2 bg-white rounded-full">
              <View style={{ gap: 4 }} className="flex flex-row items-center">
                <Icon name="heartBold" size={24} />
                <MFText weight="SemiBold" className="text-gray-600 text-body2">
                  {Number(exportAlbumData.likeCount).toLocaleString()}
                </MFText>
              </View>
              <View className="h-2.5 w-[1] border border-gray-400" />
              <View style={{ gap: 4 }} className="flex flex-row items-center">
                <Icon name="securityEye" size={24} />
                <MFText weight="SemiBold" className="text-gray-600 text-body2">
                  {Number(exportAlbumData.noteCount).toLocaleString()}
                </MFText>
              </View>
            </View>
          </View>
        </View>
        <View className="h-[208px] w-full items-center pt-14 pb-6 justify-between absolute bottom-0 bg-white rounded-t-3xl flex flex-col">
          <View
            style={{
              height: exportAlbumData.sharedMembers.length > 0 ? 80 : 96,
              top: exportAlbumData.sharedMembers.length > 0 ? -40 : -48,
            }}
            className="absolute flex flex-row">
            <Image
              src={exportAlbumData.ownerProfileImageUrl}
              alt="profile"
              style={{
                width: exportAlbumData.sharedMembers.length > 0 ? 80 : 96,
                height: exportAlbumData.sharedMembers.length > 0 ? 80 : 96,
              }}
              className="border-2 border-white rounded-full"
            />
            {exportAlbumData.sharedMembers.length > 0 &&
              (exportAlbumData.sharedMembers.length === 1 ? (
                <Image
                  src={exportAlbumData.sharedMembers[0].profileImageUrl}
                  alt="profile"
                  style={{ width: 80, height: 80 }}
                  className="-ml-5 border-2 border-white rounded-full -z-10"
                />
              ) : (
                exportAlbumData.sharedMembers
                  .slice(0, 2)
                  .map((sm, idx) => (
                    <Image
                      key={idx}
                      src={sm.profileImageUrl}
                      alt="profile"
                      style={{ width: 80, height: 80, zIndex: -(idx + 1) }}
                      className="-ml-5 border-2 border-white rounded-full"
                    />
                  ))
              ))}
          </View>
          <View className="flex flex-row items-center">
            <MFText className="text-gray-800 text-title1" weight="SemiBold">
              {exportAlbumData.ownerName}
            </MFText>
            {exportAlbumData.sharedMembers.length > 0 &&
              (exportAlbumData.sharedMembers.length === 1 ? (
                <View style={{ gap: 6 }} className="flex flex-row ml-1.5">
                  <Icon
                    name={ICON_NAME[exportAlbumData.type]}
                    size={24}
                    color={selectedColor.icon}
                  />
                  <MFText
                    className="text-gray-600 text-title1"
                    weight="SemiBold">
                    {exportAlbumData.sharedMembers[0].name}
                  </MFText>
                </View>
              ) : (
                <MFText className="text-gray-400 text-title1" weight="SemiBold">
                  외 {exportAlbumData.sharedMembers.length}명
                </MFText>
              ))}
          </View>
          <View style={{ gap: 12 }} className="flex flex-row px-6">
            <Pressable
              onPress={handleClickHeartClick}
              className="flex items-center justify-center p-4 bg-gray-100 rounded-lg w-14 h-14">
              <Icon
                name="heartBoldMonoColor"
                size={24}
                color={
                  exportAlbumData.isMeLiked ? colors.red[500] : colors.gray[300]
                }
              />
            </Pressable>
            <Pressable className="flex-1" onPress={handleClickBottomButton}>
              <LinearGradient
                colors={[...selectedColor.bottomButton.color]}
                locations={[...selectedColor.bottomButton.position]}
                className="flex flex-col items-center justify-center flex-1 rounded-lg">
                <MFText weight="SemiBold" className="text-white text-body1">
                  앨범 구경하기
                </MFText>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </PageContainer>
  )
}

export default ExportAlbumPage

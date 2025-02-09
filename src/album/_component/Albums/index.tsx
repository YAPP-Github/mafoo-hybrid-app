import { StyleSheet, Text, View } from "react-native"
import DraggableAlbum from "../DraggableAlbum"
import { useEffect, useState } from "react"
import { GetBulkAlbumResponse, getAlbums } from "@/api/photo"
import LinearGradient from "react-native-linear-gradient"

const NEW_SHARED_ALBUM_DURATION = 800

const Albums = () => {
  const [albumList, setAlbumList] = useState<GetBulkAlbumResponse[]>([])
  const [showNewSharedAlbum, setShowNewSharedAlbum] = useState<boolean>(false)

  useEffect(() => {
    const fetchAlbumList = async () => {
      await getAlbums()
        .then((res) => {
          setAlbumList(res)
          if (res.some((album) => album.shareStatus === "PENDING")) {
            setShowNewSharedAlbum(true)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    fetchAlbumList()

    const interval = setInterval(() => {
      setShowNewSharedAlbum(false)
    }, NEW_SHARED_ALBUM_DURATION)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <View style={styles.container}>
      {showNewSharedAlbum && (
        <LinearGradient
          colors={[
            "rgba(242, 232, 251, 0.20)",
            "#F2E8FB",
            "rgba(242, 232, 251, 0.20)",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="flex items-center justify-center w-full h-12">
          <Text className="text-[#A558D2] text-right font-pretendard text-[16px] font-semibold leading-[24px] tracking-[0.32px]">
            새로운 앨범이 공유되었습니다
          </Text>
        </LinearGradient>
      )}
      {albumList.map((album, index) => (
        <DraggableAlbum
          key={album.albumId}
          index={index}
          album={album}
          //moveAlbum={moveAlbum}
          showNewRing={showNewSharedAlbum}
        />
      ))}
    </View>
  )
}

export default Albums

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 24,
    gap: 20,
  },
})

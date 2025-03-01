import { useEffect, useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import MasonryList from "@react-native-seoul/masonry-list"
import { Photo } from "@/album/_component/Photo"
import { usePhotoInfoStore } from "@/store/photo"
import { PhotoInfo } from "@/album/types"
import { getExportAlbumPhotos } from "@/api/album/export"

interface AlbumPhotosProps {
  exportId: string
}

export const AlbumPhotos = ({ exportId }: AlbumPhotosProps) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])

  /** file, info */
  const { setPhotos: setIPhotosStore } = usePhotoInfoStore()

  const fetchAlbums = async () => {
    const data = await getExportAlbumPhotos(exportId)
    if (data.length) {
      setPhotos(data)
      setIPhotosStore(data)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [exportId])

  return (
    <View style={styles.container} className="flex-1 w-full">
      <MasonryList
        data={photos}
        numColumns={2}
        style={{ gap: 13 }}
        keyExtractor={(item) => item.photoId.toString()}
        renderItem={({ item, i }) => {
          const photo = item as PhotoInfo
          return (
            <TouchableOpacity style={styles.photoContainer}>
              <Photo photo={photo} />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 6,
    paddingHorizontal: 24,
  },
  photoContainer: {
    width: "100%",
  },
  recapButton: {
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 22,
  },
  recapButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  recapText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
})

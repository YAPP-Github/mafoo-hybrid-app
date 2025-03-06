import { useEffect, useRef, useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import MasonryList from "@react-native-seoul/masonry-list"
import { deletePhoto, getPhotos, PermissionLevel } from "@/api/photo"
import { AlbumInfo, PhotoInfo } from "../types"
import ImageDetail from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"
import { usePhotoInfoStore } from "@/store/photo"
import { useQueryClient } from "@tanstack/react-query"

interface AlbumPhotosProps {
  albumInfo: AlbumInfo
  myPermission: PermissionLevel | undefined
}

const headerInfo: PhotoInfo = {
  photoId: "",
  photoUrl: "",
  albumId: "",
  brand: "",
  createdAt: "",
}

export const AlbumPhotos = ({ albumInfo, myPermission }: AlbumPhotosProps) => {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [imageDetailShown, setImageDetailShown] = useState(false)
  const carouselStartIdx = useRef(0)

  /** file, info */
  const { setPhotos: setIPhotosStore } = usePhotoInfoStore()

  const queryClient = useQueryClient()

  const onPhotoClick = (startIdx: number) => {
    carouselStartIdx.current = startIdx
    setImageDetailShown(true)
  }

  const closeImageDetail = () => {
    setImageDetailShown(false)
  }

  const fetchAlbums = async () => {
    const data = await getPhotos(albumInfo.albumId)
    if (data.length) {
      console.log("photoData", data)
      setPhotos(data)
      setIPhotosStore(data)
    }
  }

  const handleDelete = async (photoIdx: number) => {
    await deletePhoto(photos[photoIdx].photoId)

    const nextPhotos = photos.filter((_, i) => i !== photoIdx)
    setPhotos(nextPhotos)
    setIPhotosStore(nextPhotos)

    if (!nextPhotos.length) {
      setImageDetailShown(false)
    }
  }

  const onImageUploaded = async () => {
    fetchAlbums()

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["getAlbum"] }),
      queryClient.invalidateQueries({ queryKey: ["getAlbums"] }),
    ])
  }

  useEffect(() => {
    fetchAlbums()
  }, [albumInfo.albumId])

  const showPhotoAdd =
    myPermission === PermissionLevel.OWNER ||
    myPermission === PermissionLevel.FULL_ACCESS

  return (
    <>
      <View style={styles.container}>
        <MasonryList
          data={[headerInfo, ...photos]}
          numColumns={2}
          style={{ gap: 13 }}
          keyExtractor={(item) => item.photoId.toString()}
          renderItem={({ item, i }) => {
            const photo = item as PhotoInfo
            return i === 0 ? (
              showPhotoAdd ? (
                <PhotoAddButton
                  albumId={albumInfo.albumId}
                  onImageUploaded={onImageUploaded}
                />
              ) : (
                <></>
              )
            ) : (
              <TouchableOpacity
                key={i}
                style={styles.photoContainer}
                onPress={() => onPhotoClick(i - 1)}>
                <Photo photo={photo} />
              </TouchableOpacity>
            )
          }}
        />
        {imageDetailShown && (
          <ImageDetail
            visible={imageDetailShown}
            photos={photos}
            startIdx={carouselStartIdx.current}
            onClose={closeImageDetail}
            onDelete={handleDelete}
          />
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
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

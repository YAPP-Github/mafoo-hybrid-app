import React, { useEffect, useRef, useState } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import MasonryList from "@react-native-seoul/masonry-list"
// import VideoLoading from "../_component/VideoLoading"
// import VideoRecap from "../_component/VideoRecap"
import {
  deletePhoto,
  generateRecap,
  getPhotos,
  PermissionLevel,
} from "../../api/photo"
// import Button from "@/common/Button"
// import Icon from "@/common/Icon"
import { recapColorVariants } from "@/styles/variants"
import { AlbumInfo, PhotoInfo } from "../types"
import ImageDetail from "./ImageDetail"
import { Photo } from "./Photo"
import { PhotoAddButton } from "./PhotoAddButton"
import { photo as data } from "../../dummy"

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
  const [isRecapOpen, setIsRecapOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const onPhotoClick = (startIdx: number) => {
    carouselStartIdx.current = startIdx
    setImageDetailShown(true)
  }

  const closeImageDetail = () => {
    setImageDetailShown(false)
  }

  // TODO: API로 변경
  const fetchAlbums = async () => {
    // const data = await getPhotos(albumInfo.albumId)
    // if (data.length) {
    //   setPhotos(data)
    // }
    setPhotos(data as any)
  }

  const handleDelete = async (photoIdx: number) => {
    await deletePhoto(photos[photoIdx].photoId)

    const nextPhotos = photos.filter((_, i) => i !== photoIdx)
    setPhotos(nextPhotos)

    if (!nextPhotos.length) {
      setImageDetailShown(false)
    }
  }

  const onImageUploaded = () => {
    fetchAlbums()
  }

  const handleCloseRecap = () => {
    setIsRecapOpen(false)
  }

  useEffect(() => {
    fetchAlbums()
  }, [albumInfo.albumId])

  useEffect(() => {
    if (isRecapOpen) {
      generateRecap(albumInfo.albumId).then(
        (data) => {
          setVideoUrl(data.recapUrl)
        },
        (error) => {
          console.error(error)
          setIsRecapOpen(false)
        }
      )
    }
  }, [isRecapOpen])

  return (
    <>
      <View style={styles.container}>
        <MasonryList
          data={[headerInfo, ...photos]}
          numColumns={2}
          keyExtractor={(item) => item.photoId.toString()}
          renderItem={({ item, i }) =>
            // (myPermission === PermissionLevel.OWNER ||
            //   myPermission === PermissionLevel.FULL_ACCESS) && (
            i == 0 ? (
              <PhotoAddButton
                albumId={albumInfo.albumId}
                onImageUploaded={onImageUploaded}
              />
            ) : (
              <TouchableOpacity
                style={styles.photoContainer}
                onPress={() => onPhotoClick(i - 1)}>
                <Photo photo={item} />
              </TouchableOpacity>
            )
          }
          contentContainerStyle={styles.masonryContent}
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

        {photos.length >= 232323 && (
          <View style={styles.recapButtonContainer}>
            {/* <Button
            style={[
              styles.recapButton,
              recapColorVariants({ type: albumInfo.type }),
            ]}
            onPress={() => setIsRecapOpen(true)}>
            >
              <View style={styles.recapButtonContent}>
                <Text style={styles.recapText}>리캡 만들기</Text>
                <Icon name="reelOutline" size={24} color="white" />
              </View>
            </Button> */}
          </View>
        )}
      </View>

      {/* {isRecapOpen &&
        (videoUrl ? (
          <VideoRecap url={videoUrl} closeModal={handleCloseRecap} />
        ) : (
          <VideoLoading type={albumInfo.type} />
        ))} */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
  },
  masonryContent: {
    paddingBottom: 16,
    // paddingRight: 12,
    padding: 2,
  },
  photoContainer: {
    marginBottom: 12,
    marginLeft: 20,
  },
  recapButtonContainer: {
    // position: "absolute",
    // bottom: 32,
    // left: "50%",
    // transform: [{ translateX: -50 }],
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

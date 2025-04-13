import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  GetSharedAlbumResponse,
  getAlbum,
  getAlbums,
  getPhotos,
  patchPhotoAlbum,
  postQrCode,
} from "@/api/photo"
import { PhotoInfo } from "@/album/types"
// import { useAlertStore } from "@/store/alert"

export const usePostQrCode = () => {
  // const { showAlert } = useAlertStore()

  const { data, mutate, isPending } = useMutation({
    mutationFn: (code: string) => postQrCode(code),
    mutationKey: ["postQrCode"],
    onError: (error) => {
      console.log("앗! 사진을 불러오지 못했어요", error.message)
      //  showAlert("앗! 사진을 불러오지 못했어요", error.message)
    },

    // throwOnError: true,
  })

  return {
    scanInfo: data,
    postQrCodeQuery: mutate,
    isPending,
  }
}

/** AlbumDetailPage: AlbumInfo 조회 */
export const useGetAlbum = (id: string, isDelete: boolean) => {
  const { data } = useQuery({
    queryKey: ["getAlbum", id], // id가 변경되면 새로운 데이터 요청
    queryFn: () => getAlbum(id),
    enabled: !isDelete, // isDelete가 true면 요청 x
  })

  return {
    albums: data,
  }
}

export const useGetAlbums = () => {
  const { data, error, isError } = useQuery({
    queryKey: ["getAlbums"],
    queryFn: getAlbums,
  })

  return {
    albums: data ?? [],
    albumLength: data?.length,
    error,
    isError,
  }
}

export const usePatchPhotoAlbum = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      photoId,
      defaultAlbumId,
    }: {
      photoId: string
      defaultAlbumId: string
    }) => patchPhotoAlbum(photoId, defaultAlbumId),
    mutationKey: ["patchPhotoAlbum"],
  })

  return { patchPhotoAlbum: mutate }
}

export const useGetPhotos = (albumId: string) => {
  const { data } = useQuery({
    queryKey: ["getPhotos", albumId],
    queryFn: () => getPhotos(albumId),
  })

  return {
    photos: data ?? [],
  }
}

// export const useOptimisticUpdatePhotos = (albumId: string) => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: getPhotos,
//     onMutate: async (newPhotos: PhotoInfo[]) => {
//       console.log("onMutate", newPhotos)
//       const previousPhotos = queryClient.getQueryData<PhotoInfo[]>([
//         "getPhotos",
//         albumId,
//       ])
//       // 사진을 바로 UI에 추가 (낙관적 업데이트)
//       queryClient.setQueryData<PhotoInfo[]>(
//         ["getPhotos", albumId],
//         (oldData: any) => {
//           if (!oldData) return []
//           return [...newPhotos, ...oldData]
//         }
//       )

//       console.log("previousPhotos", previousPhotos)
//       return { ...previousPhotos, ...newPhotos }
//     },
//     onSettled: async (data, error, newPhoto, context) => {
//       queryClient.invalidateQueries(["getPhotos", albumId])
//     },
//     // 실패 시 이전 상태로 UI 롤백
//     onError: (error, newPhoto, context: any) => {
//       queryClient.setQueryData<PhotoInfo[]>(
//         ["getPhotos", albumId],
//         context.previousPhotos
//       )
//     },
//   })
// }

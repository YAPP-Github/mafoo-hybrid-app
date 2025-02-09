import { useMutation, useQuery } from "@tanstack/react-query"

import {
  GetSharedAlbumResponse,
  getAlbum,
  getAlbums,
  patchPhotoAlbum,
  postQrCode,
} from "@/api/photo"
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
export const useGetAlbum = (id: string) => {
  const { data } = useQuery({
    queryKey: ["getAlbum", id], // id가 변경되면 새로운 데이터 요청
    queryFn: () => getAlbum(id),
    enabled: !!id, // id가 없으면 요청 X
  })

  return {
    albums: data,
  }
}

export const useGetAlbums = () => {
  const { data } = useQuery({
    queryKey: ["getAlbums"],
    queryFn: getAlbums,
  })

  return {
    albums: data,
    albumLength: data?.length,
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

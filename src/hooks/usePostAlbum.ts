import { useMutation } from "@tanstack/react-query"
import { postAlbum } from "@/api/photo"
import { getQueryClient } from "@/common/QueryProviders"
import { useAlertStore } from "@/store/alert"

import { usePatchPhotoAlbum } from "@/hooks/usePhoto"
import type { AlbumType } from "@/album/types"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "@/types/routeParams"

export const usePostAlbum = () => {
  const { showAlert } = useAlertStore()

  const { patchPhotoAlbum } = usePatchPhotoAlbum()

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const { data, mutate, isPending } = useMutation({
    mutationFn: ({
      name,
      type,
    }: {
      name: string
      type: AlbumType
      photoId?: string | null
      sumoneInviteCode?: string
    }) => postAlbum(name, type),
    mutationKey: ["postAlbum"],
    onError: (error) => {
      showAlert("앗! 앨범을 만들지 못했어요", error.message)
    },
    onSuccess: (data, { photoId }) => {
      const { albumId } = data
      const queryClient = getQueryClient()
      queryClient.invalidateQueries({ queryKey: ["getAlbums"] })

      if (photoId) {
        patchPhotoAlbum({ photoId, defaultAlbumId: albumId })
      }
      /** 새로운 화면으로 교체 */
      navigation.replace("AlbumDetail", { albumId: albumId })
    },
    throwOnError: true,
  })
  return {
    albumInfo: data,
    postAlbum: mutate,
    isPending,
  }
}

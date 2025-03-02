import { deleteFcmToken } from "@/api/fcm"
import { NOTIFICATIONS, PROFILE } from "@/constants/queryString"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteFcmToken = (memberId: string | undefined) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: [...NOTIFICATIONS.DELETE_FCM_TOKEN],
    mutationFn: () => deleteFcmToken(memberId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...PROFILE.GET_PROFILE],
      })
    },
    onError: () => {},
  })

  return { mutate }
}

import { deleteFcmToken } from "@/api/fcm"
import { NOTIFICATIONS } from "@/constants/queryString"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteFcmToken = (memberId: string) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: [...NOTIFICATIONS.DELETE_FCM_TOKEN],
    mutationFn: () => deleteFcmToken(memberId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...NOTIFICATIONS.GET_FCM_TOKEN],
      })
    },
    onError: () => {},
  })

  return { mutate }
}

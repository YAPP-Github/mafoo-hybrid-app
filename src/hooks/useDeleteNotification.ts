import { deleteBulkNotifications } from "@/api/notification"
import { NOTIFICATIONS } from "@/constants/queryString"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteNotification = (
  memberId: string,
  notificationIds: string[],
  onSuccessHandler?: () => void
) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: [...NOTIFICATIONS.DELETE_NOTIFICATIONS],
    mutationFn: () =>
      deleteBulkNotifications(memberId, { notificationIds: notificationIds }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [...NOTIFICATIONS.GET_NOTIFICATIONS],
      })
      onSuccessHandler && onSuccessHandler()
    },
    onError: () => {},
  })

  return { mutate }
}

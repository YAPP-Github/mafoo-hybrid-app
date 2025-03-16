import { getNotificationList } from "@/api/notification"
import { NOTIFICATIONS } from "@/constants/queryString"
import { useQuery } from "@tanstack/react-query"

export const useGetNotification = (
  memberId: string | undefined,
  fcmToken: string | undefined | null
) => {
  const { data } = useQuery({
    queryKey: [...NOTIFICATIONS.GET_NOTIFICATIONS],
    queryFn: () => getNotificationList(memberId),
    enabled: !!memberId && !!fcmToken,
  })

  return {
    notifications: data ?? [],
  }
}

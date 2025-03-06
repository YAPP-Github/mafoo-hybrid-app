import { getNotificationList } from "@/api/notification"
import { NOTIFICATIONS } from "@/constants/queryString"
import { useQuery } from "@tanstack/react-query"

export const useGetNotification = (memberId: string | undefined) => {
  const { data } = useQuery({
    queryKey: [...NOTIFICATIONS.GET_NOTIFICATIONS],
    queryFn: () => getNotificationList(memberId),
    enabled: !!memberId,
  })

  return {
    notifications: data ?? [],
  }
}

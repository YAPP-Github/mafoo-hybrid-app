import { getFcmTokenList } from "@/api/fcm"
import { NOTIFICATIONS } from "@/constants/queryString"
import { useQuery } from "@tanstack/react-query"

export const useGetFcmToken = (memberId: string | undefined) => {
  const { data } = useQuery({
    queryKey: [...NOTIFICATIONS.GET_FCM_TOKEN],
    queryFn: () => getFcmTokenList(memberId),
    enabled: !!memberId,
  })

  return {
    tokenList: data ?? [],
  }
}

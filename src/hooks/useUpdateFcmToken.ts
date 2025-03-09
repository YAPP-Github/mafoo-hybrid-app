import { updateFcmToken } from "@/api/fcm"
import { PROFILE } from "@/constants/queryString"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateFcmToken = (onSuccessHandler?: () => void) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ["updateFcmToken"],
    mutationFn: ({
      memberId,
      fcmToken,
    }: {
      memberId: string
      fcmToken: string
    }) => updateFcmToken(memberId, fcmToken),
    onSuccess: async () => {
      console.log("PUT 요청 성공")
      await queryClient.invalidateQueries({
        queryKey: [...PROFILE.GET_PROFILE],
      })
      onSuccessHandler && onSuccessHandler()
    },
    onError: (e) => {
      console.error(e)
    },
  })

  return { mutate }
}

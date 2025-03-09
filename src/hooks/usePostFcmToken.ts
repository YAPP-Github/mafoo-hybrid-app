import { createFcmToken } from "@/api/fcm"
import { PROFILE } from "@/constants/queryString"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const usePostFcmToken = (onSuccessHandler?: () => void) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ["postFcmToken"],
    mutationFn: ({
      memberId,
      fcmToken,
    }: {
      memberId: string
      fcmToken: string
    }) => createFcmToken(memberId, fcmToken),
    onSuccess: async () => {
      console.log("POST 업데이트 성공")

      await queryClient.invalidateQueries({
        queryKey: [...PROFILE.GET_PROFILE],
      })
      onSuccessHandler && onSuccessHandler()
    },
    onError: () => {},
  })

  return { mutate }
}

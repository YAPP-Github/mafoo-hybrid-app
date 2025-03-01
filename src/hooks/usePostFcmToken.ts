import { createFcmToken } from "@/api/fcm"
import { useMutation } from "@tanstack/react-query"

export const usePostFcmToken = (onSuccessHandler?: () => void) => {
  const { mutate } = useMutation({
    mutationKey: ["postFcmToken"],
    mutationFn: ({
      memberId,
      fcmToken,
    }: {
      memberId: string
      fcmToken: string
    }) => createFcmToken(memberId, fcmToken),
    onSuccess: () => {
      onSuccessHandler && onSuccessHandler()
    },
    onError: () => {},
  })

  return { mutate }
}

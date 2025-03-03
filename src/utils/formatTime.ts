import dayjs from "dayjs"

/**
 * @param date
 * - 1분 미만: 방금
 * - 1분 ~ 1시간 전: n분 전 (24분전)
 * - 1시간 ~ 24시간: HH:mm (00:00~24:59)
 * - 24시간 이후: 날짜 표기 (2023-05-21)
 * @returns string
 */
export const formatTime = (date: Date | string | number): string => {
  const now = dayjs()
  const target = dayjs(date)
  const diffInSeconds = now.diff(target, "second")
  const diffInMinutes = now.diff(target, "minute")
  const diffInHours = now.diff(target, "hour")

  if (diffInSeconds < 60) return "방금"
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`
  if (diffInHours < 24) return target.format("HH:mm")
  return target.format("YYYY-MM-DD")
}

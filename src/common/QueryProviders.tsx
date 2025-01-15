import React, { useRef } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 설정: 기본 staleTime을 설정하여 불필요한 refetch 방지
        staleTime: 60 * 1000,
        retry: 0, // 실패 시 재시도 비활성화
        throwOnError: true, // 오류 발생 시 throw
      },
    },
  })
}

export function QueryProviders({ children }: { children: React.ReactNode }) {
  // React Native에서는 useRef로 QueryClient를 초기화
  const queryClientRef = useRef<QueryClient | null>(null)
  if (!queryClientRef.current) {
    queryClientRef.current = makeQueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      {/* Devtools는 필요 시 활성화 */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {children}
    </QueryClientProvider>
  )
}

export default QueryProviders

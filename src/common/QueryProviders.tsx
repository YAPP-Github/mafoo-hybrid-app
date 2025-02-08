import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 0, // 실패 시 재시도 비활성화
        throwOnError: true, // 오류 발생 시 throw
      },
    },
  })
}

export function getQueryClient() {
  let queryClient: QueryClient | undefined = undefined

  if (!queryClient) queryClient = makeQueryClient()

  return queryClient
}

export function QueryProviders({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProviders

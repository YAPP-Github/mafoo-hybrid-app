// 파일 URI를 Blob으로 변환
export const uriToBlob = async (uri: string): Promise<Blob> => {
  console.log("uri", uri)
  const response = await fetch(uri)
  const blob = await response.blob()
  return blob
}

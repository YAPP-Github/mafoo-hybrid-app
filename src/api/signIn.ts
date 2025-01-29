import { createUnauthorizedFetcher } from "./myfetch"

interface AuthLoginResponse {
  accessToken: string
  refreshToken: string
}

export interface GetMyProfileResponse {
  memberId: string
  name: string
  profileImageUrl: string
  serialNumber: string
  isDefaultName: boolean
}

const unAuthorizedFetcher = createUnauthorizedFetcher("user/v1")

export const mafooKakaoLogin = async (
  accessToken: string
): Promise<AuthLoginResponse> => {
  const data = await unAuthorizedFetcher.post("/auth/login/kakao", {
    accessToken: accessToken,
  })

  // const data = await myFetch("user/v1/auth/login/kakao", {
  //   method: "POST",
  //   body: JSON.stringify({ accessToken }),
  // })

  return data
}

export const mafooAppleLogin = async (
  identityToken: string
): Promise<AuthLoginResponse> => {
  console.log("appleMafooLogin")
  const data = await unAuthorizedFetcher.post("/auth/login/apple", {
    identityToken: identityToken,
  })

  console.log(data)
  return data

  // const data = await myFetch("user/v1/auth/login/apple", {
  //   method: "POST",
  //   body: JSON.stringify({ identityToken }),
  // })

  // return data
}

// export const getMyProfile = async (): Promise<GetMyProfileResponse> => {
//   const data = await myFetch("user/v1/me", {
//     method: "GET",
//   })

//   return data
// }

// export const updateName = async (
//   name: string
// ): Promise<GetMyProfileResponse> => {
//   const data = await myFetch("user/v1/me/name", {
//     method: "POST",
//     body: JSON.stringify({ name: name }),
//   })

//   return data
// }

// export const quit = async () => {
//   await myFetch("user/v1/me", {
//     method: "DELETE",
//   })
// }

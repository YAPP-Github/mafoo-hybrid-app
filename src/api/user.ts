// import { myFetch } from "./myfetch"

import { createFetcher } from "./myfetch"

export interface MemberSearchResult {
  memberId: string
  name: string
  profileImageUrl: string
  serialNumber: string
  sharedMemberId: string
  shareStatus?: string
  permissionLevel: string
}

const memberInstance = createFetcher("user/v1")
const removeInstance = createFetcher("photo/v1")

export const searchMembers = async (
  query: string,
  albumId: string
): Promise<Array<MemberSearchResult>> => {
  try {
    return await memberInstance.get(
      `/members?keyword=${query}&albumId=${albumId}`
    )
  } catch (err) {
    throw err
  }
}

export const withDrawMember = async () => {
  return await removeInstance
    .delete("/member-data")
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      throw err
    })
}

// export const searchMembers = async (
//   query: string,
//   albumId: string
// ): Promise<Array<MemberSearchResult>> => {
//   const result = await myFetch(
//     `user/v1/members?keyword=${query}&albumId=${albumId}`,
//     {
//       method: "GET",
//     }
//   )
//   return result
// }

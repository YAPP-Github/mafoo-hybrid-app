import axios, { AxiosError } from "axios"
import { AlbumInfo, AlbumType, PhotoInfo } from "../album/types"
import { createFetcher, createUnauthorizedFetcher } from "./myfetch"

export enum PermissionLevel {
  FULL_ACCESS = "FULL_ACCESS",
  DOWNLOAD_ACCESS = "DOWNLOAD_ACCESS",
  VIEW_ACCESS = "VIEW_ACCESS",
  OWNER = "OWNER",
  READ_ONLY = "READ_ONLY",
}

export enum ShareStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface PostQrCodeResponse {
  photoId: string
  photoUrl: string
  albumId: string
  brand: string
}

export interface GenerateRecapResponse {
  recapUrl: string
}

export interface SharedMember {
  sharedMemberId: string
  memberId: string
  albumId: string
  permissionLevel: PermissionLevel
  shareStatus: string
  name: string
  profileImageUrl: string
  serialNumber: string
}

export const authorizedFetcher = createFetcher("photo/v1")
const unAuthorizedFetcher = createUnauthorizedFetcher("photo/v1")
const albumInstance = createFetcher("photo/v1/albums")
const sharedMemberInstance = createFetcher("photo/v1/shared-members")

export const postQrCode = async (
  qrUrl: string
): Promise<PostQrCodeResponse> => {
  return await unAuthorizedFetcher.post("photos", { qrUrl })
}

type GetPhotosResponse = PhotoInfo[]

export const getPhotos = async (
  albumId: string
): Promise<GetPhotosResponse> => {
  const data = await authorizedFetcher.get(`/photos?albumId=${albumId}`)

  return data
}

export type AlbumIconType =
  | "HEART"
  | "FIRE"
  | "BASKETBALL"
  | "BUILDING"
  | "STARFALL"
  | "SMILE_FACE"

export interface GetBulkAlbumResponse {
  albumId: string
  name: string
  type: AlbumIconType
  photoCount: string
  shareStatus?: string
  permissionLevel?: string
  ownerMemberId?: string
  ownerName?: string
  ownerProfileImageUrl?: string
  sharedMembers?: SharedMember[]
  sharedMemberId?: string
}

export interface GetAlbumResponse {
  albumId: string
  name: string
  type: AlbumIconType
  photoCount: string
  shareStatus?: string
}

export interface GetSharedAlbumResponse {
  albumId: string
  name: string
  type: AlbumIconType
  ownerProfileImageUrl?: string
  ownerSerialNumber?: string
  ownerMemberId?: string
  ownerName?: string
  photoCount: string
  shareStatus?: string
  sharedMembers?: SharedMember[]
}

export const getAlbum = async (
  albumId: string
): Promise<GetSharedAlbumResponse> => {
  const data = await authorizedFetcher.get(`/albums/${albumId}`)
  return data
}

export const getAlbums = async (): Promise<GetBulkAlbumResponse[]> => {
  try {
    const data = await authorizedFetcher.get(`/albums`)
    return data
  } catch (err: unknown) {
    console.log(JSON.stringify(err))
    if (axios.isAxiosError(err)) {
      console.log("error in getAlubms", err)
      throw err.response?.data.message
    }
    console.log("error in getAlubms 123", err)
    throw err
  }
}

export const getSharedAlbum = async (
  albumId: string
): Promise<GetBulkAlbumResponse> => {
  return await albumInstance.get(`/shared-albums/${albumId}`)
}

export const postAlbum = async (
  name: string,
  type: AlbumType,
  sumoneInviteCode?: string
): Promise<AlbumInfo> => {
  const data = await authorizedFetcher.post(`/albums`, {
    name,
    type,
    sumoneInviteCode,
  })
  console.log("post data", data)
  return data
}

export const deleteAlbum = async (albumId: string): Promise<AlbumInfo> => {
  const data = await authorizedFetcher.delete(`/albums/${albumId}`)
  return data
}

export const deletePhoto = async (photoId: string): Promise<null> => {
  await authorizedFetcher.delete(`/photos/${photoId}`)
  return null
}

export const patchPhotoAlbum = async (
  photoId: string,
  albumId: string
): Promise<PostQrCodeResponse> => {
  return await authorizedFetcher.patch(`photos/${photoId}/album`, {
    albumId,
  })
}

export const patchAlbumMove = async (
  albumId: string,
  newDisplayIndex: number
) => {
  return await albumInstance.patch(`/${albumId}/display-index`, {
    newDisplayIndex,
  })
}

export const generatePreSignedUrls = async (
  fileNames: string[]
): Promise<{ urls: string[] }> => {
  const data = await authorizedFetcher.post(`/object-storage`, {
    fileNames: fileNames,
  })
  return data
}

export const uploadPhotosWithUrls = async (
  fileUrls: string[],
  albumId: string
): Promise<GetPhotosResponse> => {
  const data = await authorizedFetcher.post(`/photos/file-urls`, {
    fileUrls: fileUrls,
    albumId: albumId,
  })

  return data
}

export const updatePhotoAlbumBulk = async (
  albumId: string,
  photoIds: string[]
) => {
  return await authorizedFetcher.patch("photos/bulk/album", {
    albumId,
    photoIds,
  })
}

export const generateRecap = async (
  albumId: string,
  fileUrls: string[]
): Promise<GenerateRecapResponse> => {
  return await authorizedFetcher.post("/recaps", { albumId, fileUrls })
}

export const createSharedMember = async (
  albumId: string,
  memberId: string,
  permissionLevel: PermissionLevel
) => {
  await sharedMemberInstance.post("", { albumId, memberId, permissionLevel })
}

export const deleteSharedMember = async (sharedMemberId: string) => {
  await sharedMemberInstance.delete(`/${sharedMemberId}`)
}

/** deprecated */
export const updateSharedMemberStatus = async (
  sharedMemberId: string,
  shareStatus: ShareStatus
) => {
  await sharedMemberInstance.patch(`/${sharedMemberId}/status`, { shareStatus })
}

export const acceptSharedMemberStatus = async (sharedMemberId: string) => {
  await sharedMemberInstance.patch(`/${sharedMemberId}/status/accept`)
}

export const rejectSharedMemberStatus = async (sharedMemberId: string) => {
  await sharedMemberInstance.patch(`/${sharedMemberId}/status/reject`)
}

export const updateShareMemberPermissionLevel = async (
  sharedMemberId: string,
  permissionLevel: PermissionLevel
) => {
  await sharedMemberInstance.patch(`/${sharedMemberId}/permission`, {
    permissionLevel,
  })
}

export const updateAlbumOwner = async (albumId: string, memberId: string) => {
  await albumInstance.patch(`/${albumId}/ownership`, {
    newOwnerMemberId: memberId,
  })
}

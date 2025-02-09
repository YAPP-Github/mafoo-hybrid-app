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

const authorizedFetcher = createFetcher("photo/v1")
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
  console.log("albumId", albumId)
  try {
    return await authorizedFetcher.get(`/photos?albumId=${albumId}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export interface GetBulkAlbumResponse {
  albumId: string
  name: string
  type: "HEART" | "FIRE" | "BASKETBALL" | "BUILDING" | "STARFALL" | "SMILE_FACE"
  photoCount: string
  shareStatus?: string
  permissionLevel?: string
  ownerMemberId?: string
  ownerName?: string
  ownerProfileImageUrl?: string
  sharedMembers?: SharedMember[]
  sharedMemberId?: string
}

export interface GetSharedAlbumResponse {
  albumId: string
  name: string
  type: "HEART" | "FIRE" | "BASKETBALL" | "BUILDING" | "STARFALL" | "SMILE_FACE"
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
): Promise<GetBulkAlbumResponse> => {
  return await albumInstance
    .get(`/${albumId}`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err.response.data)
      throw err
    })
}

export const getAlbums = async (): Promise<GetBulkAlbumResponse[]> => {
  return await albumInstance.get("")
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
  return await albumInstance.post("", { name, type, sumoneInviteCode })
}

export const deleteAlbum = async (albumId: string): Promise<AlbumInfo> => {
  return await albumInstance.delete(`/${albumId}`)
}

export const deletePhoto = async (photoId: string): Promise<null> => {
  await authorizedFetcher.delete(`photos/${photoId}`)
  return null
}

export const patchPhotoAlbum = async (
  photoId: string,
  albumId: string
): Promise<PostQrCodeResponse> => {
  return await authorizedFetcher.patch(`photos/${photoId}/album`, { albumId })
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
  return await authorizedFetcher.post("/object-storage", { fileNames })
}

export const uploadPhotosWithUrls = async (
  fileUrls: string[],
  albumId: string
): Promise<GetPhotosResponse> => {
  return await authorizedFetcher.post("photos/file-urls", { fileUrls, albumId })
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
  albumId: string
): Promise<GenerateRecapResponse> => {
  return await authorizedFetcher.post("/recaps", { albumId })
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

export const updateSharedMemberStatus = async (
  sharedMemberId: string,
  shareStatus: ShareStatus
) => {
  await sharedMemberInstance.patch(`/${sharedMemberId}/status`, { shareStatus })
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
